import drawMainPage from '../src/mainPage';

global.L = require("leaflet");
global.fetch = require("node-fetch");

let testRootElement;

beforeAll(async () => {
	testRootElement = document.createElement("div");
	await drawMainPage(testRootElement);
});

test('if input field and submit button are on page', () => {
	expect(testRootElement.querySelector('.cityInput')).toBeDefined();
	expect(testRootElement.querySelector('.submitCity')).toBeDefined();
});

test('if weather change works', async () => {
	testRootElement.querySelector('.cityInput').value = 'Караганды';
	testRootElement.querySelector('.submitCity').click();
	await new Promise(resolve => setTimeout(resolve, 4000));
	expect(testRootElement.querySelector('.userCity').innerHTML).toBe('Tashkent');
});