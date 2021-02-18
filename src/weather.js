/* eslint-disable prefer-destructuring */
import { getUserGeo } from './geoposition';
import { changeCityMap } from './map';

export async function getWeather(city) {
	const weatherAPIKey = '8a6f11e64b821c66b1e532741f83e712';
	const cityGeo = await getUserGeo();
	const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city || cityGeo)}&units=metric&appid=${weatherAPIKey}`);
	const jsonData = await rawData.json();
	const weatherIcon = jsonData.weather[0].icon;
	const temp = Math.floor(jsonData.main.temp);
	const cityCoordinates = [jsonData.coord.lat, jsonData.coord.lon];
	return [city || cityGeo, temp, weatherIcon, cityCoordinates];
}

export async function changeWeatherInfo(city, map) {
	const cityInfo = await getWeather(city);
	const cityCoordinates = cityInfo[3];

	document.querySelector('.tempInfo').innerText = cityInfo[1];
	document.querySelector('.weatherIcon').src = `https://openweathermap.org/img/wn/${cityInfo[2]}.png`;
	document.querySelector('.userCity').innerHTML = cityInfo[0];
	changeCityMap(cityCoordinates, map);
}
