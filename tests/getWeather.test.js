import { getWeather } from "../src/getWeather";
import * as geo from "../src/geoposition";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          name: "Лондон",
          weather: [
            {
              icon: "25d",
            },
          ],
          main: {
            temp: 25,
          },
          coord: {
            lat: 23.123,
            lon: 0.45,
          },
        }),
    })
  );
  geo.getUserGeo = jest.fn(() => "Москва");
});

test("if return right city when empty weather call", async () => {
  const weatherInfo1 = await getWeather();
  const [city] = weatherInfo1;

  expect(city).toBe("Москва");
});

test("if return right weather info about London", async () => {
  const weatherInfo2 = await getWeather("Лондон");
  const [city2, temp2, weatherIcon2, cityCoordinates2] = weatherInfo2;

  expect(city2).toBe("Лондон");
  expect(temp2).toBe(25);
  expect(cityCoordinates2[0]).toBe(23.123);
  expect(cityCoordinates2[1]).toBe(0.45);
  expect(weatherIcon2).toBe("25d");
});
