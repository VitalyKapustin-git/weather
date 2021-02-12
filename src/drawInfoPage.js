import getWeather from './getWeather';
import { drawWeatherBlock, drawInputButton } from './drawElements';

export default async function drawInfoPage(rootElement) {
	const weatherBlock = document.createElement("div");
	const inputBlock = document.createElement("div");
	const historyBlock = document.createElement("div");
	rootElement.append(weatherBlock);
	rootElement.append(inputBlock);
	rootElement.append(historyBlock);

	drawWeatherBlock(weatherBlock, await getWeather());
	drawInputButton(inputBlock, historyBlock);
}