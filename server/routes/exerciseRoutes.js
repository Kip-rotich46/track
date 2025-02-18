const express = require('express');
const router = express.Router();

// Sample exercises data
const exercises = [
  { id: 1, name: "Push-ups", type: "strength", duration: 10, calories_burned: 50 },
  { id: 2, name: "Running", type: "cardio", duration: 30, calories_burned: 250 },
  { id: 3, name: "Cycling", type: "cycling", duration: 45, calories_burned: 300 },
  { id: 4, name: "Yoga", type: "yoga", duration: 60, calories_burned: 200 }
];

// Define GET / route
router.get('/', (req, res) => {
  res.json(exercises);
});

module.exports = router;
