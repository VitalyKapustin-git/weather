/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */

import getWeather from './getWeather';

export function drawWeatherBlock(el, array) {

	const [userCity, tempInfo, weatherIcon] = array;
	const weatherBlock = el;

	weatherBlock.innerHTML = `
	<h2>Вы сейчас смотрите погоду для города - 
	<span class='userCity'>${userCity}</span></h2>
	<p>Температура на улице: </p>
	<p><img class='weatherIcon' src='https://openweathermap.org/img/wn/${weatherIcon}.png' />
	<span class='tempInfo'>${tempInfo}</span>°</p>
	`;

}

export async function changeWeatherInfo(city) {
	const cityInfo = await getWeather(city);
	document.querySelector('.tempInfo').innerText = cityInfo[1];
	document.querySelector('.weatherIcon').src = `https://openweathermap.org/img/wn/${cityInfo[2]}.png`;
	document.querySelector('.userCity').innerText = cityInfo[0];
}

export function drawInputButton(inputBlock, historyBlock) {

	this.inputBlock = inputBlock;
	this.historyBlock = historyBlock;

	this.inputBlock.innerHTML = `
		<input class='cityInput' placeholder='Введите город' />
		<button class='submitCity'>Узнать погоду</button>
	`;

	this.historyBlock.innerHTML = `
		<h3>Просмотренные города/районы</h3>
		<div class='viewedCitiesList'></div>
	`;

	const cityInputEl = document.querySelector('.cityInput');
	
	document.querySelector('.submitCity').addEventListener('click', async () => {
		const userCity = cityInputEl.value;
		cityInputEl.value = '';
		await changeWeatherInfo(userCity);

		document.querySelector('.viewedCitiesList').innerHTML += `
			<p class='${userCity}'>${userCity}</p>
		`;
		document.querySelector(`.${userCity}`).addEventListener('click', async (event) => {
			await changeWeatherInfo(event.target.innerText);
		});
	});
}