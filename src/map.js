/* eslint-disable no-undef */

export function getMapBlock(block, coordinates) {
  const rootBlock = block;
  const [cityLat, cityLng] = coordinates;
  const mapBlock = document.createElement("div");
  mapBlock.id = "mapid";
  mapBlock.style.height = "180px";
  mapBlock.style.width = "360px";
  rootBlock.append(mapBlock);
  const cityMap = L.map(mapBlock);
  cityMap.setView([cityLat, cityLng], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(cityMap);
  return cityMap;
}

export function changeCityMap(coordinates, map) {
  const mapObj = map;
  const [cityLat, cityLng] = coordinates;
  mapObj.setView([cityLat, cityLng], 10);
}
