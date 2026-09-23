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

let maiorzIndex = "1000";

function Windowmovel(windowElement){

    let offsetX = 0;
    let offsetY = 0;

    function getPoint(e){
      return e.touches? e.touches[0] : e;
    }

    function movimento(e) {

      const point = getPoint(e);
      let newX = point.clientX - offsetX;
      let newY = point.clientY - offsetY;

      if(newX < 0) newX=0;
      if(newY < 0) newY=0;

      windowElement.style.left = newX + 'px';
      windowElement.style.top = newY + 'px';

      if(e.cancelable) e.preventDefault();
    }

    function iniciar(e){
      if(e.target.classList.contains('close-button')) return;
      if(e.target.tagName === 'INPUT' || e.target.id === 'textInput') return;

      const point = getPoint(e);
      offsetX = point.clientX - windowElement.offsetLeft;
      offsetY = point.clientY - windowElement.offsetTop;
      maiorzIndex++;
      windowElement.style.zIndex=maiorzIndex;

      window.addEventListener('mousemove', movimento, { passive: false });
      window.addEventListener('touchmove', movimento)
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