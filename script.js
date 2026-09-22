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


    
      windoeElement.addEventListener(pointerdown, (e) =>{

      if(!e.target.classList.contains('drag-zone')) return;

      estamovendo=true;

      offsetX=e.clientX-windowElement.offsetLeft;
      offsetY=e.clientY-windowElement.offsetTop;

      windowElement.style.zIndex = "1000";

      windowElement.setPointerCapture(e.pointerId);
    });

    windowElement.addEventListener('pointermove', (e) =>{
       if(!estamovendo) return;

       let newX = e.clientX - offsetX;
       let newY = e.clientY-offsetY;

       if (newX < 0) newX = 0;
       if (newY < 0) newY = 0;

       windowElement.style.left = newX + 'px';
       windowElement.style.top = newY + 'px';
    });

    windowElement.addEventListener('pointerup', (e) => {
      if(!estamovendo) return;
      estamovendo=false;

      windowElement.realeasePointerCapture(e.pointerId);
    });
}

const windowselect = document.getElementById(windowId);
Windowmovel(windowselect);