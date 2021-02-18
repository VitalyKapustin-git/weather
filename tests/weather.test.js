import drawMainPage from '../src/mainPage';
import getWeather from '../src/weather';

global.L = require("leaflet");
global.fetch = require("node-fetch");

let testRootElement;

beforeEach(async () => {
	testRootElement = document.createElement("div");
	testRootElement.className = 'test';
	await drawMainPage(testRootElement);
});

test('if return right weather info after input', async () => {
	const weatherAPIKey = '8a6f11e64b821c66b1e532741f83e712';
	const MoscowWeatherCityRaw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=${weatherAPIKey}`);
	const MoscowWeatherCityJSON = await MoscowWeatherCityRaw.json();
	const weatherInfo = await getWeather("Moscow");
	// eslint-disable-next-line no-unused-vars
	const [city, temp, _weatherIcon, cityCoordinates] = weatherInfo;

	expect(city).toBe(MoscowWeatherCityJSON.name);
	expect(temp).toBe(Math.floor(MoscowWeatherCityJSON.main.temp));
	expect(cityCoordinates[0]).toBe(MoscowWeatherCityJSON.coord.lat);
	expect(cityCoordinates[1]).toBe(MoscowWeatherCityJSON.coord.lon);
});