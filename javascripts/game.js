function E(x) {
	return new ExpantaNum(x);
} 

function getDefault() {
	return {
		energy: E(0),

		heat: E(0),
		drain: E(0),
		water: E(100),
		steam: E(0),
		
		eff: E(1),

		fuel: {
			amount: [E(1)],
			conc: [1],
		},

		production: {
			reactor: [E(1)],
			turbine: [E(1)],
			coolingRod: [E(1)],
			centrifuge: [E(1)]
		},

		milestones: {
			11: false,
			12: false,
			13: false,
			14: false,
			21: false,
			22: false,
			23: false,
			24: false
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

		meltdown: {
			corium: E(0),
			amt: 0,

			ups : {
				11: false,
				12: false,
				13: false,
				21: false,
				22: false,
				23: false
			}
		},

		options: {
		},

		navigation: {
			main: "production",
			production: "LEU"
		},

		time: 0
	};
}

const zero = E(0);
const infinity = ExpantaNum.pow(2, 1024);
const types = ["LEU"];
var player = getDefault();

function hardReset() {
	player = getDefault();
	player.navigation.main = "options";
}

setInterval(function(){
	updateUIEnergy();
	updateUISteam();
	updateUIFuel();
	updateUIProduction();
	updateUIMilestones();
	updateUIAuto();
	updateUIEff();
	updateUIMeltdown();
	updateUIMeltdownUps();
}, 100)


setInterval(function() {
	checkMilestones();
	simulateSteam(50);
	simulateHeat(50);
	simulateEnergy(50);
	simulateAuto();
	player.time += 50;
}, 50)

setInterval(function() {
	saveGame();
}, 10000)