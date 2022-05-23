
import {createTableFromAutomat, fillDefaultTable, updateTable, updateEndResults} from '../../table.js'
import Level from '../../level.js'
import {afterLastGoOn, mergedStatesTextNone} from '../../helperFunctions.js'
import {showMergingStates} from '../../inputFunctions.js'
export default './declaration.js'


let score = 0;
let time = 0;
let levelNum = 0;

let level = new Level(score, time, levelNum)
let automat = level.getRandomAutomat()
level.draw(false)

let algorithmLog = automat.minimizeAutomat();
console.log("defaultValue: " + JSON.stringify(algorithmLog["defaultValue"]))
let states = createTableFromAutomat(automat);
fillDefaultTable(algorithmLog);

let endResults = updateEndResults(algorithmLog)

let nextUpdates = algorithmLog["step1Updates"]
let stateIndex = 0;

console.log("Alphabet: " + JSON.stringify(automat.eingabealphabet))



console.log("defaultValue: " + JSON.stringify(algorithmLog["defaultValue"]))

console.log("step1: " + JSON.stringify(algorithmLog["step1Updates"]));
console.log("step2: " + JSON.stringify(algorithmLog["step2Updates"]));


let goOnButton = document.getElementById("goOnButton");
let nextExampleButton = document.getElementById("nextExampleButton");
let mergingStatesFields = document.getElementById("rightMerging");


// Variablen die ich für daz Zählen der Zustandspaar-Felder und Runden brauche
let fieldCounter = 0;
let roundCounter = 0;
let isLastRound = false;
let isLastPair = false;


goOnButton.addEventListener("click",function (params) {
    // wird immer dann aufgerufen, wenn das nächste Feld besucht werden soll
    function updateField(){
        // wenn das letzte Paar erreicht ist soll isLastPair true sein
        if (stateIndex + 1 == states.length){
            isLastPair = true
            console.log("isLast")
        }
        //stateidx 1-0 ist immer gleich states.length
        if (stateIndex >= states.length){ 
            fieldCounter += 1
            stateIndex = 0;
            isLastPair = false
        } 
        // tabellenwert updaten und zum nächsten gehen
        updateTable(algorithmLog, nextUpdates, states, stateIndex);
        stateIndex += 1;
    }

    if (isLastPair) {
        nextUpdates = algorithmLog["step2Updates"][JSON.stringify(roundCounter)]
        roundCounter += 1

        //show right declaration
        document.getElementById("decl2").style.display= "block";
        document.getElementById("decl1").style.display= "none";

    }
    // Wenn die letzte Runde anfängt soll noch so lange durchgegangen werden, bis das letzte Feld erreicht ist. Dann beenden
    console.log(isLastPair)
    if (isLastRound){
        document.getElementById("decl3").style.display= "block";
        document.getElementById("decl2").style.display= "none";
        if (!(isLastPair)){
            updateField()
        } else {
            document.getElementById(states[stateIndex-1]).style.background = "white";
            showMergingStates(endResults)
            goOnButton.style.display = "none";
            afterLastGoOn(level)
            // show last declaration
            document.getElementById("decl4").style.display= "block";
            document.getElementById("decl3").style.display= "none";

        }
    }
    // ansonsten immer feld updaten und prüfen ob die letzte runde anfängt
    else {
        updateField()
        if (Object.entries(nextUpdates).length === 0){
            isLastRound = true;
        }
    }
});

nextExampleButton.addEventListener("click", function(params){

    if(!(level.isLastLevel())){
    
        goOnButton.style.display = "block";
        nextExampleButton.style.display = "none";

        document.getElementById("decl4").style.display= "none";
        document.getElementById("decl1").style.display= "block";
        
        mergedStatesTextNone()

        levelNum += 1;

        level = new Level(score, time, levelNum)
        automat = level.getRandomAutomat()
        algorithmLog = automat.minimizeAutomat();
        states = createTableFromAutomat(automat)
        fillDefaultTable(algorithmLog)
        endResults = updateEndResults(algorithmLog)

        level.draw(false)
        console.log("automat: " + JSON.stringify(automat))


        nextUpdates = algorithmLog["step1Updates"]
        stateIndex = 0;

        fieldCounter = 0
        roundCounter = 0
        isLastRound = false
        isLastPair = false
    }
})
