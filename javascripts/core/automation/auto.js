const basicAuto = ["energy", "water", "fuel"];
const LEUAuto = ["reactor", "turbine", "coolingRod"];

function buyBasicAuto(type) {
	switch (type) {
		case "energy":
			if (player.energy.gte(1e8) && player.automation.basic.energy[0] != 1) { 
				player.automation.basic.energy[0] = 1;
			}
		case "water":
			if (player.energy.gte(1e8) && player.automation.basic.water[0] != 1) { 
				player.automation.basic.water[0] = 1;
			}
		case "fuel":
			if (player.energy.gte(ExpantaNum.pow(10, 8 + 2 * player.automation.basic.fuel[0]))) { 
				player.automation.basic.fuel[0] += 1;
			}
		
	}
}
function buyLEUAuto(type) {
	switch (type) {
		case "reactor":
			if (player.energy.gte(1e25) && player.automation.LEU.reactor[0] != 1) { 
				player.automation.LEU.reactor[0] = 1;
			}
		case "turbine":
			if (player.energy.gte(1e30) && player.automation.LEU.turbine[0] != 1) { 
				player.automation.LEU.turbine[0] = 1;
			}
		case "coolingRod":
			if (player.energy.gte(1e50) && player.automation.LEU.coolingRod[0] != 1) { 
				player.automation.LEU.coolingRod[0] = 1;
			}
	}
}

function toggleBasicAuto(type) {
	if (player.automation.basic[type][0] >= 1) {
		player.automation.basic[type][1] = !player.automation.basic[type][1];
	}
}

function toggleLEUAuto(type) {
	if (player.automation.LEU[type][0] >= 1) {
		player.automation.LEU[type][1] = !player.automation.LEU[type][1];
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
	document.getElementById("energyBasicToggleAuto").innerText = player.automation.basic["energy"][1] ? "Energy Autoseller: ON" : "Energy Autoseller: OFF";
	document.getElementById("waterBasicToggleAuto").innerText = player.automation.basic["water"][1] ? "Water Autodrainer: ON" : "Water Autodrainer: OFF";
	document.getElementById("fuelBasicToggleAuto").innerText = player.automation.basic["fuel"][1] ? "Fuel Autominer: ON" : "Fuel Autominer: OFF";
	document.getElementById("reactorLEUToggleAuto").innerText  = player.automation.LEU["reactor"][1] ? "LEU-235 Reactor Autobuyer: ON" : "LEU-235 Reactor Autobuyer: OFF";
	document.getElementById("turbineLEUToggleAuto").innerText  = player.automation.LEU["turbine"][1] ? "LEU-235 Turbine Autobuyer: ON" : "LEU-235 Turbine Autobuyer: OFF";
	document.getElementById("coolingRodLEUToggleAuto").innerText  = player.automation.LEU["coolingRod"][1] ? "LEU-235 Cooling Rod Autobuyer: ON" : "LEU-235 Cooling Rod Autobuyer: OFF";
}