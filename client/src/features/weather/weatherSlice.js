import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//Possibly add refresh feature and/or custom location bar

export const fetchWeather = createAsyncThunk(
    'weather/getWeather',
    async (location) => {
        const url = `/api/weather?lat=${encodeURI(location.lat)}&lon=${encodeURI(location.lng)}`;
        const response = await fetch(url);
        const json = await response.json();
        json.cod === '400' ? json.valid = false : json.valid = true;
        return json;
    }
);

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: {},
        loading: false,
        failed: false
    },
    reducers: {
        setWeather: (state, action) => {
            state.weather = action.payload;
        }
    },
    extraReducers: {
        [fetchWeather.pending]: state => {
            state.loading = true;
            state.failed = false;
        },
        [fetchWeather.rejected]: state => {
            state.loading = false;
            state.failed = true;
        },
        [fetchWeather.fulfilled]: (state, action) => {
            state.loading = false;
            state.failed = false;
            state.weather = action.payload;
        }
    }
});

export default weatherSlice.reducer;
export const { setWeather } = weatherSlice.actions;
export const selectWeatherConditions = state => {
    if(state.weather.weather.valid) {
        return {
            main: state.weather.weather.weather[0].main,
            description: state.weather.weather.weather[0].description,
            temp: state.weather.weather.main.temp,
            feelsLike: state.weather.weather.main.feels_like,
            wind: state.weather.weather.wind,
            sunrise: state.weather.weather.sys.sunrise,
            sunset: state.weather.weather.sys.sunset,
            name: state.weather.weather.name,
            state: state.weather.weather.state,
            low: state.weather.weather.main.temp_min,
            high: state.weather.weather.main.temp_max,
            humidity: state.weather.weather.main.humidity
        };
    }
    return {};
}
export const selectWeatherIconUrl = state => {
    if (state.weather.weather.valid) {
        const url =  `http://openweathermap.org/img/wn/${state.weather.weather.weather[0].icon}@2x.png`;
        return url;
    }
    return '';
}
export const selectLoading = state => state.weather.loading;
export const selectFailed = state => state.weather.failed;