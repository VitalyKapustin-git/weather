import { changeCityMap } from './map';
import { getWeather } from './getWeather';

export async function changeWeatherInfo(city, map, weather) {
	const cityInfo = await getWeather(city);
	const [userCity, tempInfo, weatherIcon, cityCoordinates] = cityInfo;
	const weatherBlock = weather;
  
	weatherBlock.querySelector(".tempInfo").innerText = tempInfo;
	weatherBlock.querySelector(
	  ".weatherIcon"
	).src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
	weatherBlock.querySelector(".userCity").innerHTML = userCity;
	changeCityMap(cityCoordinates, map);
  }