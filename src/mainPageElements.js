/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */

import { changeWeatherInfo } from './weather';

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

export function addEL(field, map, button) {

	const inputField = field;

	button.addEventListener('click', async () => {

		if (!inputField.value) {
			window.alert(`Введите город`);
		};

		if (inputField.value) {
			const viewedCitiesList = document.querySelector('.viewedCitiesList');
			const userCity = inputField.value;
			inputField.value = '';

			try {
				await changeWeatherInfo(userCity, map);

				const paragraph = document.createElement("p");
				paragraph.className = userCity;
				paragraph.textContent = userCity;
				viewedCitiesList.append(paragraph);

				document.querySelector(`.${userCity}`).addEventListener('click', async (event) => {
					await changeWeatherInfo(event.target.innerText, map);
				});

				localStorage.setItem(`${userCity}`, `${userCity}`);

				if (localStorage.length > 10) {
					localStorage.removeItem(document.querySelector(".viewedCitiesList").childNodes[0].innerText);
					viewedCitiesList.removeChild(viewedCitiesList.childNodes[0]);
				}
			} catch {
				window.alert(`Города ${userCity} не существует`);
			}
		};
	});
}

export function drawInputButton(block1, block2, map) {
	const inputBlock = block1;
	const historyBlock = block2;

	inputBlock.innerHTML = `
		<input class='cityInput' placeholder='Введите город' />
		<button class='submitCity'>Узнать погоду</button>
	`;

	historyBlock.innerHTML = `
		<h3>Просмотренные города/районы</h3>
		<button class='clearHistoryStorage'>Очистить локальное хранилище</button>
		<div class='viewedCitiesList'></div>
	`;
	
	historyBlock.querySelector('.clearHistoryStorage').addEventListener('click', () => {
		setTimeout(() => {
			localStorage.clear();
		},0)
	});

	const cityInputEl = inputBlock.querySelector('.cityInput');
	const inputButton = inputBlock.querySelector('.submitCity');
	addEL(cityInputEl, map, inputButton);
}

export function recoverStorageCities(map) {

	const mapObject = map;

	Object.values(localStorage).forEach((el) => {
		const viewedCitiesList = document.querySelector('.viewedCitiesList');
		const userCity = el;
		const paragraph = document.createElement("p");
		paragraph.className = userCity;
		paragraph.textContent = userCity;
		viewedCitiesList.append(paragraph);

		document.querySelector(`.${userCity}`).addEventListener('click', async (event) => {
			await changeWeatherInfo(event.target.innerText, mapObject);
		});
	});
}
