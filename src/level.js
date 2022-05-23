
//import { json } from '../../node_modules/express';
import automatDict from './dfas.json' assert { type: "json"};
import Automat from './automat.js';


export default class Level {
    constructor(score, time, levelNum){
        this.levelNum = levelNum;
        this.score = score;
        this.time = time;
        this.image = document.getElementById("image")
        this.question = this.getRandomQuestion()
        this.automatDict = automatDict;
        this.lastLevel = 8;
    }

    getRandomQuestion(){
        let levelNum = this.levelNum;
        let lastLevel = this.lastLevel;
        console.log(automatDict)
        let jsonQuestions = Object.values(automatDict[JSON.stringify(levelNum)])

        let randQuestion = jsonQuestions[parseInt(Math.random() * jsonQuestions.length)]
        console.log(randQuestion)
        return randQuestion
    }

    convertStringlistToList(stringList){

        let list = []
        stringList = stringList.replace('[', '')
        stringList = stringList.replace(']', '')
        let splitList = stringList.split(', ')
        splitList.forEach(element => {
            if (!(isNaN(element))) {
                element = parseInt(element)
            }
            list.push(element)
        });
        return list
    }


    formatTransitions(überführungen, zustandsmenge){
        let formatedDict = {}
        zustandsmenge.forEach(zustand => {
            formatedDict[zustand] = {}
        });
        console.log("test:" + JSON.stringify(formatedDict))
        überführungen.forEach(überführung => {
            let from = überführung["from"]
            let to = überführung["to"]
            let character = überführung["character"]

            formatedDict[from][character] = to
        }); 
        return formatedDict
    }


    getRandomAutomat(){
        // get random state id
        let question = this.question

        // get data
        let startzustand = question["initial state"]
        let eingabealphabet = question["alphabet"]
        let überführung = question["transitions"]
        console.log("überführung1: " + JSON.stringify(überführung))
        let zustandsmenge = question["states"]
        let endzustände = question["final states"]

        // format data
        eingabealphabet = this.convertStringlistToList(eingabealphabet)
        zustandsmenge = this.convertStringlistToList(zustandsmenge)
        überführung = this.formatTransitions(überführung, zustandsmenge)
        endzustände = this.convertStringlistToList(endzustände)

        //debug
        console.log("überführung: " + JSON.stringify(überführung))
        console.log("startzustand: " + JSON.stringify(startzustand))
        console.log("eingabealphabet: " + JSON.stringify(eingabealphabet))
        console.log("zustandsmenge: " + JSON.stringify(zustandsmenge))
        console.log("endzustände: " + JSON.stringify(endzustände))

        let automat = new Automat(
            zustandsmenge,
            eingabealphabet,
            überführung,
            startzustand,
            endzustände
        );

        return automat
    }

    drawImageActualSize(ctx) {
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        ctx.drawImage(this, 0, 0);
        ctx.drawImage(this, 0, 0, this.width, this.height);
    }

    draw(isMin) {
        let pngName
        let question = this.question
        if (isMin){
            pngName = question["id"] + "-min" + ".png"
        } else {
            pngName = question["id"] + ".png"
            document.getElementById("image").innerHTML = ""; 
        }
        var img = document.createElement("img");
        img.src = '../../newAssets/' + pngName;;
        img.setAttribute("style", "margin-top: 80px;");

        let div = document.getElementById("image")
        div.appendChild(img);
        div.setAttribute("style", "text-align:center");
    }

    isLastLevel() {
        let isLast = false
        if (this.levelNum >= this.lastLevel){
            document.getElementById("thisModus").style.display="none";
            document.getElementById("afterLastLevel").style.display="block";
            console.log("isLastLevel")
            isLast = true
        }
        return isLast
    }
}