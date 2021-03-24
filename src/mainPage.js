import { getWeather } from "./getWeather";
import {
  drawWeatherBlock,
  drawInputButton,
  recoverStorageCities,
  addDelegEL,
} from "./mainPageElements";
import { getMapBlock } from "./map";

export default async function drawMainPage(root) {
  const rootBlock = root;
  const weatherBlock = rootBlock.querySelector(".weatherBlock");
  const inputBlock = rootBlock.querySelector(".inputBlock");
  const historyBlock = rootBlock.querySelector(".historyBlock");

  if (!localStorage.getItem("cities")) {
    setTimeout(() => {
      localStorage.setItem("cities", "[]");
    }, 0);
  }
  const weatherInfo = await getWeather();
  const cityMap = getMapBlock(rootBlock, weatherInfo[3]);

  drawWeatherBlock(weatherBlock, weatherInfo);
  drawInputButton(inputBlock, historyBlock, cityMap, weatherBlock, rootBlock);

  addDelegEL(historyBlock, cityMap, weatherBlock);

  if (JSON.parse(localStorage.getItem("cities")).length > 0) {
    recoverStorageCities(rootBlock);
  }
}
