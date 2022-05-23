import {createTableFromAutomatWithInput, disableInputFields, updateEndResults, disableMergeInputs} from '../../table.js'
import {rightValueInputPerRound, checkMergeInput} from '../../inputFunctions.js'
import {afterLastGoOn, getMergeStates} from '../../helperFunctions.js'
import Level from '../../level.js'

export default './tutorialPage.js'

console.log('Ich das Spiel');

let score = 0;
let time = 0;
let levelNum = 0;

let level = new Level(score, time, levelNum)
let automat = level.getRandomAutomat()
level.draw(false)


let algorithmLog = automat.minimizeAutomat()
let endResults = updateEndResults(algorithmLog)
let states = Object.keys(algorithmLog["defaultValue"])

let nextExampleButton = document.getElementById("nextExampleButton")
let oneMoreButton = document.getElementById("oneMore")
let mergeInput = document.getElementById("mergedStates")

console.log("Alphabet: " + JSON.stringify(automat.eingabealphabet))

let inputFieldIDs = createTableFromAutomatWithInput(automat)

disableInputFields(inputFieldIDs)
disableMergeInputs()

document.addEventListener('keydown', logKey);

let fieldCounter = 0
let roundCounter = 0
let lastRound = false
let isLastPair = false
let nextUpdates = algorithmLog["step1Updates"]
let alreadyDoneList = [];
let tableIsDone = false;
let mergeStatesList = getMergeStates(endResults)
let mergeLength = mergeStatesList.length
let mergeCounter = 1

function logKey(e) {

  // checks if field is already marked 
  function checkAlreadyDoneList(currentInput){
    if(alreadyDoneList.includes(currentInput)){
      return true
    } else {
      return false
    }
  }

  // Wenn alle Felder der Tabelle ausgefüllt sind, kann eingefügt werden welche Zustände gemerged werden
  function useMergeInputFields(){
    console.log("merging")
    let mergeField = document.getElementById("mergedStates" + mergeCounter)

    mergeField.disabled = false
    mergeField.style.backgroundColor = "#ffff66"
    console.log(JSON.stringify(mergeField))
    let mergeIsRight
    [mergeIsRight, mergeStatesList] = checkMergeInput(mergeField, mergeStatesList);
    
    if (mergeIsRight){ 
      // richtiger Zustand wird aus mergelist entfernt
      
      console.log("mergeStatesList " + mergeStatesList)
      mergeField.disabled = true
      mergeField.style.backgroundColor = "white"

      if (mergeCounter >= mergeLength){
        afterLastGoOn(level)
        nextExampleButton.style.display = "block";
        // show last declaration
        document.getElementById("decl4").style.display= "block";
        document.getElementById("decl3").style.display= "none";
      }
      // nächstes Feld freigeben
      else {
        mergeCounter += 1
        mergeField = document.getElementById("mergedStates" + mergeCounter)
        mergeField.disabled = false
        mergeField.style.backgroundColor = "#ffff66"
      }

    

      // wenn alle Ergebnisse richtig sind
      console.log(mergeLength)
      console.log(mergeCounter)


    }
    


  }

  
  if (isLastPair && lastRound){
    useMergeInputFields()
    tableIsDone = true
  } else {
    if (Object.keys(nextUpdates).length === 0){
      lastRound = true
    }

    if (e.code === "Enter"){

      function updateField(){

        if (tableIsDone) {
          useMergeInputFields()
          console.log("bla!")
        } else {
          console.log(fieldCounter)
          console.log(inputFieldIDs.length)
          // wenn das letzte Paar erreicht ist soll isLastPair true sein
          if (fieldCounter + 1 == inputFieldIDs.length){
              isLastPair = true
              console.log("isLast")
          }
          //counter 1-0 ist immer gleich states.length
          if (fieldCounter >= inputFieldIDs.length){ 
            fieldCounter = 0;
            isLastPair = false
          
            // Bei neuer Runde sollen updates erneuert werden
            nextUpdates = algorithmLog["step2Updates"][JSON.stringify(roundCounter)]
            roundCounter += 1

            //show right declaration
            document.getElementById("decl2").style.display= "block";
            document.getElementById("decl1").style.display= "none";
          } 
          
          if (isLastPair && lastRound){
            currentInput.style.background = "white";
            currentInput.disabled = true
            tableIsDone = true

            // show last declaration
            document.getElementById("decl3").style.display= "block";
            document.getElementById("decl2").style.display= "none";
          }
        }
      }
      
      function nextField(){
        // neues Textfeld 
        inputFieldId = inputFieldIDs[fieldCounter];
        currentInput = document.getElementById(inputFieldId)
        currentInput.disabled = false

        // color for current textfield
        let newStateField = document.getElementById(inputFieldId);
        newStateField.style.background = "#ffff66";
      }

      let inputFieldId = inputFieldIDs[fieldCounter];
      let currentInput = document.getElementById(inputFieldId)

      console.log("inputFieldId " + inputFieldId)
      // remove color
      
      // wenn Eingabe richtig ist kann das nächste Feld aufgerufen werden
      if (rightValueInputPerRound(inputFieldId, nextUpdates)){
        currentInput.disabled = true
        currentInput.style.background = "white";
        fieldCounter += 1
        updateField()

      
        if (currentInput.value){
          alreadyDoneList.push(inputFieldId)
        }
        nextField()

            // wenn das Feld bereits ausgefüllt ist wird es übersprungen
        if(!(tableIsDone)){
          while (checkAlreadyDoneList(inputFieldId)){
            console.log("already done")
            currentInput.disabled = true
            currentInput.style.background = "white";
            fieldCounter += 1
            updateField()
    
            // next field
            currentInput = document.getElementById(inputFieldId)
            inputFieldId = inputFieldIDs[fieldCounter]
            nextField()
          }
        }
      }
    }
  }
}


nextExampleButton.addEventListener("click", function(params){
  document.getElementById("decl4").style.display= "none";
  if(!(level.isLastLevel())){
    nextExampleButton.style.display = "none";
    for (let i=1; i <= 5; i++){
      let mergeState = document.getElementById("mergedStates" + i)
      mergeState.value = "";
    }

    document.getElementById("decl1").style.display= "block";

    levelNum += 1;
    level = new Level(score, time, levelNum)
    automat = level.getRandomAutomat()
    level.draw(false)

    algorithmLog = automat.minimizeAutomat()
    endResults = updateEndResults(algorithmLog)
    states = Object.keys(algorithmLog["defaultValue"])

    nextExampleButton = document.getElementById("nextExampleButton")
    oneMoreButton = document.getElementById("oneMore")
    mergeInput = document.getElementById("mergedStates")

    inputFieldIDs = createTableFromAutomatWithInput(automat)

    disableInputFields(inputFieldIDs)
    disableMergeInputs()

    fieldCounter = 0
    roundCounter = 0
    lastRound = false
    isLastPair = false
    nextUpdates = algorithmLog["step1Updates"]
    alreadyDoneList = [];
    tableIsDone = false;
    mergeStatesList = getMergeStates(endResults)
    mergeLength = mergeStatesList.length
    mergeCounter = 1
  }
})