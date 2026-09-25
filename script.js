function updateclock(){
   const now = new Date();
   const hour = String(now.getHours()).padStart(2, "0");
   const minute = String(now.getMinutes()).padStart(2,"0");
   
   document.getElementById("clock").textContent = `${hour}:${minute}`;
   
}

setInterval(updateclock, 1000);
updateclock();

function openWindow(windowId){
   document.getElementById(windowId).style.display = "block";
}

function closeWindow(windowId){
   document.getElementById(windowId).style.display="none";
}

let maiorzIndex = 10;

function Windowmovel(windowElement){
   windowElement.querySelector(".window-geral");

    let offsetX = 0;
    let offsetY = 0;

    function getPoint(e){
      return e.touches ? e.touches[0] : e;
    }

    function movimento(e) {

      const point = getPoint(e);
      let newX = point.clientX - offsetX;
      let newY = point.clientY - offsetY;

      if(newX < 0) newX=0;
      if(newY < 0) newY=0;

      windowElement.style.left = newX + 'px';
      windowElement.style.top = newY + 'px';
    }

    function iniciar(e){
      if(e.target.classList.contains('close-button')) return;
      if(e.target.tagName === 'INPUT' || e.target.id === 'textInput') return;

      const point = getPoint(e);
      offsetX = point.clientX - windowElement.offsetLeft;
      offsetY = point.clientY - windowElement.offsetTop;
      maiorzIndex++;
      windowElement.style.zIndex=maiorzIndex;

      window.addEventListener('mousemove', movimento);
      window.addEventListener('touchmove', movimento);
    }

    function stop(){
      window.removeEventListener('mousemove', movimento);
      window.removeEventListener('touchmove', movimento);
    }

    windowElement.addEventListener('mousedown', iniciar);
    windowElement.addEventListener('touchstart', iniciar);

    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);

  }


  document.querySelectorAll(".window-geral").forEach(Windowmovel);
  

  async function searchWeather(Searched){
    const inputElement = document.getElementById('weather-input');
    if(!inputElement || inputElement.value.trim() === ""){
      alert("Please, enter a city name.");
      return;
    }
  
    Searched = inputElement.value.trim();
    const name = document.getElementById('city-name');
    const temp = document.getElementById('city-weather');

    name.innerText="Loading...";
    temp.innerText="-- °C";

    try{
      const geoResposta = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(Searched)}&count=1`);
      const geoDados = await geoResposta.json();

      if(!geoDados.results) {
       name.innerText="Not Found";
       temp.innerText="-- °C";
       return;
      }

      const realName = geoDados.results[0].name;
      const lat = geoDados.results[0].latitude;
      const lon = geoDados.results[0].longitude;

      const climaResposta = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const climaDados = await climaResposta.json();

      name.innerText = realName;
      temp.innerText = climaDados.current_weather.temperature + " °C";
    }
      catch (erro){
      name.innerText="Error";
      temp.innerText = "-- °C";
      }
    }

    let totalexpression = document.getElementbyId('screen');

    function expression(Buttonselected){
       const Elementselected = document.getElementById(Buttonselected);
       totalexpression += Elementselected;
       totalexpression.innerText=totalexpression;
    }

    function erase(){
      totalexpression--;
      totalexpression.innerText=totalexpression;
    }

    function clean(){
    totalexpression="";
    totalexpression.innerText="";
    }

    function result(){
     if(totalexpression.value.trim ==="" || !totalexpression){
       alert("Please, enter a expression"){
       return;
       }
     }
    }

  