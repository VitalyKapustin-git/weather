(()=>{"use strict";!async function(t){const n=document.createElement("div"),e=document.createElement("div");t.append(n),t.append(e),function(t,n){let[e,a,i]=n;t.innerHTML=`\n\t<h2>Вы сейчас смотрите погоду для города - <span class='userCity'>${e}</span></h2>\n\t<p>Температура на улице: </p>\n\t<p><img id='weatherIcon' src='https://openweathermap.org/img/wn/${i}.png' />\n\t<span class='tempInfo'>${a}</span>°</p>\n\t`}(n,await async function(t){const n=await async function(){const t=await fetch("https://get.geojs.io/v1/ip/geo.json");return(await t.json()).city}(),e=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t||n}&units=metric&appid=8a6f11e64b821c66b1e532741f83e712`),a=await e.json(),i=a.weather[0].icon;return[t||n,Math.floor(a.main.temp),i]}()),e.innerHTML="\n\t\t<input id='cityInput' placeholder='Введите город' />\n\t\t<button id='submitCity'>Узнать погоду</button>\n\t"}(document.querySelector("#app"))})();