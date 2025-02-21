const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

//Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(error => console.log("MongoDB Connection Error", error));

//Use Routes
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);

app.listen(PORT, () => {
    console.log(`Server is runnning on ${PORT}`)
})