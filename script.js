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

function Windowmovel(windowElement){
    let estamovendo = false;
    let offsetX = 0;
    let offsetY = 0;


    
   function começarmovimento(e, clientX, clientY) {
      if(!e.target.classList.contains('drag-zone')) return;

      estamovendo=true;
      offsetX=e.clientX-windowElement.offsetLeft;
      offsetY=e.clientY-windowElement.offsetTop;
      windowElement.style.zIndex = "1000";

      if(e.cancetable) e.preventDefault();
    };

    function movendo(clientX, clientY){
       if(!estamovendo) return;

       let newX = e.clientX - offsetX;
       let newY = e.clientY-offsetY;

       if (newX < 0) newX = 0;
       if (newY < 0) newY = 0;

       windowElement.style.left = newX + 'px';
       windowElement.style.top = newY + 'px';
    };

    function pararmovimento() {
      estamovendo=false;
    };


    // ouvintes para evento do mouse //
    windowElement.addEventListener('mousedown', (e) => começarmovimento(e, e.clientX, e.clientY));
    document.addEventListener('mousemove', (e)=> movendo(e.clientX, e.clientY));
    document.addEventListenet('mouseup', (e) => pararmovimento);

    windowElement.addEventListener('touchstart', (e) => {
      const touch = e.touches[0]; // considera só o primeiro dedo que toca
      começarmovimento(e, touch.clientX, touch.clientY);
    }, {passive: false}); 

    document.addEventListener('touchmove', (e) =>{
      const touch = e.touches[0];
      movendo(touch.clientX, touch.clientY);
    }, {passive: false});

    document.addEventListener('touchend', pararmoviemnto);
}

const windowselect = document.getElementById(windowId);
Windowmovel(windowselect);