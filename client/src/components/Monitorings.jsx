import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { FaHeartbeat, FaRunning, FaWalking, FaFire, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Monitorings = ({ userId }) => {
  // Mock data - in a real app, this would come from your API
  const [weeklyData] = useState([
    { day: 'Mon', calories: 350, duration: 45, exercises: 3 },
    { day: 'Tue', calories: 420, duration: 60, exercises: 4 },
    { day: 'Wed', calories: 380, duration: 50, exercises: 3 },
    { day: 'Thu', calories: 450, duration: 65, exercises: 5 },
    { day: 'Fri', calories: 400, duration: 55, exercises: 4 },
    { day: 'Sat', calories: 500, duration: 75, exercises: 6 },
    { day: 'Sun', calories: 300, duration: 40, exercises: 2 },
  ]);

  const [exerciseTypes] = useState([
    { name: 'Cardio', value: 45 },
    { name: 'Strength', value: 30 },
    { name: 'Flexibility', value: 15 },
    { name: 'Other', value: 10 },
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const stats = {
    totalCalories: weeklyData.reduce((acc, day) => acc + day.calories, 0),
    avgDuration: Math.round(weeklyData.reduce((acc, day) => acc + day.duration, 0) / weeklyData.length),
    totalExercises: weeklyData.reduce((acc, day) => acc + day.exercises, 0),
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-xl font-semibold p-3 border-b">Health Monitor</h2>
      <div className="p-3 flex-grow overflow-auto space-y-3">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaFire className="text-lg text-orange-500 mr-1" />
                <span className="text-xs text-gray-600">Calories</span>
              </div>
              <span className="text-sm font-semibold">{stats.totalCalories}</span>
            </div>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaRunning className="text-lg text-green-500 mr-1" />
                <span className="text-xs text-gray-600">Duration</span>
              </div>
              <span className="text-sm font-semibold">{stats.avgDuration}m</span>
            </div>
          </div>
          <div className="bg-purple-50 p-2 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaHeartbeat className="text-lg text-purple-500 mr-1" />
                <span className="text-xs text-gray-600">Total</span>
              </div>
              <span className="text-sm font-semibold">{stats.totalExercises}</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Chart */}
        <div>
          <h3 className="text-sm font-semibold ml-0 m-10">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={150} className={"mb-10"}>
            <LineChart data={weeklyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#8884d8" name="Calories" />
              <Line yAxisId="right" type="monotone" dataKey="duration" stroke="#82ca9d" name="Duration" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Exercise Distribution */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-sm font-semibold mb-10">Exercise Types</h3>
            <ResponsiveContainer width="100%" height={150} className={"mb-10 "}>
            <PieChart>
              <Pie
                data={exerciseTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {exerciseTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

          {/* Daily Exercise Count */}
          <div>
            <h3 className="text-sm font-semibold mb-10">Daily Exercises</h3>
            <ResponsiveContainer width="100%" height={150} className={"mb-10 "}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="exercises" fill="#8884d8" name="Exercises" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Monitorings;