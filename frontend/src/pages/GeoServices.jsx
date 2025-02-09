import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
  borderRadius: "8px",
};

const center = {
  lat: 19.1034,
  lng: 72.8327,
};

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: "googleMaps",
    googleMapsApiKey: "AIzaSyDbIWEmQPWwh_TRoShN7OwBycu3nlm-tWE", // Replace with your API key
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [incident, setIncident] = useState({
    lat: "",
    lng: "",
    type: "emergency",
    priority: "1",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [policeStations, setPoliceStations] = useState([
    { lat: 19.103414570130937, lng: 72.83268338041962 },
    { lat: 19.1212592321883, lng: 72.84811285313029 },
    { lat: 19.096538152695448, lng: 72.85500932244565 },
  ]);

  const onLoad = (map) => {
    setMap(map);
    setDirectionsService(new window.google.maps.DirectionsService());
    addPoliceStations(map);
    updateMap();
  };

  const onUnmount = () => {
    setMap(null);
    setDirectionsService(null);
  };

  const addPoliceStations = (map) => {
    policeStations.forEach(
      (loc, i) =>
        new window.google.maps.Marker({
          position: loc,
          map: map,
          title: `Police Station ${i + 1}`,
          icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        })
    );
  };

  const handleLocationSearchChange = (event) => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById("location-search")
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;
      setIncident({
        ...incident,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setSelectedLocation(place.geometry.location); // Store selected location
    });
  };

  const displayRoute = (route, color) => {
    if (!directionsService || route.route.length < 2) return null;

    const waypoints = route.route.slice(1, -1).map((stop) => ({
      location: new window.google.maps.LatLng(...stop.location),
      stopover: true,
    }));

    const request = {
      origin: new window.google.maps.LatLng(...route.route[0].location),
      destination: new window.google.maps.LatLng(
        ...route.route[route.route.length - 1].location
      ),
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    return (
      <DirectionsRenderer
        directions={route.directions}
        options={{
          suppressMarkers: true,
          polylineOptions: { strokeColor: color, strokeWeight: 5 },
        }}
      />
    );
  };

  const getMarkerIcon = (type) => {
    const icons = {
      police_station: "blue",
      emergency: "red",
      crime: "yellow",
      assistance: "green",
    };
    return `http://maps.google.com/mapfiles/ms/icons/$${icons[type]}-dot.png`;
  };

  const updateMap = async () => {
    try {
      const response = await fetch("/api/routes");
      const data = await response.json();
      if (data.status === "success") {
        const routesWithDirections = await Promise.all(
          data.routes.map(async (route) => {
            const waypoints = route.route.slice(1, -1).map((stop) => ({
              location: new window.google.maps.LatLng(...stop.location),
              stopover: true,
            }));

            const request = {
              origin: new window.google.maps.LatLng(...route.route[0].location),
              destination: new window.google.maps.LatLng(
                ...route.route[route.route.length - 1].location
              ),
              waypoints: waypoints,
              travelMode: window.google.maps.TravelMode.DRIVING,
            };
            const directions = await new Promise((resolve, reject) => {
              directionsService.route(request, (result, status) => {
                if (status === "OK") {
                  resolve(result);
                } else {
                  reject(status);
                }
              });
            });
            return { ...route, directions };
          })
        );
        setRoutes(routesWithDirections);
      } else {
        showError(data.message);
      }
    } catch (error) {
      showError("Failed to update routes: " + error.message);
    }
  };

  const updateRouteDetails = () => {
    return routes.map((route) => (
      <div className="route-info" key={route.vehicle_id}>
        <h3>Unit {route.vehicle_id + 1}</h3>
        <p>Total Time: {Math.round(route.total_time / 60)} minutes</p>
        <p>Stops: {route.route.map((s) => s.type).join(" → ")}</p>
      </div>
    ));
  };

  const reportIncident = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incident),
      });

      if (!response.ok) throw new Error(await response.text());
      setIncident({
        lat: "",
        lng: "",
        type: "emergency",
        priority: "1",
      });
      updateMap();
    } catch (error) {
      showError(error.message);
    }
  };

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(""), 5000);
  };

  useEffect(() => {
    if (isLoaded) {
      handleLocationSearchChange(); // Initialize autocomplete
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && map) {
      updateMap(); // Initial map update after load
      const intervalId = setInterval(updateMap, 30000); // Set interval for updates
      return () => clearInterval(intervalId); // Clear on unmount
    }
  }, [isLoaded, map]);

  return isLoaded ? (
    <div className="container">
           {" "}
      <div className="control-panel">
                <h2>Report New Incident</h2>       {" "}
        <form
          id="incident-form"
          className="incident-form"
          onSubmit={reportIncident}
        >
                   {" "}
          <input
            type="text"
            id="location-search"
            placeholder="Search location"
            required
          />
                    <input type="hidden" id="lat" value={incident.lat} />
                    <input type="hidden" id="lng" value={incident.lng} />       
           {" "}
          <select
            id="type"
            value={incident.type}
            onChange={(e) => setIncident({ ...incident, type: e.target.value })}
            required
          >
                        <option value="emergency">Emergency</option>           {" "}
            <option value="crime">Crime</option>           {" "}
            <option value="assistance">Assistance</option>         {" "}
          </select>
                   {" "}
          <select
            id="priority"
            value={incident.priority}
            onChange={(e) =>
              setIncident({ ...incident, priority: e.target.value })
            }
            required
          >
                        <option value="1">High</option>           {" "}
            <option value="2">Medium</option>           {" "}
            <option value="3">Low</option>         {" "}
          </select>
                    <button type="submit">Report Incident</button>       {" "}
        </form>
        <button id="recalculate-routes" onClick={updateMap}>
          Recalculate Routes
        </button>
               {" "}
        <div id="error-message" className="error-message">
          {errorMessage && <p>{errorMessage}</p>}{" "}
          {/* Conditionally render error message */}
        </div>
               {" "}
        <div id="route-details" className="route-details">
          {updateRouteDetails()}
        </div>
             {" "}
      </div>
           {" "}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {routes.map((route, index) =>
          displayRoute(
            route,
            ["#FF0000", "#00FF00", "#0000FF", "#FF00FF"][index % 4]
          )
        )}
        {policeStations.map((station, index) => (
          <Marker
            key={index}
            position={station}
            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            title={`Police Station ${index + 1}`}
          />
        ))}
        {routes.flatMap((route) =>
          route.route.map((stop, i) => (
            <Marker
              key={`${route.vehicle_id}-${i}`}
              position={{ lat: stop.location[0], lng: stop.location[1] }}
              icon={getMarkerIcon(stop.type)}
              title={`${stop.type} (${Math.round(
                stop.estimated_time / 60
              )}min)`}
              label={i === 0 || i === route.route.length - 1 ? "P" : `${i}`}
            >
              {/* Add info window if needed */}
            </Marker>
          ))
        )}
             {" "}
      </GoogleMap>
         {" "}
    </div>
  ) : (
    <></>
  );
};

export default App;
