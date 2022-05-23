// Soll 5 Tupel sein
/* die endliche Menge von Zuständen
das Eingabealphabet
eine Überführungsfunktion, die für jeden Zustand mit jeder Eingabe einen Folgezustand definiert
die Menge der Startzustände
die Menge der Endzustände
*/


export default class Automat {

    constructor(zustandsmenge, eingabealphabet, überführung, startzustand, endzustände) {
            this.zustandsmenge = zustandsmenge
            this.eingabealphabet = eingabealphabet
            this.überführung = überführung
            this.startzustand = startzustand
            this.endzustände = endzustände

            
    }

    minimizeAutomat() {
        // Tabelle als multidimensionales Array
        // Erstellen der Tabelle: 
        let tabelle = new Array(this.zustandsmenge.length)

        let updateDictionary = {}
        let create = {}
        updateDictionary["defaultValue"] = create
        // create enthält alle Zustnadspaare denen jeweils false zugewiesen wird
        // false heißt: Sie sind (noch) nicht als ungleich identifiziert
        for (var i = 0; i < tabelle.length; i++) {
            tabelle[i] = new Array(this.zustandsmenge.length);
            for (var j = i+1; j < tabelle.length; j++){
              tabelle[i][j] = false
              create[j + "-" + i] = false
            }
        }
        console.log('tabelle: ' + tabelle)

        const accepting = this.endzustände
      
        const alphabet = this.eingabealphabet

        let stateTransitions = this.überführung
    
        const allStates = Object.keys(this.zustandsmenge);
        const nonAccepting = new Set();
      
        // alle Paare Endzustand + nichtEndzustand werden true gesetzt -> sie sind ungleich
        allStates.forEach(state => {
          var isAccepting = false
          this.endzustände.forEach(st => {
              if (state == st){
                isAccepting = true
              } 
          })
          if (!(isAccepting)){
              nonAccepting.add(state)
          }

        });
        console.log(nonAccepting)

        // Step 1: Markieren der Zustandspaare, bei denen der eine ein Endzustand ist, der andere nicht

        let step1Updates = {}
        updateDictionary["step1Updates"] = step1Updates
        nonAccepting.forEach(state => {
            this.endzustände.forEach(st => {
                tabelle[state][st] = true
                tabelle[st][state] = true
                step1Updates[state + "-" + st] = true
                step1Updates[st + "-" + state] = true
            })
        })
        
        // Step 2: Für jedes unmarkierte Paar (false) teste ob die Überführungsfunktionen in die gleichen Zustände führen
        // Beispielautomat: ([0, 1, 2], ['a', 'b'], {0: {'a': 1, 'b': 1}, 1: {'a': 2, 'b': 2}, 2: {'a': 2, 'b': 2}}, 0, [2])
        console.log("tabelle: " + JSON.stringify(tabelle))
        console.log("Zustandsübergänge: " + JSON.stringify(stateTransitions))
        console.log("AllStates: " + JSON.stringify(allStates))
        console.log("alphabet: " + alphabet)

        let step2Updates = {}
        updateDictionary["step2Updates"] = step2Updates

        function step2Update(){
          let updates = {}
          allStates.forEach(state => {
            allStates.forEach(st =>{
              if (tabelle[state][st] == false){
                console.log(state, st, false)
                alphabet.forEach(letter => {
                  let stateTransition = stateTransitions[state][letter]
                  let stTransition = stateTransitions[st][letter]
                  if (tabelle[stateTransition][stTransition] == true){
                    tabelle[state][st] = true
                    tabelle[st][state] = true
                    updates[st + "-" + state] = true
                    updates[state + "-" + st] = true
                  }

                })
              }
            })
          })
          return updates
        }
        
        let changes = true
        let counter = 0
        while (changes == true){
          let updates = step2Update()
          step2Updates[counter] = updates

          if (Object.keys(updates).length === 0){
            changes = false
          }
          counter += 1;
        }

        
      console.log(tabelle)
      console.log("updateDictionary: " + JSON.stringify(updateDictionary))
      return updateDictionary
    }

}
