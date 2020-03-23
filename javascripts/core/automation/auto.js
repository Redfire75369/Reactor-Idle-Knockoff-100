const allAuto = ["energy", "rtLEU", "turLEU", "crLEU"];
function buyAuto(type) {
	switch (type) {
		case "energy":
			if (player.money.gte(1e8) && player.automation.energy != 1) { 
				player.automation.energy = 1;
			}
		case "rtLEU":
			if (player.money.gte(1e15) && player.automation.LEUrt != 1) { 
				player.automation.LEUrt = 1;
			}
		case "turLEU":
			if (player.money.gte(1e20) && player.automation.LEUtur != 1) { 
				player.automation.LEUtur = 1;
			}
		case "crLEU":
			if (player.money.gte(1e40) && player.automation.LEUcr != 1) { 
				player.automation.LEUcr = 1;
			}
		default:
	}
}

function toggleAuto(type) {
	if (player.automation[type] == 1) {
		player.enabledAuto[type] = !player.enabledAuto[type];
	}
}
	
function simulateAuto() {
	if (player.automation.energy == 1 && player.enabledAuto.energy) {
		sellEnergy();
	}
	if (player.automation.LEUrt == 1 && player.enabledAuto.LEUrt) {
		buyReactor("LEU");
	}
	if (player.automation.LEUtur == 1 && player.enabledAuto.LEUtur) {
		buyTurbine("LEU");
	}
	if (player.automation.LEUcr == 1 && player.enabledAuto.LEUcr) {
		buyCoolingRod("LEU");
	}
}

function updateUIAuto() {
	document.getElementById("energyJ").style.display = player.enabledAuto.energy ? "none" : "inline-block";
	document.getElementById("sellEnergy").style.display = player.enabledAuto.energy ? "none" : "inline-block";
	
	for (let i = 0; i < allAuto.length; i++) {
		document.getElementById(allAuto[i] + "BuyAuto").style.display = player.automation[allAuto[i]] != 1 ? "inline-block" : "none";
		document.getElementById(allAuto[i] + "BuyAuto").style.display = player.enabledAuto[allAuto[i]] ? "smol green" : "smol red";
		let x = /*String.proper*/(allAuto[i]);
		if (x.includes("rt")) {
			if (x.includes("LEU")) {
				x = "LEU-235 Reactor";
			}
		} else if (x.includes("tur")) {
			if (x.includes("LEU")) {
				x = "LEU-235 Turbine";
			}
		} else if (x.includes("")) {
			if (x.includes("LEU")) {
				x = "LEU-235 Cooling Rod";
			}
		}

		document.getElementById(allAuto[i] + "BuyAuto").innerText = player.enabledAuto[allAuto[i]] ? x + "Autobuyer: ON" : x + "Autobuyer: OFF"; 
	}
}