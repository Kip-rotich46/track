const axios = require('axios');
const { API_KEY} = require('../config/apiConfig');

exports.getExercises = async (requestAnimationFrame, res) => {
    try {
        const response = await axios.get('https://api.api-ninjas.com/v1/exercises?muscle=biceps', {
            headers: {Authorization: `Bearer ${API_KEY}`}
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error getting exercises: ', error);
        res.status(500).json({error: 'Failed to fetch exercises'});
    }
}