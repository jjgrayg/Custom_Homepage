const path = require('path');
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

const backgroundFolder = './server/background_imgs/';

const getFileArray = async () => {
    return fs.readdirSync(backgroundFolder);
}

const apiKey = process.env.API_KEY;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.static(path.resolve(__dirname, './background_imgs')));

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
    const fileArr = await getFileArray();
    const randInt = Math.floor(Math.random() * fileArr.length);
    res.json({url: `/${fileArr[randInt]}`})
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});