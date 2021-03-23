const L = require("leaflet");

export function getMapBlock(block, coordinates) {
  const rootBlock = block;
  const [cityLat, cityLng] = coordinates;
  const mapBlock = rootBlock.querySelector("#mapid");
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
