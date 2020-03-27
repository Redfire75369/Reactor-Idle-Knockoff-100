const basicAuto = ["water", "fuel", "eff"];
const LEUAuto = ["reactor", "turbine", "coolingRod"];
const autoCost = {
	basic: {
		water: E(1e8),
		fuel: E(1e8),
		eff: E("1e600")
	},
	LEU: {
		reactor: E(1e25),
		turbine: E(1e30),
		coolingRod: E(1e50)
	}
};

function buyAuto(type, cat) {
	if (player.energy.gte(autoCost[cat][type])) {
		if (type == "fuel" && player.energy.gte(ExpantaNum.pow(10, 8 + 2 * player.automation.basic.fuel[0]))) {
			player.energy = player.energy.sub(ExpantaNum.pow(10, 8 + 2 * player.automation.basic.fuel[0]));
			player.automation[cat][type][0]+= 1;
		} else if (player.automation[cat][type][0] == 0){
			player.energy = player.energy.sub(autoCost[cat][type]);
			player.automation[cat][type][0] = 1;
		}
	}
}

function toggleAuto(type, cat) {
	if (player.automation[cat][type][0] >= 1) {
		player.automation[cat][type][1] = !player.automation[cat][type][1];
	}
}

function simulateAuto() {
	if (player.automation.basic.water[1]) {
		drainOcean();
	}
	if (player.automation.basic.fuel[1]) {
		mineFuel(0, player.automation.basic.fuel[0]);
	}
	if (player.automation.LEU.reactor[1]) {
		buyReactor(0);
	}
	if (player.automation.LEU.turbine[1]) {
		buyTurbine(0);
	}
	if (player.automation.LEU.coolingRod[1]) {
		buyCoolingRod(0);
	}
}

function updateUIAuto() {
	document.getElementById("fuelBasicAutoCost").innerText = notation(ExpantaNum.pow(10, 8 + 2 * player.automation.basic.fuel[0]));
	
	for (let i = 0; i < basicAuto.length; i++) {
		if (!(basicAuto[i].includes("fuel"))) {
			document.getElementById(basicAuto[i] + "BasicBuyAuto").style.display = player.automation.basic[basicAuto[i]][0] != 1 ? "inline-block" : "none";
		}
		if (document.getElementById(basicAuto[i] + "BasicToggleAuto").style.display != "none") {
			document.getElementById(basicAuto[i] + "BasicToggleAuto").className = player.automation.basic[basicAuto[i]][1] ? "smol green" : "smol red";
		}
	}
	for (let i = 0; i < LEUAuto.length; i++) {
		document.getElementById(LEUAuto[i] + "LEUBuyAuto").style.display = player.automation.LEU[LEUAuto[i]][0] != 1 ? "inline-block" : "none";
		if (document.getElementById(LEUAuto[i] + "LEUToggleAuto").style.display != "none") {
			document.getElementById(LEUAuto[i] + "LEUToggleAuto").className = player.automation.LEU[LEUAuto[i]][1] ? "smol green" : "smol red";
		}
	}
	document.getElementById("waterBasicToggleAuto").innerText = player.automation.basic["water"][1] ? "Water Autodrainer: ON" : "Water Autodrainer: OFF";
	document.getElementById("fuelBasicToggleAuto").innerText = player.automation.basic["fuel"][1] ? "Fuel Autominer: ON" : "Fuel Autominer: OFF";
	document.getElementById("effBasicToggleAuto").innerText = player.automation.basic["eff"][1] ? "Efficiency Autobuyer: ON" : "Efficiency Autobuyer: OFF";
	document.getElementById("reactorLEUToggleAuto").innerText  = player.automation.LEU["reactor"][1] ? "LEU-235 Reactor Autobuyer: ON" : "LEU-235 Reactor Autobuyer: OFF";
	document.getElementById("turbineLEUToggleAuto").innerText  = player.automation.LEU["turbine"][1] ? "LEU-235 Turbine Autobuyer: ON" : "LEU-235 Turbine Autobuyer: OFF";
	document.getElementById("coolingRodLEUToggleAuto").innerText  = player.automation.LEU["coolingRod"][1] ? "LEU-235 Cooling Rod Autobuyer: ON" : "LEU-235 Cooling Rod Autobuyer: OFF";
}