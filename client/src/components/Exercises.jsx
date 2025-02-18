import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDumbbell, FaRunning, FaBicycle, FaArrowUp } from 'react-icons/fa';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch daily exercises
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/exercises');
        console.log('Exercise Data:', response.data);
        setExercises(response.data);
      } catch (err) {
        console.error('Error fetching exercises:', err);
        setError('Failed to load exercises.');
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const getExerciseIcon = (type) => {
    switch (type) {
      case 'strength':
        return <FaDumbbell className="text-2xl text-blue-500 cursor-pointer" />;
      case 'cardio':
        return <FaRunning className="text-2xl text-red-500 cursor-pointer" />;
      case 'cycling':
        return <FaBicycle className="text-2xl text-green- cursor-pointer" />;
      default:
        return <FaRunning className="text-2xl text-gray-700 cursor-pointer" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Exercises</h2>
        <p>Loading exercises...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 shadow-lg p-4 rounded-lg text-red-600">
        <h2 className="text-xl font-semibold mb-4">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Exercises for Today</h2>
      <div className="grid grid-cols-2 gap-4">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex flex-col items-start justify-between p-4 border-b border-gray-200 rounded-md shadow-md shadow-amber-200"
          >
            {/* Main content row */}
            <div className="flex items-center justify-between mb-4 w-full">
              {/* Icon and Name Row */}
              <div className="flex items-center">
                {getExerciseIcon(exercise.type)}
                <span className="ml-3 text-lg font-semibold flex items-center">
                  {exercise.name}
                  {/* Improvement Icon */}
                  {exercise.improvement && (
                    <FaArrowUp className="ml-2 text-green-500 text-xl" />
                  )}
                </span>
              </div>
              {/* Duration and Calories Row */}
              <div className="text-sm text-gray-600 flex flex-col items-end">
                <p>Duration: {exercise.duration} min</p>
                <p>Calories: {exercise.calories_burned} kcal</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;
