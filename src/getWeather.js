/* eslint-disable prefer-destructuring */
import { getUserGeo } from "./geoposition";

export async function getWeather(city) {
  const WEATHER_API_KEY = "8a6f11e64b821c66b1e532741f83e712";
  let cityName;
  if (!city) {
    cityName = await getUserGeo();
  } else {
    cityName = city;
  }
  const rawData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&units=metric&appid=${WEATHER_API_KEY}`
  );
  const jsonData = await rawData.json();
  const weatherIcon = jsonData.weather[0].icon;
  const temp = Math.floor(jsonData.main.temp);
  const cityCoordinates = [jsonData.coord.lat, jsonData.coord.lon];
  return [cityName, temp, weatherIcon, cityCoordinates];
}
