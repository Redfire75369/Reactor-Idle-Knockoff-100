const milestones = [11, 12, 13, 14, 21, 22, 23, 24];

function getMilestoneMult() {
	let ret = E(1);
	let x = player.milestones[23] ? 100 : 2;
	for (let i = 0; i < milestones.length; i++) {
		if (player.milestones[milestones[i]]) {
			ret = ret.mul(x);
		}
	}
	return ret;
}

function checkMilestones() {
	player.milestones[11] = player.milestones[11] ? true : player.money.gte(10);
	player.milestones[12] = player.milestones[12] ? true : player.fuel.amount[0].gte(100);
	player.milestones[13] = player.milestones[13] ? true : player.production.reactor[0].gte(8);
	player.milestones[14] = player.milestones[14] ? true : player.water.gte(1.332e18);
	player.milestones[21] = player.milestones[21] ? true : getTurbineMult(0).gte(1e20);
	player.milestones[22] = player.milestones[22] ? true : player.production.coolingRod[0].gte(20);
	player.milestones[23] = player.milestones[23] ? true : player.fuel.amount[0].gte(1e5);
	player.milestones[24] = player.milestones[24] ? true : player.money.gte(infinity);
}

function updateUIMilestones() {
	document.getElementById("milestoneMult").innerText = f(getMilestoneMult());
	document.getElementById("mineLEU").style.display = player.milestones[11] ? "inline-block" : "none";
	document.getElementById("autobtn").style.display = player.milestones[12] ? "inline-block" : "none";
	document.getElementById("LEU_crrow").style.display= player.milestones[13] ? "table-row" : "none";
	document.getElementById("waterBasicAuto").style.display= player.milestones[14] ? "table-row" : "none";
	document.getElementById("fuelBasicAuto").style.display= player.milestones[14] ? "table-row" : "none";
	document.getElementById("reactorLEUAuto").style.display= player.milestones[21] ? "inline-block" : "none";
	document.getElementById("turbineLEUAuto").style.display= player.milestones[21] ? "inline-block" : "none";
	document.getElementById("coolingRodLEUAuto").style.display= player.milestones[22] ? "inline-block" : "none";
	document.getElementById("money$").style.display= player.milestones[23] ? "none" : "inline-block";
	document.getElementById("energyBasicToggleAuto").style.display= player.milestones[23] ? "none" : "inline-block";
	player.automation.basic.energy[1] = player.milestones[23] ? false : player.automation.basic.energy[1];
	document.getElementById("meltdown").style.display= player.milestones[24]  ? "inline-block" : "none";
	
	for (let i = 0; i < milestones.length; i++) {
		document.getElementById("milestone" + milestones[i]).className = player.milestones[milestones[i]] ? "milestonecomplete" : "milestonelocked";
	}
}