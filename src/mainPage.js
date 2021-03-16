import { getWeather } from "./getWeather";
import {
  drawWeatherBlock,
  drawInputButton,
  recoverStorageCities,
} from "./mainPageElements";
import { getMapBlock } from "./map";

export default async function drawMainPage(block) {
  const rootBlock = block;
  const weatherBlock = document.createElement("div");
  weatherBlock.className = "weatherBlock";
  rootBlock.append(weatherBlock);
  const inputBlock = document.createElement("div");
  inputBlock.className = "inputBlock";
  const historyBlock = document.createElement("div");
  historyBlock.className = "historyBlock";

  const weatherInfo = await getWeather();
  const cityMap = getMapBlock(rootBlock, weatherInfo[3]);
  rootBlock.append(inputBlock);
  rootBlock.append(historyBlock);

  drawWeatherBlock(weatherBlock, weatherInfo);
  drawInputButton(inputBlock, historyBlock, cityMap, weatherBlock);

  if (localStorage.length > 0) {
    recoverStorageCities(cityMap, rootBlock, weatherBlock);
  }
}
