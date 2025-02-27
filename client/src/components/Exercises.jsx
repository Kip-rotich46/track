import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDumbbell, FaRunning, FaBicycle, FaArrowUp } from 'react-icons/fa';

const Exercises = ({userId}) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      if (!userId) {
        setError('User ID is missing. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:3001/api/exercises/${userId}`);
        setExercises(response.data);
      } catch (err) {
        console.error('Error fetching exercises:', err);
        setError(err.response?.data?.message || 'Failed to load exercises.');
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [userId]);

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

  // Filter and sort exercises
  const filteredExercises = exercises
    .filter(exercise => filterType === 'all' ? true : exercise.type === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'duration':
          return b.duration - a.duration;
        case 'calories':
          return b.calories_burned - a.calories_burned;
        default: // newest
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleDeleteExercise = async (exerciseId) => {
    try {
      await axios.delete(`http://localhost:3001/api/exercises/${userId}/${exerciseId}`);
      setExercises(exercises.filter(ex => ex._id !== exerciseId));
      setShowDeleteModal(false);
      setSelectedExercise(null);
    } catch (err) {
      setError('Failed to delete exercise');
    }
  };

  const filteredAndSearchedExercises = filteredExercises
    .filter(exercise => 
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-center">Your Exercises</h2>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search exercises..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Strength</option>
              <option value="cycling">Cycling</option>
            </select>

            <select
              className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="duration">Duration</option>
              <option value="calories">Calories Burned</option>
            </select>
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredAndSearchedExercises.map((exercise) => (
          <div
            key={exercise._id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            onClick={() => setSelectedExercise(exercise)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gray-50 rounded-full">
                    {getExerciseIcon(exercise.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{exercise.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{exercise.type}</p>
                  </div>
                </div>
                {exercise.improvement && (
                  <div className="flex items-center bg-green-50 px-3 py-1 rounded-full">
                    <FaArrowUp className="text-green-500 mr-1" />
                    <span className="text-green-600 text-sm">Improved</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="text-lg font-semibold text-gray-800">{exercise.duration} min</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-lg font-semibold text-gray-800">{exercise.calories_burned} kcal</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {new Date(exercise.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedExercise(exercise);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Delete Exercise</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{selectedExercise.name}"?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedExercise(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleDeleteExercise(selectedExercise._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;
