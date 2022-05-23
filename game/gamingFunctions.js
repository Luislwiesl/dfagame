/*
export function startTimer(timeElapsedInPercent){
  let started = true
  if(started){
    setInterval(function(){ 
      if(timeElapsedInPercent===1000){
        clearInterval();
        gameEnding();
        return;
      }
      timeElapsedInPercent += started ? 1 : 0
      document.getElementById('timerbar').style.width=timeElapsedInPercent.toString() + '%'
      }, 500);
  }else{
    clearInterval()
  }

}
*/


function handleScoreName() {

  const name = document.getElementById('player-name').value;

  sessionStorage.setItem("NAME", name);
  console.log(name)
  

  const score = document.getElementById('score').value;

  sessionStorage.setItem("SCORE", score);
  console.log(score)

  window.location.href = '../../playerScorePage/result.html';
}


// should get called if time is up
export function gameEnding(){
  let aufgabenDiv = document.getElementById("aufgabe")
  aufgabenDiv.style.display="none"
  let endscreen = document.getElementById("endscreen")
  endscreen.style.display="block";

  let score = document.getElementById("score").innerText
  console.log("scoreString " + score)

  endscreen.innerText = score
  let endErgebnisElement = document.getElementById("erreicht");

  handleScoreName()
}





  
