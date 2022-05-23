
// html Tabelle mit Id pro Zelle
export function createTableFromAutomat(automat){
    let table = document.getElementById("table")
    table.innerHTML = "";
    let rows = [...automat.zustandsmenge]
    rows.splice(0,1)
    console.log(rows)
    let counter = 0
    let tableColumnIds = []
    for(let row of rows){
        
        let tableRow = document.createElement("tr");
        if (counter < rows.length){
            let zustandsColumn = tableRow.appendChild(document.createElement("th"))
            zustandsColumn.innerText = "q" + JSON.stringify(row)
            for(var i = 0; i <= counter; i++){ 
                let tableColumn = tableRow.appendChild(document.createElement("td"));
                tableColumn.id = (JSON.stringify(row) + "-" + JSON.stringify(i))
                console.log(tableColumn.id)
                tableColumnIds.push(tableColumn.id)
            }
        }
        counter += 1
        table.appendChild(tableRow)
    }
    let lastRow = document.createElement("tr");
    
    let lastLine = automat.zustandsmenge;
    lastLine.pop();
    console.log(lastLine)
    let zeroColumn = lastRow.appendChild(document.createElement("th"))
    for(let row of lastLine){
        let zustandsColumn = lastRow.appendChild(document.createElement("th"))
        zustandsColumn.innerText = "q" + JSON.stringify(row)
    }
    table.appendChild(lastRow)
    return tableColumnIds
}

// Einfügen der ersten Werte in die Tabelle (für jede Zelle false)
export function fillDefaultTable(algorithmLog){ 
    for  (const [key, value] of Object.entries(algorithmLog["defaultValue"])) {
        if (value){
            document.getElementById(key).innerText = "-"
        }
        
    }
}


export function updateTable(algorithmLog, nextUpdates, states, stateIndex){

    console.log("len " + states.length)
    console.log("states " + states)
    console.log("nextUpdates: " + JSON.stringify(nextUpdates))

    let isMarked = false;

    // reset color of previous statepair
    if (stateIndex == 0) {
        
        for (const state of Object.keys(algorithmLog["defaultValue"])){ 
            let thisState = document.getElementById(state);
            thisState.style.background = "white";
            
        }
    }
    else {  
        let lastKey = states[stateIndex-1]
        let lastStatePair = document.getElementById(lastKey);
        lastStatePair.style.background = "white";
    }
    
    // get current state
    console.log("count: ", stateIndex)
    let statePairId = states[stateIndex]
    let currentStatePair = document.getElementById(statePairId);

    // mark state pair
    console.log("current table: ", currentStatePair);
    currentStatePair.style.background = "#ffff66";

    let stateOperation = Object.entries(nextUpdates)

    // update whether statepair is marked or not
    for (const [key, value] of stateOperation){
        if (statePairId === key){
            document.getElementById(statePairId).innerText = "-"
            isMarked = true;
        }
    }
    return isMarked

}


// createTable for gametable with input-fields
export function createTableFromAutomatWithInput(automat){
    document.getElementById("table").innerHTML = "";
    let table = document.getElementById("table")

    let rows = [...automat.zustandsmenge]
    rows.splice(0,1)
    console.log(rows)
    let counter = 0
    let inputFields = []

    for(let row of rows){
        
        let tableRow = document.createElement("tr");
        if (counter < rows.length){
            let zustandsColumn = tableRow.appendChild(document.createElement("th"))
            let currentInput = document.createElement('input')
            zustandsColumn.appendChild(currentInput)
            zustandsColumn.innerText = "q" + JSON.stringify(row)
            for(var i = 0; i <= counter; i++){ 
                let tableColumn = tableRow.appendChild(document.createElement("td"));
                let input = document.createElement('input')
                tableColumn.appendChild(input)
                input.setAttribute("id", JSON.stringify(row) + "-" + JSON.stringify(i) + "-input")
                inputFields.push(input.id)
                console.log(input)
                tableColumn.id = (JSON.stringify(row) + "-" + JSON.stringify(i))
            }
        }
        counter += 1
        table.appendChild(tableRow)
    }
    let lastRow = document.createElement("tr");

    console.log(inputFields)
    
    let lastLine = automat.zustandsmenge;
    lastLine.pop();
    console.log(lastLine)
    let zeroColumn = lastRow.appendChild(document.createElement("th"))
    for(let row of lastLine){
        let zustandsColumn = lastRow.appendChild(document.createElement("th"))
        zustandsColumn.innerText = "q" + JSON.stringify(row)
    }
    table.appendChild(lastRow)
    return inputFields
}


export function disableInputFields(inputFieldIDs){
    // first element not disabled and marked
    document.getElementById(inputFieldIDs[0]).style.background = "#ffff66";

    // all other fields are disabled
    for (let index = 1; index < inputFieldIDs.length; index++) {
        let element = inputFieldIDs[index];
        let currentInput = document.getElementById(element)
        currentInput.disabled = true
        console.log(currentInput)
        
    }
}

export function disableMergeInputs(){
    let counter = 1
    while (counter <= 5){

        document.getElementById("mergedStates" + counter).disabled = true
        counter += 1;
    }
}


export function updateEndResults(algorithmLog){
    let statePairEndValues = algorithmLog["defaultValue"]
    let trueList = []
    
    function updateEndValues(nextUpdates){
        for (const [key, value] of Object.entries(nextUpdates)){
            if (value == true){
                trueList.push(key)
            }
        }
    }
    updateEndValues(algorithmLog["step1Updates"])
    for (const [key, value] of Object.entries(algorithmLog["step2Updates"])){
        updateEndValues(value)
    }

    for (const [key, value] of Object.entries(statePairEndValues)){
        if (trueList.includes(key)){
            statePairEndValues[key] = true;
        }
    }

    return statePairEndValues
}