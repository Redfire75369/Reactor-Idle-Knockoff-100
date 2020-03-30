function E(x) {
	return new ExpantaNum(x);
} 

function getDefault() {
	return {
		energy: E(0),
		moderator: 0,

		heat: E(0),
		drain: E(0),
		water: E(100),
		steam: E(10),
		
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
			24: false,
			31: false,
			32: false,
			33: false,
			34: false,
			41: false,
			42: false,
			43: false,
			44: false
		},

		automation: {
			basic: {
				water: [0, false],
				fuel: [0, false],
				eff : [0, false]
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
				23: false,
				31: false,
				32: false,
				33: false
			}
		},

		coolantActive: "none",
		coolant: {
			NaK: 0,
			Na: 0,
			FLiNaK: 0,
			FLiBe: 0,
			Pb: 0,
			PbBi: 0
		},

		options: {
			theme: "Light",
			themeNo: 0
		},

		navigation: {
			main: "production",
			production: "LEU",
			meltdown: "meltdownUps"
		},

		time: 0,
		lastUpdate: Date.now()
	};
}

const zero = E(0);
const infinity = ExpantaNum.pow(2, 1024);
const types = ["LEU"];
var player = getDefault();

var focused = true;
window.onfocus = function() {
  focused=true;  
}
window.onblur = function() {
  focused=false;  
}  

function hardReset() {
	player = getDefault();
	player.navigation.main = "options";
	targetedThemeChange("Light");
}

function getLimit() {
	switch (player.moderator) {
		case 0:
			return infinity;
		case 1:
			return E("e1.79e308");
		case 2:
			return E("eee1.79e308");
		case 3:
			return E(Infinity);
		default:
			return E(0);
	}
}

function updateGame(tick) {
	checkMilestones();
	simulateHeat(tick);
	simulateEnergy(tick);
	simulateAuto();
	player.time += tick;
}
function updateUI() {
	updateUIEnergy();
	updateUISteam();
	updateUIFuel();
	updateUIProduction();
	updateUIMilestones();
	updateUIAuto();
	updateUIEff();
	updateUIMeltdown();
	updateUIMeltdownUps();
	updateUIModerator();
	updateUICoolant();
}

setInterval(function(){
	updateUI();
}, 100)
setInterval(function() {
	if (Date.now() > player.lastUpdate && focused) {
		simulateTime((Date.now() - player.lastUpdate) / 1000);
	}
	player.lastUpdate = Date.now();
}, 50)
setInterval(function() {
	saveGame();
}, 10000)