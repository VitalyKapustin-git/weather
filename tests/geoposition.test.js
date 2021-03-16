import { getUserGeo } from "../src/geoposition";

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          city: "Иваново",
        }),
    })
  );
});

test("if return right city when empty weather call", async () => {
  expect(await getUserGeo()).toMatch("Иваново");
});
