const express = require('express');
const router = express.Router();
const ExerciseModel = require('../models/Exercise');

//Getting exercises from user
router.get('/:userId', async (req, res, next) =>{
  try {
    const userId = req.params.userId;
    if (!userId){
      return res.status(400).json({error: 'User ID is required'});
    }
    const exercises = await ExerciseModel.find({userId});
    res.json(exercises);
  } catch (error) {
    console.error("Error fetching exercises", error);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
});

//POST a new exercise(loged in user)
router.post('/', async(req, res) =>{
  const {userId, name, type, duration, calories_burned} = req.body;

  if(!userId || !name || !type || !duration || !calories_burned){
    return res.status(400).json({message: 'All fields are required'});
  }

  
  try {
    const newExercise = new ExerciseModel({ userId, name, type, duration, calories_burned});
    await newExercise.save();
    res.status(201).json({ message: 'Exercise added successfully', exercise: newExercise});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

module.exports = router;
