import drawMainPage from '../src/mainPage';
import * as weather from '../src/getWeather';

global.L = require("leaflet");

let testRootElement;

beforeEach(async () => {
  weather.getWeather = jest.fn(() => ['Ташкент', 25, '25d', [23.123, 0.45]]);
  testRootElement = document.createElement("div");
  testRootElement.className = "test";
  await drawMainPage(testRootElement);
});

test("if check of existing weatherBlock returns true", () => {
  expect(weather.getWeather).toHaveBeenCalledTimes(1);
  expect(testRootElement.querySelector(".weatherBlock")).toBeDefined();
  expect(testRootElement.querySelector(".weatherBlock").className).not.toBe(
    "fklsdjfads"
  );
  expect(testRootElement.querySelector("#mapid")).toBeDefined();
  expect(testRootElement.querySelector(".inputBlock")).toBeDefined();
  expect(testRootElement.querySelector(".historyBlock")).toBeDefined();
});
