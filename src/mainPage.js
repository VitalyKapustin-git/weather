import { getWeather } from "./getWeather";
import {
  drawWeatherBlock,
  drawInputButton,
  recoverStorageCities,
} from "./mainPageElements";
import { getMapBlock } from "./map";
import { changeWeatherInfo } from "./changeWeather";

export default async function drawMainPage(block) {
  const rootBlock = block;
  const weatherBlock = document.createElement("div");
  weatherBlock.className = "weatherBlock";
  rootBlock.append(weatherBlock);
  const inputBlock = document.createElement("div");
  inputBlock.className = "inputBlock";
  const historyBlock = document.createElement("div");
  historyBlock.className = "historyBlock";

  if (!localStorage.getItem("cities")) {
    setTimeout(() => {
      localStorage.setItem("cities", "[]");
    }, 0);
  }

  const weatherInfo = await getWeather();
  const cityMap = getMapBlock(rootBlock, weatherInfo[3]);
  rootBlock.append(inputBlock);
  rootBlock.append(historyBlock);

  drawWeatherBlock(weatherBlock, weatherInfo);
  drawInputButton(inputBlock, historyBlock, cityMap, weatherBlock);

  historyBlock.addEventListener("click", async (event) => {
    // eslint-disable-next-line prefer-destructuring
    const target = event.target;
    if (target.tagName !== "P") return;
    await changeWeatherInfo(target.innerText, cityMap, weatherBlock);
  });

  if (JSON.parse(localStorage.getItem("cities")).length > 0) {
    recoverStorageCities(rootBlock);
  }
}
