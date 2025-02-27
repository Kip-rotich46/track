import React, { useState, useEffect } from "react";

const AddRoutines = ({ userId, onExerciseAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "cardio", // Default value
    duration: "",
    calories_burned: "",
    improvement: false, // Ensure this is a boolean
  });

  useEffect(() => {
    if (!userId) {
      console.error("User ID is missing or not set.");
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Properly handle checkboxes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is missing before submitting!");
      alert("User ID is missing. Please log in again.");
      return;
    }

    const submitData = {
      userId,
      name: formData.name,
      type: formData.type,
      duration: formData.duration,
      calories_burned: formData.calories_burned
    };

    try {
      const response = await fetch("http://localhost:3001/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData), // Send only the required fields
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add exercise");
      }

      const data = await response.json();
      console.log("Exercise Added:", data);
      alert("Exercise added successfully!");

      // Clear form after successful submission
      setFormData({
        name: "",
        type: "cardio",
        duration: "",
        calories_burned: "",
        improvement: false
      });

      setFormData({
        name: "",
        type: "cardio",
        duration: "",
        calories_burned: "",
        improvement: false,
      });

      if (onExerciseAdded) {
        onExerciseAdded(data); // Notify parent to update UI
      }
    } catch (error) {
      console.error("Error adding exercise:", error);
      alert("Error adding exercise. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Exercise</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Exercise Name"
          required
          className="border p-2 w-full rounded-md"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        >
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="cycling">Cycling</option>
        </select>

        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (min)"
          required
          className="border p-2 w-full rounded-md"
        />
        <input
          type="number"
          name="calories_burned"
          value={formData.calories_burned}
          onChange={handleChange}
          placeholder="Calories Burned"
          required
          className="border p-2 w-full rounded-md"
        />

        <label className="flex items-center">
          <input
            type="checkbox"
            name="improvement"
            checked={formData.improvement}
            onChange={handleChange}
          />
          <span className="ml-2">Mark as Improved</span>
        </label>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add Exercise
        </button>
      </form>
    </div>
  );
};

export default AddRoutines;
