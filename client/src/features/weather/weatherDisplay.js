import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Slice funcs
import { 
    selectWeatherConditions, 
    selectWeatherIconUrl,
    selectLoading,
    selectFailed, 
    fetchWeather 
} from './weatherSlice';

export const WeatherDisplay = () => {
    const [location, setLocation] = useState({});
    const loading = useSelector(selectLoading);
    const failed = useSelector(selectFailed);
    const weather = useSelector(selectWeatherConditions);
    const iconUrl = useSelector(selectWeatherIconUrl);

    const dispatch = useDispatch();

    const convertToTime = time => {
        const date = new Date(time * 1000);
        let hours = date.getHours();
        let suffix = ' AM';
        if (hours >= 12) {
            hours = hours > 12 ? hours - 12 : hours;
            suffix = ' PM';
        }
        const minutes = '0' + date.getMinutes();
        return hours + ':' + minutes.substr(-2) + suffix;
    }

    const convertToTextDirection = windDegree => {
        var val = Math.floor((windDegree / 22.5) + 0.5);
        var arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        return arr[(val % 16)];
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setLocation({
                    lat: position.coords.latitude.toFixed(10),
                    lng: position.coords.longitude.toFixed(10),
                    accuracy: position.coords.accuracy
                });
            },
            function(error) {
              console.error('Error Code = ' + error.code + ' - ' + error.message);
            },
            {enableHighAccuracy: true} 
          );
    }, []);

    useEffect(() => {
        if (location.lat && location.lng) {
            const intervalID = setInterval(() => {
                dispatch(fetchWeather(location));
            }, 60000);
            return () => {
                clearInterval(intervalID);
            }
        }
    }, []);

    return (
        <div className='weather-disp'>
            <div className='city-name'>
                <h4>
                    {!(loading || failed) ? (weather.name + ', ' + weather.state) : '???'}
                </h4>
            </div>
            <hr />
            <div className='weather-main'>
                <img src={iconUrl} />
                <div className='weather-main-info'>
                    <h3>{!(loading || failed) ? weather.main : '???'}</h3>
                    <p>{!(loading || failed) ? weather.temp : '???'}°F</p>
                    <div className='weather-high-low'>
                        <p>High: {!(loading || failed) ? weather.high : '???'}°F</p>
                        <p>Low: {!(loading || failed) ? weather.low : '???'}°F</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className='weather-secondary-info'>
                <div className='vertical-cont weather'>
                    <div className='weather-infoblock'>
                        <p className='left-align'>Feels like:</p><p className='right-align'>{!(loading || failed) ? weather.feelsLike : '???'}°F</p>
                    </div>
                    <div className='weather-infoblock'>
                        <p className='left-align'>Sunrise:</p><p className='right-align'>{!(loading || failed) ? convertToTime(weather.sunrise) : '???'}</p>
                    </div>
                    <div className='weather-infoblock'>
                        <p className='left-align'>Sunset:</p><p className='right-align'>{!(loading || failed) ? convertToTime(weather.sunset) : '???'}</p>
                    </div>
                </div>
                <div className='vertical-cont weather'>
                    <div className='weather-infoblock'>
                        <p className='left-align'>Wind speed:</p><p className='right-align'>{!(loading || failed) && weather.wind ? weather.wind.speed : '???'} MPH</p>
                    </div>
                    <div className='weather-infoblock'>
                        <p className='left-align'>Wind direction:</p><p className='right-align'>{!(loading || failed) && weather.wind ? convertToTextDirection(weather.wind.deg) : '???'}</p>
                    </div>
                    <div className='weather-infoblock'>
                        <p className='left-align'>Humidity:</p><p className='right-align'>{!(loading || failed) && weather.humidity ? weather.humidity : '???'}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}