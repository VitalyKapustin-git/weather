import { changeWeatherInfo } from "./changeWeather";

export function drawWeatherBlock(el, array) {
  const [userCity, tempInfo, weatherIcon] = array;
  const weatherBlock = el;

  weatherBlock.querySelector(".userCity").innerText = userCity;
  weatherBlock.querySelector(
    ".weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
  weatherBlock.querySelector(".tempInfo").innerText = tempInfo;
}

export function addDelegEL(historyBlock, cityMap, weatherBlock) {
  historyBlock.addEventListener("click", async (event) => {
    const { target } = event;
    if (target.tagName !== "P") return;
    await changeWeatherInfo(target.innerText, cityMap, weatherBlock);
  });
}

function addCityToHistory(userCity, viewedCitiesList, historyBlock) {
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
        historyBlock.querySelector(".viewedCitiesList").childNodes[0].innerText
      );
    }, 0);
    viewedCitiesList.removeChild(viewedCitiesList.childNodes[0]);
  }

  const citiesString = JSON.stringify(citiesArray);
  setTimeout(() => {
    localStorage.setItem("cities", citiesString);
  }, 0);
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
        addCityToHistory(userCity, viewedCitiesList, historyBlock);
      } catch {
        window.alert(`Города ${userCity} не существует`);
      }
    }
    inputField.value = "";
  });
}

export function drawInputButton(input, history, map, weather, root) {
  const inputBlock = input;
  const historyBlock = history;
  const rootBlock = root;

  historyBlock
    .querySelector(".clearHistoryStorage")
    .addEventListener("click", () => {
      setTimeout(() => {
        localStorage.setItem("cities", "[]");
        rootBlock.querySelector(".viewedCitiesList").innerHTML = "";
      }, 0);
    });

  const cityInputEl = inputBlock.querySelector(".cityInput");
  const inputButton = inputBlock.querySelector(".submitCity");
  addEL(cityInputEl, map, inputButton, weather, historyBlock);
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
