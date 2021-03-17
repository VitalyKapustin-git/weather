import drawMainPage from "../src/mainPage";
import * as weather from "../src/getWeather";

global.L = require("leaflet");

let testRootElement;

weather.getWeather = jest.fn();
JSON.parse = jest.fn(() => ["москва"]);

beforeAll(async () => {
  weather.getWeather.mockImplementationOnce(() => [
    "Москва",
    25,
    "25d",
    [23.123, 0.45],
  ]);
  testRootElement = document.createElement("div");
  JSON.parse.mockImplementationOnce(() => 2);
  await drawMainPage(testRootElement);
});

afterEach(() => {
  weather.getWeather.mockClear();
});

test("if input field and submit button are on page", () => {
  expect(testRootElement.querySelector(".cityInput")).toBeDefined();
  expect(testRootElement.querySelector(".submitCity")).toBeDefined();
});

test("if weather change works", async () => {
  expect(testRootElement.querySelector(".userCity").innerHTML).toBe("Москва");
  testRootElement.querySelector(".cityInput").value = "Ташкент";
  weather.getWeather.mockImplementationOnce(() => [
    "Ташкент",
    25,
    "25d",
    [23.123, 0.45],
  ]);
  testRootElement.querySelector(".submitCity").click();
  await new Promise((resolve) => setTimeout(resolve, 500));
  expect(testRootElement.querySelector(".userCity").innerHTML).toBe("Ташкент");
  expect(testRootElement.querySelector(".userCity").innerHTML).not.toBe(
    "Москва"
  );
});
