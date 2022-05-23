import Automat from '../../automat.js'
import {createTableFromAutomatWithInput, updateEndResults} from '../../table.js'
import { rightTableValues, rightMergeValues, showMergingStates} from '../../inputFunctions.js'
import Level from '../../level.js'
import {getMergeStates, mergedStatesTextNone} from '../../helperFunctions.js'


export default '../gamePage.js'

let score = 0;
let time = 0;
let levelNum = 0;

let scoreField = document.getElementById("score");
scoreField.innerText = "Punkte: " + score;

let levelField = document.getElementById("level");
levelField.innerText = "Level " + levelNum;

let level = new Level(score, time, levelNum)
let automat = level.getRandomAutomat()
level.draw(false)

let started=false

let algorithmLog = automat.minimizeAutomat();

let inputFieldIDs = createTableFromAutomatWithInput(automat);
let ergebnisButton = document.getElementById("ergebnisButton");
let nextButton = document.getElementById("nextButton")
let startButton = document.getElementById("startButton")
let restart = document.getElementById("restart")
let endButton = document.getElementById("endButton")

let endResults = updateEndResults(algorithmLog)
let mergeStatesList = getMergeStates(endResults)
let isAllRight
console.log("Endresults: " + JSON.stringify(endResults))


// starts the level
function start(){
    
    let startElement = document.getElementById("thisModus");
    //startElement.style.display="flex";
  
    let aufgabeElement = document.getElementById("start");

}  


startButton.addEventListener("click",function (params) {
    start()
    document.getElementById("thisModus").style.display = "block";
    document.getElementById("start-page").style.display = "none";
});


ergebnisButton.addEventListener("click", function (params) {
    let rightTable = rightTableValues(inputFieldIDs, endResults);
    let scoreAdd1 = rightTable[0]
    let tableIsRight = rightTable[1]
    score += scoreAdd1
    // input of mergeInputFields

    let rightMerge = rightMergeValues(mergeStatesList)
    const scoreAdd2 = rightMerge[0], mergeIsRight = rightMerge[1];
    score += scoreAdd2

    showMergingStates(endResults)

    if (tableIsRight && mergeIsRight){
        isAllRight = true;
    } else {
        isAllRight = false;
    }

    if (isAllRight){
        levelNum += 1;
        // todo message alles richtig

    }

    console.log("isAllRight " + isAllRight)
    console.log("levelNum " + levelNum)

    scoreField.innerText = "Punkte: " + JSON.stringify(score);

    if (score >=0){
        document.getElementById("nextButtonField").style.display = "block";
    } else {
        document.getElementById("endButtonField").style.display = "block";
    }


    document.getElementById("ergebnisButtonField").style.display = "none";
    level.draw(true)
    
});


nextButton.addEventListener("click", function (params){
    if(!(level.isLastLevel())){
        document.getElementById("nextButtonField").style.display = "none";
        document.getElementById("ergebnisButtonField").style.display = "block";

        for (let i=1; i <= 5; i++){
            let mergeState = document.getElementById("mergedStates" + i)
            mergeState.value = "";
            mergeState.style.backgroundColor = 'white'
            mergeState.disabled = false
        }
        mergedStatesTextNone()

        time = 0;
        levelField.innerText = "Level " + levelNum;
        level = new Level(score, time, levelNum)
        automat = level.getRandomAutomat()
        level.draw(false)
        
        started=false
        algorithmLog = automat.minimizeAutomat();
        inputFieldIDs = createTableFromAutomatWithInput(automat);
        endResults = updateEndResults(algorithmLog)
        mergeStatesList = getMergeStates(endResults)
    } else {
        document.getElementById("endscreen").style.display="block";
        document.getElementById("endscore").innerText="Punkte: " + score;
        document.getElementById("endlevel").innerText="Level: " + score;
    }


});

endButton.addEventListener("click", function (params){
    document.getElementById("thisModus").style.display="none";
    document.getElementById("endscreen").style.display="block";
    document.getElementById("lostGame").style.display="block";
    document.getElementById("endscore").innerText="Punkte: " + score;
    document.getElementById("endlevel").innerText="Level: " + levelNum;

})

restart.addEventListener("click",function (params) {
    start()
    document.getElementById("thisModus").style.display = "block";
    document.getElementById("endscreen").style.display = "none";
    document.getElementById("lostGame").style.display = "lostGame";

    document.getElementById("nextButtonField").style.display = "none";
    document.getElementById("ergebnisButtonField").style.display = "block";

    for (let i=1; i <= 5; i++){
        let mergeState = document.getElementById("mergedStates" + i)
        mergeState.value = "";
        mergeState.style.backgroundColor = 'white'
        mergeState.disabled = false
    }
    mergedStatesTextNone()
    level = 0;
    score = 0;
    time = 0;
    levelField.innerText = "Level " + levelNum;
    scoreField.innerText = "Punkte: " + score;
    document.getElementById("endButtonField").style.display="none";
    level = new Level(score, time, levelNum)
    automat = level.getRandomAutomat()
    level.draw(false)
    
    started=false
    algorithmLog = automat.minimizeAutomat();
    inputFieldIDs = createTableFromAutomatWithInput(automat);
    endResults = updateEndResults(algorithmLog)
    mergeStatesList = getMergeStates(endResults)
});