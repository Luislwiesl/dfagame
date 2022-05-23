export function afterLastGoOn(level){
  console.log("level end")
  nextExampleButton.style.display = "block";
  level.draw(true)
}



export function getMergeStates(endResults){
  let mergeStatesListFirst = []
  let mergeStatesList = []
  let alreadyDoneList = []
  for (const [key, value] of Object.entries(endResults)){
    if (value == false){
        mergeStatesListFirst.push(key);
    }
  }


  for (let i = 0; i < mergeStatesListFirst.length; i++){

    if (!(alreadyDoneList.includes(mergeStatesListFirst[i]))){
      let similarList = []
      similarList.push(mergeStatesListFirst[i].substring(0, 1))
      similarList.push(mergeStatesListFirst[i].substring(2, 3))


      for (let j = i + 1; j < mergeStatesListFirst.length; j++){
        console.log("i: " + i)
        console.log("j: " + j)
        console.log("mergeStatesListFirst: " + mergeStatesListFirst)

        if(!(alreadyDoneList.includes(mergeStatesListFirst[j]))){

          if(similarList.includes(mergeStatesListFirst[j].substring(0, 1))){
            alreadyDoneList.push(mergeStatesListFirst[j])
            if (!(similarList.includes(mergeStatesListFirst[j].substring(2, 3)))){
              similarList.push(mergeStatesListFirst[j].substring(2, 3))
            }
          }
          if(similarList.includes(mergeStatesListFirst[j].substring(2, 3))){
            alreadyDoneList.push(mergeStatesListFirst[j])
            if (!(similarList.includes(mergeStatesListFirst[j].substring(0, 1)))){
              similarList.push(mergeStatesListFirst[j].substring(0, 1))
            }
          }
        }
      }
    
      let newString = ""
      for (let element of similarList){
        newString += element + "-"
      }
      newString = newString.slice(0, - 1)
      mergeStatesList.push(newString)

      console.log("similarList: " + similarList)

    }
  }
  console.log("mergeStatesList: " + mergeStatesList)
  return mergeStatesList
}

export function mergedStatesTextNone(){
  document.getElementById("rightMerging").style.display = "none";
  for( let i = 1; i <=5; i++){
    document.getElementById("mergedStatesText" + i).style.display = "none";
  }
}