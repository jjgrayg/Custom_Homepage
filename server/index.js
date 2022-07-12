const path = require('path');
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/weather", async (req, res) => {
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_KEY}`
    const locLookupURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_KEY}`
    try {
        const weatherRes = await axios({
            method: 'get',
            url: weatherURL
        });
        const locationRes = await axios({
            method: 'get',
            url: locLookupURL
        });
        weatherRes.data.state = locationRes.data[0].state;
        res.json(weatherRes.data);
    }
    catch (err) {
        console.error(err);
    }
});

app.get("/api/background", async (req, res) => {
    const baseURL = `https://api.unsplash.com/photos/random?orientation=`
    const orientation = req.query.orientation;
    try {
        const backgroundRes = await axios({
            method: 'get',
            url: baseURL + orientation,
            headers: {Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`}
        });
        res.json(backgroundRes.data);
    }
    catch (err) {
        console.error(err);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});