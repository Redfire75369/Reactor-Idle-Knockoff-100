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
		
		reactor: {
			LEU: E(1)
		},
		coolingRod: {
			LEU: E(1)
		},
		turbine: {
			LEU: E(1),
		},
		fuel: {
			LEU: E(1)
		},
		fuelConc: {
			LEU: 3
		},
		
		milestones: {
			11: false,
			12: false,
			13: false,
			14: false
		},
		
		autotierone: {
			energy: 0
		},
		
		options: {
			notation: "HyperE",
			notationNo: 0
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


function hardReset() {
	player = getDefault();
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
}, 15000)