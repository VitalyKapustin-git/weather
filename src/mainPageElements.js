/* eslint-disable no-alert */

import { changeWeatherInfo } from "./changeWeather";

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

export function addEL(field, map, button, weather, history) {
  const inputField = field;
  const weatherBlock = weather;
  const historyBlock = history;

  button.addEventListener("click", async () => {
    if (!inputField.value) {
      window.alert(`Введите город`);
    }

    if (
      inputField.value &&
      !historyBlock.querySelector(`.${inputField.value}`)
    ) {
      const viewedCitiesList = historyBlock.querySelector(".viewedCitiesList");
      const userCity = inputField.value;

      try {
        await changeWeatherInfo(userCity, map, weatherBlock);
        const paragraph = document.createElement("p");
        paragraph.className = userCity;
        paragraph.textContent = userCity;
        viewedCitiesList.append(paragraph);

        let citiesArray = JSON.parse(localStorage.getItem("cities"));
        citiesArray.push(userCity);
        if (citiesArray.length > 10) {
          citiesArray = citiesArray.slice(1);
          setTimeout(() => {
            localStorage.removeItem(
              historyBlock.querySelector(".viewedCitiesList").childNodes[0]
                .innerText
            );
          }, 0);
          viewedCitiesList.removeChild(viewedCitiesList.childNodes[0]);
        }
        const citiesString = JSON.stringify(citiesArray);
        setTimeout(() => {
          localStorage.setItem("cities", citiesString);
        }, 0);
      } catch {
        window.alert(`Города ${userCity} не существует`);
      }
    }
    inputField.value = "";
  });
}

export function drawInputButton(input, history, map, weather) {
  const inputBlock = input;
  const historyBlock = history;
  const weatherBlock = weather;

  inputBlock.innerHTML = `
		<input class='cityInput' placeholder='Введите город' />
		<button class='submitCity'>Узнать погоду</button>
	`;

  historyBlock.innerHTML = `
		<h3>Просмотренные города/районы</h3>
		<button class='clearHistoryStorage'>Очистить локальное хранилище</button>
		<div class='viewedCitiesList'></div>
	`;

  historyBlock
    .querySelector(".clearHistoryStorage")
    .addEventListener("click", () => {
      setTimeout(() => {
        localStorage.clear();
      }, 0);
    });

  const cityInputEl = inputBlock.querySelector(".cityInput");
  const inputButton = inputBlock.querySelector(".submitCity");
  addEL(cityInputEl, map, inputButton, weatherBlock, historyBlock);
}

export function recoverStorageCities(root) {
  const rootBlock = root;

  JSON.parse(localStorage.getItem("cities")).forEach((el) => {
    const viewedCitiesList = rootBlock.querySelector(".viewedCitiesList");
    const userCity = el;
    const paragraph = document.createElement("p");
    paragraph.className = userCity;
    paragraph.textContent = userCity;
    viewedCitiesList.append(paragraph);
  });
}
