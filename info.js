var modal = document.getElementById("myModal");
      
var span = document.getElementsByClassName("close")[0];

var startButton = document.getElementsByClassName("button button1")[0];

startButton.onclick = function() {
    modal.style.display = "none";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}