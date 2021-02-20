(()=>{"use strict";async function t(t){const e=await async function(){const t=await fetch("https://get.geojs.io/v1/ip/geo.json");return(await t.json()).city}(),n=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(t||e)}&units=metric&appid=8a6f11e64b821c66b1e532741f83e712`),a=await n.json(),c=a.weather[0].icon;return[t||e,Math.floor(a.main.temp),c,[a.coord.lat,a.coord.lon]]}async function e(e,n,a){const c=await t(e),o=c[3],i=a;i.querySelector(".tempInfo").innerText=c[1],i.querySelector(".weatherIcon").src=`https://openweathermap.org/img/wn/${c[2]}.png`,i.querySelector(".userCity").innerHTML=c[0],function(t,e){const n=e,[a,c]=t;n.setView([a,c],10)}(o,n)}!async function(n){const a=document.querySelector("#app"),c=document.createElement("div");c.className="weatherBlock",a.append(c);const o=document.createElement("div");o.className="inputBlock";const i=document.createElement("div");i.className="historyBlock";const r=await t(),s=function(t,e){const n=t,[a,c]=e,o=document.createElement("div");o.id="mapid",o.style.height="180px",o.style.width="360px",n.append(o);const i=L.map(o);return i.setView([a,c],10),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(i),i}(a,r[3]);a.append(o),a.append(i),function(t,e){const[n,a,c]=e;t.innerHTML=`\n\t<h2>Вы сейчас смотрите погоду для города - \n\t<span class='userCity'>${n}</span></h2>\n\t<p>Температура на улице: </p>\n\t<p><img class='weatherIcon' src='https://openweathermap.org/img/wn/${c}.png' />\n\t<span class='tempInfo'>${a}</span>°</p>\n\t`}(c,r),function(t,n,a,c){const o=t,i=n,r=c;o.innerHTML="\n\t\t<input class='cityInput' placeholder='Введите город' />\n\t\t<button class='submitCity'>Узнать погоду</button>\n\t",i.innerHTML="\n\t\t<h3>Просмотренные города/районы</h3>\n\t\t<button class='clearHistoryStorage'>Очистить локальное хранилище</button>\n\t\t<div class='viewedCitiesList'></div>\n\t",i.querySelector(".clearHistoryStorage").addEventListener("click",(()=>{setTimeout((()=>{localStorage.clear()}),0)})),function(t,n,a,c,o){const i=t,r=c,s=o;a.addEventListener("click",(async()=>{if(i.value||window.alert("Введите город"),i.value){const t=s.querySelector(".viewedCitiesList"),a=i.value;i.value="";try{await e(a,n,r);const c=document.createElement("p");c.className=a,c.textContent=a,t.append(c),t.querySelector(`.${a}`).addEventListener("click",(async t=>{await e(t.target.innerText,n,r)})),localStorage.setItem(`${a}`,`${a}`),localStorage.length>10&&(localStorage.removeItem(s.querySelector(".viewedCitiesList").childNodes[0].innerText),t.removeChild(t.childNodes[0]))}catch{window.alert(`Города ${a} не существует`)}}}))}(o.querySelector(".cityInput"),a,o.querySelector(".submitCity"),r,i)}(o,i,s,c),localStorage.length>0&&function(t,n,a){const c=t,o=n,i=a;Object.values(localStorage).forEach((t=>{const n=o.querySelector(".viewedCitiesList"),a=t,r=document.createElement("p");r.className=a,r.textContent=a,n.append(r),n.querySelector(`.${a}`).addEventListener("click",(async t=>{await e(t.target.innerText,c,i)}))}))}(s,a,c)}()})();