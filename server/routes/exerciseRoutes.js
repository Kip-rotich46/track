const express = require('express');
const router = express.Router();

//Getting exercises from user
router.get('/:userId', async (req, res) =>{
  try {
    const exercises = await Exercise.find({userId: req.params.userId});
    res.json(exercises);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

//POST a new exercise(loged in user)
router.post('/', async(req, res) =>{
  const {userId, name, type, duration, calories_burned} = req.body;
  if(!userId || !name || !type || !duration ||!calories_burned){
    return res.status(400).json({message: 'All fields are reqyired'});
  }

  const newExercise = new Exercise({ userId, name, type, duration, calories_burned});

  try {
    await newExercise.save();
    res.status(201).json({ message: 'Exercise added successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

module.exports = router;
