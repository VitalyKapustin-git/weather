import getUserGeo from './getUserGeo';

export default async function getWeather(city) {
	const weatherAPIKey = '8a6f11e64b821c66b1e532741f83e712';
	const cityGeo = await getUserGeo();

	const rawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city || cityGeo}&units=metric&appid=${weatherAPIKey}`);
	const jsonData = await rawData.json();

	const weatherIcon = jsonData.weather[0].icon;
	const temp = Math.floor(jsonData.main.temp);
	return [city || cityGeo, temp, weatherIcon]; // [city, temp, weatherIcon]
}
