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
      if(e.target.classList.contains('close-button') || e.target.classList.contains('enter-button') || e.target.classList.contains('number-button') || e.target.classList.contains('operation-button')) return;
      if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

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






  async function searchWeather(){
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






    let totalexpression = document.getElementById('screen');
    const maxDigits = 15;

    function expression(caractere){
      if(totalexpression.innerText.length>=maxDigits){
        return
      }
       elementSelected=document.getElementById(caractere).innerText;
       totalexpression.innerText += elementSelected;
    }

    function erase(){
      totalexpression.innerText=totalexpression.innerText.slice(0, -1);
    }

    function clean(){
    totalexpression.innerText="";
    }

    function result(){
     if(!totalexpression || totalexpression.innerText.trim() === ""){
       alert("Please, enter a expression")
       return;
       }

      try{
        let equation = totalexpression.innerText;
        equationLength = eval(equation);
        if(String(equationLength).length>maxDigits){
          alert("The result has excess of digits, only 12 digts are visible")
        }
        
        totalexpression.innerText= eval(equation);
      }
      catch(erro){
        totalexpression.innerText="Error";
        }
      }



      



      function ExecuteSearch(texted){
        const Searched =document.getElementById(texted);

        if(Searched.value.trim() === ""){
          Searched.value="Ops, nothing to search"
          return;
        }

        window.open(`https://www.google.com/search?q=${encodeURIComponent(Searched.value)}`);
      }


      



      const tabuleiro = document.getElementById('tabuleiro');
      let faseAtual = 1;
      let cronometro = null;

      function startFase(normalEmoji, differentEmoji, quantidade, columns){

        clearInterval(cronometro);

        tabuleiro.innerHTML="";
        tabuleiro.style.display = "grid";
        tabuleiro.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        let listEmoji = Array(quantidade-1).fill(normalEmoji);
        listEmoji.push(differentEmoji);
        listEmoji.sort(() => Math.random() - 0.5);

        listEmoji.forEach(emoji => {
          const button = document.createElement('button');
          button.textContent = emoji;
          
          button.addEventListener('click', () => {
            if(emoji === normalEmoji){
              closeWindow('tabuleiro');
              openWindow('wrongAnswer');
              faseAtual=1;
              clearInterval(cronometro);
            }

            if(emoji === differentEmoji){
              faseAtual++;
              proximaFase();
              clearInterval(cronometro);
            }
          });
          tabuleiro.appendChild(button);
        });

          let tempoRestante = 5;

          cronometro = setInterval(() => {
            tempoRestante--;
            if(tempoRestante<=0){
              clearInterval(cronometro);
              closeWindow('tabuleiro');
              openWindow('timeOut');
              faseAtual = 1;
            }
          }, 1000);

      }


      function proximaFase(){

        if(faseAtual === 1){
          startFase("🍎","🍏", 42, 6);
        }


         else if(faseAtual === 2){
          startFase("🏴","🏳️", 42, 6);
        }


        else if(faseAtual === 3){
          startFase("😠","😡", 42, 6);
        }

      
        else if(faseAtual === 4){
          startFase("❤️","🩷", 42, 6);
        }

        else if(faseAtual === 5){
          startFase("🧑🏾","🧑🏽", 42, 6);
        }


        else if(faseAtual === 6){
          startFase("📈","📉", 42, 6);
        }


        else if(faseAtual === 7){
          startFase("🔍","🔎", 48, 6);
        }

        else if(faseAtual === 8){
          startFase("🌜","🌛", 48, 6);
        }

        else if(faseAtual === 9){
          startFase("🤚", "✋", 48, 6);
        }

        else if(faseAtual === 10){
          startFase("📥","📤", 48, 6);
        }

        else if(faseAtual === 11){
          startFase("⏳", "⌛", 48, 6);
        }


        else if(faseAtual === 12){
          startFase("🌞", "☀️", 48, 6);
        }

        else if(faseAtual === 13){
          startFase("🪺", "🪹", 54, 6);
        }

        else if(faseAtual === 14){
          startFase("📸", "📷", 54, 6);
        }

         else if(faseAtual === 15){
          startFase("🔐", "🔒", 54, 6);
        }

        else if(faseAtual === 16){
          startFase("🐳", "🐋", 54, 6);
        }

        else if(faseAtual === 17){
          startFase("🐏", "🐑", 54, 6);
        }

        else if(faseAtual === 18){
          startFase("☔", "☂️", 54, 6);
        }

        else if(faseAtual === 19){
          startFase("😆", "😄", 54, 6);
        }

        else if(faseAtual === 20){
          startFase("😍", "🤩", 60, 6);
        }

        else if(faseAtual === 21){
          startFase("🙂", "😐", 60, 6);
        }

        else if(faseAtual === 22){
          startFase("👄", "🫦", 60, 6);
        }

        else if(faseAtual === 23){
          startFase("🏅", "🎖️", 60, 6);
        }

        else if(faseAtual === 24){
          startFase("🧟", "🧟‍♂️", 60, 6);
        }

        else if(faseAtual === 25){
          startFase("🧑‍🦰", "👨‍🦰", 60, 6);
        }

        else if(faseAtual === 26){
          startFase("🐪", "🐫", 66, 6);
        }

        else if(faseAtual === 27){
          startFase("🦻", "👂", 66, 6);
        }

        else if(faseAtual === 28){
          startFase("😾", "😼", 66, 6);
        }

        else if(faseAtual === 29){
          startFase("👿", "😈", 66, 6);
        }

        else if(faseAtual === 30){
          closeWindow('tabuleiro');
          openWindow('Win');
          faseAtual=1;
          clearInterval(cronometro);
        }


        }




    