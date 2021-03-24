import drawMainPage from "../src/mainPage";
import * as weather from "../src/getWeather";

weather.getWeather = jest.fn();
const jsonParse = JSON.parse;
JSON.parse = jest.fn(() => ["москва"]);
let rootElement;

beforeAll(async () => {
  weather.getWeather.mockImplementationOnce(() => [
    "Москва",
    25,
    "25d",
    [23.123, 0.45],
  ]);

  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
  <div id="app">
    <div class="weatherBlock">
      <h2>
        Вы сейчас смотрите погоду для города - <span class="userCity"></span>
      </h2>
      <p>Температура на улице:</p>
      <p><img class="weatherIcon" /><span class="tempInfo"></span>°</p>
    </div>
    <div id="mapid"></div>
    <div class="inputBlock">
      <input class="cityInput" placeholder="Введите город" />
      <button class="submitCity">Узнать погоду</button>
    </div>
    <div class="historyBlock">
      <h3>Просмотренные города/районы</h3>
      <button class="clearHistoryStorage">
        Очистить локальное хранилище
      </button>
      <div class="viewedCitiesList"></div>
    </div>
  </div>
  `;
  rootElement = wrapper.querySelector("#app");

  await drawMainPage(rootElement);
});

afterAll(() => {
  JSON.parse = jsonParse;
});

test("if weather change works", async () => {
  expect(rootElement.querySelector(".userCity").innerText).toBe("Москва");
  rootElement.querySelector(".cityInput").value = "Moscow";
  weather.getWeather.mockImplementationOnce(() => [
    "Moscow",
    25,
    "25d",
    [23.123, 0.45],
  ]);
  rootElement.querySelector(".submitCity").click();
  await new Promise((resolve) => setTimeout(resolve, 500));
  expect(rootElement.querySelector(".userCity").innerText).toBe("Moscow");
  expect(rootElement.querySelector(".userCity").innerText).not.toBe("Москва");

  rootElement.querySelector(".cityInput").value = "Ашхабад";
  weather.getWeather.mockImplementationOnce(() => [
    "Ашхабад",
    30,
    "22d",
    [21.123, 1.45],
  ]);
  rootElement.querySelector(".submitCity").click();
  await new Promise((resolve) => setTimeout(resolve, 500));
  expect(rootElement.querySelector(".userCity").innerText).toBe("Ашхабад");

  weather.getWeather.mockImplementationOnce(() => [
    "Moscow",
    30,
    "22d",
    [21.123, 0.45],
  ]);
  rootElement.querySelector("p.Moscow").click();
  await new Promise((resolve) => setTimeout(resolve, 500));
  expect(rootElement.querySelector(".userCity").innerText).toBe("Moscow");
});
