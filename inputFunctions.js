import {getMergeStates} from '../../helperFunctions.js'

export function rightValueInputPerRound(element, nextUpdates){
  let inputValue = document.getElementById(element).value
  let tableColumnId = element.replace("-input", "")

  console.log("inputValue " + inputValue)
  console.log("tableColumnId " + tableColumnId)
  console.log("nextUpdates " + JSON.stringify(nextUpdates))

  if (tableColumnId in nextUpdates){
    if (inputValue){
      return true
    }
    else{
      return false
    }
  }else{
    if (inputValue){
      return false
    }
    else{
      return true
    }
  }
}


export function giveResult(fieldId, isRight){

  let resultElement = document.getElementById(fieldId)
  resultElement.disabled = true
  if (isRight){
      resultElement.style.backgroundColor= '#04AA6D';
  }else{
      resultElement.style.backgroundColor='crimson'
  }
}


export function rightTableValues(inputFieldIds, endresults){

  let counter = 0
  let score = 0
  let isAllRight = true
  for (const inputFieldId of inputFieldIds){
    let fieldInput = document.getElementById(inputFieldId).value

    let inputBool = false;
    if (fieldInput != ""){
      inputBool = true;
    } 

    let statePairName = inputFieldId.slice(0, 3)

    let isRight = false
    let rightValue = endresults[statePairName]
    if (inputBool == rightValue){
      isRight = true
      score += 1
    } else {
      score -= 1
      isAllRight = false
    }

    
    giveResult(inputFieldId, isRight)
    counter += 1

    let scoreElement = document.getElementById("score")
    scoreElement.style.innerText="Punkte: " + score;
  }
  return [score, isAllRight]
}


// checkt ob das eingegebene Ergebnis 
export function checkMergeInput(mergeField, mergeStatesList){
  let isRight = false;
  let fieldValue = mergeField.value;
  console.log("fieldValue: " + fieldValue)
  let inputNumbers = fieldValue.replace(/[^0-9]/g, ''); 
  console.log("inputNumbers: " + inputNumbers);
  console.log("mergeStatesList: " + mergeStatesList)
  // two lists of numbers
  let inputNumberList = inputNumbers.split("").sort()

  for (let i = 0; i <= mergeStatesList.length-1; i++){
    let rightMergeList = mergeStatesList[i].split("-").sort()

    mergeStatesList[i].split("-").sort()
    rightMergeList.sort()

    console.log("inputNumberList: " + inputNumberList);
    console.log("rightMergeList: " + rightMergeList);

    // check if lists are the same
    if (JSON.stringify(rightMergeList) == JSON.stringify(inputNumberList)){
      isRight = true;
      // this states are already done and get removed
      mergeStatesList.splice(i, 1);
    }
  }
  console.log("mergeStatesList: " + mergeStatesList)
  return [isRight, mergeStatesList]
}


export function rightMergeValues(mergeStatesList){
  let mergeFieldCounter = 1
  let mergeIsRight = true
  let score = 0
  while (mergeFieldCounter <= 5){
    let isRight
    let mergeFieldId = "mergedStates" + mergeFieldCounter
    let mergeField = document.getElementById(mergeFieldId)
    mergeFieldCounter += 1

    // checks if input is right
    if (mergeField.value != "") {
        [isRight, mergeStatesList] = checkMergeInput(mergeField, mergeStatesList)
        console.log("checkMergeInput:" + mergeField + mergeStatesList)

    }
    // no input
    else {
      // if there has to be an inpt
      if (mergeStatesList.length > 0){
        console.log("falsch")
        isRight = false
        mergeStatesList.splice(-1,1)
        console.log(mergeStatesList)
      }
      // no input is right
      else {
        console.log("richtig")
        isRight = true
      }
    }

    if (isRight){
        score += 1;

    } else {
        score -= 1;
        mergeIsRight = false
    }
    giveResult(mergeFieldId, isRight)
  }
  return [score, mergeIsRight]

}


export function showMergingStates(endResults){

  document.getElementById("rightMerging").style.display = "block";
  let mergeStateList = getMergeStates(endResults)
  let counter = 1
  
  for (let mergeState of mergeStateList){
      // create right string
      let mergeStates = mergeState.split("-").sort();
      let newString = ""
      for (let number of mergeStates){
          if (number != ""){
              newString += 'q' + number + '-'
          }
      }
      newString = newString.slice(0, -1)

      // put string in right field
      let mergedStatesText = document.getElementById("mergedStatesText" + counter)
      mergedStatesText.style.display = "inline-block";
      mergedStatesText.innerText = newString;

      counter += 1
  }
}
