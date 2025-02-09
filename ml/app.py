from flask import Flask, request, jsonify, render_template
from ortools.constraint_solver import pywrapcp, routing_enums_pb2
import requests
from datetime import datetime
import threading
import time
import math

app = Flask(__name__)
GOOGLE_MAPS_API_KEY = 'AIzaSyDbIWEmQPWwh_TRoShN7OwBycu3nlm-tWE'  # Replace with actual key

# Initial data
incidents = [
    {"lat": 19.1100, "lng": 72.8400, "priority": 1, "type": "emergency"},
    {"lat": 19.1150, "lng": 72.8450, "priority": 2, "type": "crime"},
    {"lat": 19.1000, "lng": 72.8300, "priority": 3, "type": "assistance"}
]

police_units = {
    0: {"location": (19.103414570130937, 72.83268338041962), "capacity": 3, "busy": False},
    1: {"location": (19.1212592321883, 72.84811285313029), "capacity": 3, "busy": False},
    2: {"location": (19.096538152695448, 72.85500932244565), "capacity": 3, "busy": False}
}

class PoliceDispatcher:
    def __init__(self):
        self.lock = threading.Lock()

    def haversine_distance(self, origin, destination):
        lat1, lon1 = origin
        lat2, lon2 = destination
        radius = 6371  # Earth radius in kilometers

        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 
             + math.cos(math.radians(lat1)) 
             * math.cos(math.radians(lat2)) 
             * math.sin(dlon / 2) ** 2)
        return radius * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    def get_distance_matrix(self, locations):
        matrix = []
        for origin in locations:
            row = []
            for i in range(0, len(locations), 25):
                chunk = locations[i:i+25]
                try:
                    origins_str = f"{origin[0]},{origin[1]}"
                    destinations_str = "|".join([f"{lat},{lng}" for lat, lng in chunk])
                    url = (f"https://maps.googleapis.com/maps/api/distancematrix/json?"
                           f"units=metric&origins={origins_str}&destinations={destinations_str}&key={GOOGLE_MAPS_API_KEY}")
                    response = requests.get(url)
                    data = response.json()
                    if data['status'] == 'OK':
                        row.extend([e['duration']['value'] if e['status'] == 'OK' else 999999 
                                  for e in data['rows'][0]['elements']])
                    else:
                        row.extend([(self.haversine_distance(origin, dest)/40)*3600 for dest in chunk])
                except Exception as e:
                    row.extend([(self.haversine_distance(origin, dest)/40)*3600 for dest in chunk])
            matrix.append([int(x) for x in row])
        return matrix

    def create_data_model(self):
        with self.lock:
            data = {}
            police_locations = [unit["location"] for unit in police_units.values()]
            incident_locations = [(inc["lat"], inc["lng"]) for inc in incidents]
            
            data['all_locations'] = police_locations + incident_locations
            data['distance_matrix'] = self.get_distance_matrix(data['all_locations'])
            data['num_vehicles'] = len(police_units)
            data['vehicle_capacities'] = [u["capacity"] for u in police_units.values()]
            data['demands'] = [0]*len(police_units) + [1]*len(incidents)
            data['depots'] = list(range(len(police_units)))
            
            # Time windows (in seconds)
            data['time_windows'] = [(0, 86400)]*len(police_units)  # 24h for stations
            for inc in incidents:
                if inc["priority"] == 1:
                    data['time_windows'].append((0, 1800))  # 30min
                elif inc["priority"] == 2:
                    data['time_windows'].append((0, 3600))  # 1h
                else:
                    data['time_windows'].append((0, 7200))  # 2h
            
            data['location_types'] = ['police_station']*len(police_units) + [i["type"] for i in incidents]
            return data

    def solve_cvrp(self):
        data = self.create_data_model()
        manager = pywrapcp.RoutingIndexManager(
            len(data['all_locations']),
            data['num_vehicles'],
            data['depots'],  # Start depots
            data['depots']   # End depots
        )
        
        routing = pywrapcp.RoutingModel(manager)

        def distance_callback(from_index, to_index):
            from_node = manager.IndexToNode(from_index)
            to_node = manager.IndexToNode(to_index)
            return data['distance_matrix'][from_node][to_node]

        transit_callback_index = routing.RegisterTransitCallback(distance_callback)
        routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

        # Add Capacity constraint
        def demand_callback(from_index):
            return data['demands'][manager.IndexToNode(from_index)]
        
        demand_callback_index = routing.RegisterUnaryTransitCallback(demand_callback)
        routing.AddDimensionWithVehicleCapacity(
            demand_callback_index,
            0,
            data['vehicle_capacities'],
            True,
            'Capacity'
        )

        # Add Time Window constraint
        routing.AddDimension(
            transit_callback_index,
            300,  # allow waiting time
            86400,  # maximum total time
            False,
            'Time'
        )
        time_dimension = routing.GetDimensionOrDie('Time')
        
        for location_idx, (start, end) in enumerate(data['time_windows']):
            if location_idx < len(police_units): continue  # Skip depots
            index = manager.NodeToIndex(location_idx)
            time_dimension.CumulVar(index).SetRange(start, end)

        search_parameters = pywrapcp.DefaultRoutingSearchParameters()
        search_parameters.first_solution_strategy = (
            routing_enums_pb2.FirstSolutionStrategy.PARALLEL_CHEAPEST_INSERTION
        )
        search_parameters.time_limit.FromSeconds(5)

        solution = routing.SolveWithParameters(search_parameters)
        
        if solution:
            return self.extract_routes(manager, routing, solution, data)
        return []

    def extract_routes(self, manager, routing, solution, data):
        routes = []
        time_dimension = routing.GetDimensionOrDie('Time')
        
        for vehicle_id in range(data['num_vehicles']):
            index = routing.Start(vehicle_id)
            route = []
            while not routing.IsEnd(index):
                node = manager.IndexToNode(index)
                route.append({
                    "location": data['all_locations'][node],
                    "type": data['location_types'][node],
                    "estimated_time": solution.Min(time_dimension.CumulVar(index))
                })
                index = solution.Value(routing.NextVar(index))
            
            # Add final depot
            node = manager.IndexToNode(index)
            route.append({
                "location": data['all_locations'][node],
                "type": 'police_station',
                "estimated_time": solution.Min(time_dimension.CumulVar(index))
            })
            
            if len(route) > 1:  # Only add non-empty routes
                routes.append({
                    "vehicle_id": vehicle_id,
                    "route": route,
                    "total_time": solution.Min(time_dimension.CumulVar(index))
                })
        
        return routes

dispatcher = PoliceDispatcher()

@app.route('/api/incidents', methods=['POST'])
def add_incident():
    try:
        data = request.get_json()
        new_incident = {
            "lat": float(data['lat']),
            "lng": float(data['lng']),
            "priority": int(data['priority']),
            "type": data['type']
        }
        with dispatcher.lock:
            incidents.append(new_incident)
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/api/routes', methods=['GET'])
def get_routes():
    try:
        return jsonify({
            "status": "success",
            "routes": dispatcher.solve_cvrp(),
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/')
def home():
    return render_template('dispatch.html')

if __name__ == '__main__':
    app.run(debug=True)