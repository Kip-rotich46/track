const express = require('express');
const cors = require('cors');
const axios = require('axios');

const exerciseRoutes = require('./routes/exerciseRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//Use Routes
app.use('/api/exercises', exerciseRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is runnning on ${PORT}`)
})