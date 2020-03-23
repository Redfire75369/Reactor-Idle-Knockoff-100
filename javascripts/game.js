function E(x) {
	return new ExpantaNum(x);
} 

function getDefault() {
	return {
		money: E(0),
		energy: E(0),
		
		heat: E(0),
		totalWater: E(100),
		water: E(100),
		steam: E(0),
		
		fuel: {
			amount: [E(1)],
			conc: [3],
		},
		
		production: {
			reactor: [E(1)],
			turbine: [E(1)],
			coolingRod: [E(1)]
		},
		
		milestones: {
			11: false,
			12: false,
			13: false,
			14: false
		},
		
		automation: {
			basic: {
				energy: [0, false],
				water: [0, false],
				fuel: [0, false]
			},
			LEU: {
				reactor: [0, false],
				turbine: [0, false],
				coolingRod: [0, false],
			}
		},

		
		options: {
		},
		
		navigation: {
			main: "production",
			production: "LEU"
		}
	};
}

const zero = E(0);
const types = ["LEU"];
var player = getDefault();

function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for(let i = 0; i < sentence.length; i++){
	 sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
   document.write(sentence.join(" "));
   return sentence;
}

function hardReset() {
	player = getDefault();
	player.navigation.main = "options";
}

setInterval(function(){
	updateUIMoney();
	updateUIEnergy();
	updateUISteam();
	updateUIFuel();
	updateUIReactors();
	updateUITurbines();
	updateUICoolingRods();
	updateUIMilestones();
	updateUIAuto();
}, 100)


setInterval(function() {
	checkMilestones();
	simulateSteam(100);
	simulateHeat(100);
	simulateEnergy(100);
	simulateAuto();
}, 100)

setInterval(function() {
	saveGame();
}, 10000)