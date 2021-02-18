import drawMainPage from '../src/mainPage';

global.L = require("leaflet");
global.fetch = require("node-fetch");

let testRootElement;

beforeEach(async () => {
	testRootElement = document.createElement("div");
	testRootElement.className = 'test';
	await drawMainPage(testRootElement);
});

test('if check of existing weatherBlock returns true', () => {
	expect(testRootElement.querySelector('.weatherBlock')).toBeDefined();
	expect(testRootElement.querySelector('.weatherBlock').className).not.toBe('fklsdjfads');
	expect(testRootElement.querySelector('#mapid')).toBeDefined();
	expect(testRootElement.querySelector('.inputBlock')).toBeDefined();
	expect(testRootElement.querySelector('.historyBlock')).toBeDefined();
});