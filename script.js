function updateclock(){
   const now = new Date();
   const hour = String(now.getHours()).padStart(2, "0");
   const minute = String(now.getMinutes()).padStart(2,"0");
   
   document.getElementById("clock").textContent = `${hour}, ${minute}`;
}

setInterval(updateclock, 1000);
updateclock();

function openWindow(windowId){
   document.getElementById("window").style.display = "block";
}

function closeWindow(windowId){
   document.getElementById("window").style.display="none";
}