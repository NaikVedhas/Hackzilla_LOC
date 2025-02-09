import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UsersRound, Briefcase, Shield, UserCheck } from 'lucide-react';
const Dashboard = () => {
  const [data] = useState([
    {"id":1,"name":"Vijay Kumar","rank":"Inspector","seniority":"15 years","age":42,"arrests":234,"totalCases":700,"casesPending":150,"totalConvictions":198,"shift":{"area":"Central District","startTime":"08:00","endTime":"16:00"}},
    {"id":2,"name":"Priya Sharma","rank":"Sub-Inspector","seniority":"8 years","age":35,"arrests":156,"totalCases":500,"casesPending":100,"totalConvictions":125,"shift":{"area":"North District","startTime":"16:00","endTime":"00:00"}},
    {"id":3,"name":"Rohan Gupta","rank":"Detective","seniority":"12 years","age":38,"arrests":189,"totalCases":600,"casesPending":150,"totalConvictions":140,"shift":{"area":"South District","startTime":"09:00","endTime":"17:00"}},
    {"id":4,"name":"Anjali Singh","rank":"Assistant Commissioner of Police","seniority":"10 years","age":40,"arrests":210,"totalCases":750,"casesPending":200,"totalConvictions":180,"shift":{"area":"West District","startTime":"10:00","endTime":"18:00"}},
    {"id":5,"name":"Rajesh Patel","rank":"Senior Inspector","seniority":"20 years","age":50,"arrests":320,"totalCases":900,"casesPending":250,"totalConvictions":230,"shift":{"area":"East District","startTime":"07:00","endTime":"15:00"}},
    {"id":6,"name":"Neha Joshi","rank":"Constable","seniority":"5 years","age":28,"arrests":120,"totalCases":400,"casesPending":150,"totalConvictions":110,"shift":{"area":"Central District","startTime":"14:00","endTime":"22:00"}},
    {"id":7,"name":"Arjun Reddy","rank":"Detective","seniority":"14 years","age":39,"arrests":275,"totalCases":800,"casesPending":250,"totalConvictions":210,"shift":{"area":"South District","startTime":"08:00","endTime":"16:00"}},
    {"id":8,"name":"Kavita Patel","rank":"Sergeant","seniority":"7 years","age":34,"arrests":190,"totalCases":650,"casesPending":200,"totalConvictions":168,"shift":{"area":"North District","startTime":"06:00","endTime":"14:00"}},
    {"id":9,"name":"Alok Verma","rank":"Constable","seniority":"3 years","age":28,"arrests":80,"totalCases":200,"casesPending":60,"totalConvictions":50,"shift":{"area":"West District","startTime":"14:00","endTime":"22:00"}},
    {"id":10,"name":"Meera Choudhary","rank":"Sub-Inspector","seniority":"6 years","age":32,"arrests":130,"totalCases":350,"casesPending":80,"totalConvictions":100,"shift":{"area":"East District","startTime":"09:00","endTime":"17:00"}},
    {"id":11,"name":"Rahul Mehta","rank":"Inspector","seniority":"10 years","age":38,"arrests":200,"totalCases":600,"casesPending":180,"totalConvictions":150,"shift":{"area":"Central District","startTime":"07:00","endTime":"15:00"}},
    {"id":12,"name":"Seema Nair","rank":"Assistant Sub-Inspector","seniority":"4 years","age":29,"arrests":90,"totalCases":250,"casesPending":80,"totalConvictions":70,"shift":{"area":"North District","startTime":"16:00","endTime":"00:00"}},
    {"id":13,"name":"Sanjay Yadav","rank":"Detective","seniority":"11 years","age":37,"arrests":170,"totalCases":550,"casesPending":130,"totalConvictions":140,"shift":{"area":"South District","startTime":"08:00","endTime":"16:00"}},
    {"id":14,"name":"Rekha Singh","rank":"Head Constable","seniority":"9 years","age":36,"arrests":160,"totalCases":400,"casesPending":100,"totalConvictions":120,"shift":{"area":"West District","startTime":"10:00","endTime":"18:00"}},
    {"id":15,"name":"Amit Sharma","rank":"Inspector","seniority":"18 years","age":45,"arrests":280,"totalCases":700,"casesPending":200,"totalConvictions":200,"shift":{"area":"East District","startTime":"07:00","endTime":"15:00"}},
    {"id":16,"name":"Pooja Verma","rank":"Constable","seniority":"2 years","age":25,"arrests":60,"totalCases":150,"casesPending":50,"totalConvictions":40,"shift":{"area":"Central District","startTime":"14:00","endTime":"22:00"}},
    {"id":17,"name":"Nisha Menon","rank":"Constable","seniority":"4 years","age":29,"arrests":100,"totalCases":300,"casesPending":80,"totalConvictions":80,"shift":{"area":"South District","startTime":"15:00","endTime":"23:00"}},
    {"id":18,"name":"Gaurav Choudhary","rank":"Sub-Inspector","seniority":"9 years","age":35,"arrests":180,"totalCases":550,"casesPending":150,"totalConvictions":140,"shift":{"area":"West District","startTime":"08:00","endTime":"16:00"}},
    {"id":19,"name":"Jyoti Verma","rank":"Inspector","seniority":"12 years","age":39,"arrests":220,"totalCases":650,"casesPending":180,"totalConvictions":170,"shift":{"area":"East District","startTime":"09:00","endTime":"17:00"}},
    {"id":20,"name":"Amit Sharma","rank":"Inspector","seniority":"14 years","age":40,"arrests":210,"totalCases":540,"casesPending":120,"totalConvictions":190,"shift":{"area":"North District","startTime":"07:00","endTime":"15:00"}},
    {"id":21,"name":"Sonia Verma","rank":"Sub-Inspector","seniority":"9 years","age":33,"arrests":140,"totalCases":370,"casesPending":90,"totalConvictions":120,"shift":{"area":"Central District","startTime":"15:00","endTime":"23:00"}},
    {"id":22,"name":"Ravi Desai","rank":"Detective","seniority":"11 years","age":37,"arrests":175,"totalCases":480,"casesPending":130,"totalConvictions":150,"shift":{"area":"South District","startTime":"08:00","endTime":"16:00"}},
    {"id":23,"name":"Pooja Nair","rank":"Assistant Commissioner of Police","seniority":"12 years","age":41,"arrests":220,"totalCases":620,"casesPending":180,"totalConvictions":200,"shift":{"area":"West District","startTime":"10:00","endTime":"18:00"}},
    {"id":24,"name":"Karan Malhotra","rank":"Senior Inspector","seniority":"18 years","age":48,"arrests":300,"totalCases":800,"casesPending":240,"totalConvictions":220,"shift":{"area":"East District","startTime":"06:00","endTime":"14:00"}},
    {"id":25,"name":"Divya Chauhan","rank":"Constable","seniority":"4 years","age":27,"arrests":95,"totalCases":250,"casesPending":60,"totalConvictions":80,"shift":{"area":"West District","startTime":"18:00","endTime":"02:00"}}
  ]);

  // Calculate summary statistics
  const totalOfficers = data.length;
  const totalArrests = data.reduce((sum, officer) => sum + officer.arrests, 0);
  const totalPendingCases = data.reduce((sum, officer) => sum + officer.casesPending, 0);
  const totalConvictions = data.reduce((sum, officer) => sum + officer.totalConvictions, 0);

  // Calculate district-wise statistics
  const districtStats = data.reduce((acc, officer) => {
    const district = officer.shift.area;
    if (!acc[district]) {
      acc[district] = {
        arrests: 0,
        cases: 0,
        convictions: 0
      };
    }
    acc[district].arrests += officer.arrests;
    acc[district].cases += officer.totalCases;
    acc[district].convictions += officer.totalConvictions;
    return acc;
  }, {});

  const districtData = Object.entries(districtStats).map(([district, stats]) => ({
    district,
    ...stats
  }));

  // Calculate rank distribution
  const rankDistribution = data.reduce((acc, officer) => {
    acc[officer.rank] = (acc[officer.rank] || 0) + 1;
    return acc;
  }, {});

  const rankData = Object.entries(rankDistribution).map(([rank, count]) => ({
    rank,
    count
  }));

  const COLORS = ['#9333ea', '#a855f7', '#c084fc', '#d8b4fe', '#e9d5ff', '#f3e8ff', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'];

  const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-gray-800 rounded-lg p-6 border border-purple-500">
      <div className="flex items-center">
        <div className="rounded-full p-3 bg-purple-500/10">
          <Icon className="h-8 w-8 text-purple-500" />
        </div>
        <div className="ml-4">
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Police Department Analytics Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={UsersRound} title="Total Officers" value={totalOfficers} />
        <StatCard icon={Briefcase} title="Total Arrests" value={totalArrests} />
        <StatCard icon={Shield} title="Pending Cases" value={totalPendingCases} />
        <StatCard icon={UserCheck} title="Total Convictions" value={totalConvictions} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Performance Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500">
          <h2 className="text-xl font-bold mb-4 text-white">District-wise Performance</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="district" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4c1d95' }}
                  labelStyle={{ color: '#e5e7eb' }}
                />
                <Legend />
                <Bar dataKey="arrests" fill="#9333ea" name="Arrests" />
                <Bar dataKey="convictions" fill="#c084fc" name="Convictions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rank Distribution Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-purple-500">
          <h2 className="text-xl font-bold mb-4 text-white">Rank Distribution</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rankData}
                  dataKey="count"
                  nameKey="rank"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label
                >
                  {rankData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #4c1d95' }}
                  labelStyle={{ color: '#e5e7eb' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;