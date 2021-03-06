const milestones = [11, 12, 13, 14, 21, 22, 23, 24, 31, 32, 33, 34, 41, 42, 43, 44];

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
	player.milestones[11] = player.milestones[11] ? true : player.energy.gte(10);
	player.milestones[12] = player.milestones[12] ? true : player.fuel.amount[0].gte(100);
	player.milestones[13] = player.milestones[13] ? true : player.production.reactor[0].gte(8);
	player.milestones[14] = player.milestones[14] ? true : player.water.gte(1.332e18);
	
	player.milestones[21] = player.milestones[21] ? true : getTurbineMult(0).gte(1e20);
	player.milestones[22] = player.milestones[22] ? true : player.production.coolingRod[0].gte(20);
	player.milestones[23] = player.milestones[23] ? true : player.fuel.amount[0].gte(1e5);
	player.milestones[24] = player.milestones[24] ? true : player.energy.gte(infinity);
	
	let boughtUp = 0;
	for (let i = 0; i < meltdownUpList.length; i++) {
		if (player.meltdown.ups[meltdownUpList[i]]) {
			boughtUp++;
		}
	}
	player.milestones[31] = player.milestones[31] ? true : boughtUp >= 3;
	player.milestones[32] = player.milestones[32] ? true : player.meltdown.corium.gte(16);
	player.milestones[33] = player.milestones[33] ? true : getEff().gte(2.51e92);
	player.milestones[34] = player.milestones[34] ? true : player.moderator >= 1;
	
	player.milestones[41] = player.milestones[41] ? true : player.coolant["NaK"] == 1;
	player.milestones[42] = player.milestones[42] ? true : player.energy.gte("ee5");
	player.milestones[43] = player.milestones[43] ? true : player.drain.gte(100000);
	player.milestones[44] = player.milestones[44] ? true : player.coolant["PbBi"] == 1;
}

function updateUIMilestones() {
	document.getElementById("milestoneMult").innerText = notation(getMilestoneMult());
	
	document.getElementById("mineLEU").style.display = player.milestones[11] ? "inline-block" : "none";
	document.getElementById("autobtn").style.display = player.milestones[12] ? "inline-block" : "none";
	document.getElementById("LEU_crrow").style.display = player.milestones[13] ? "table-row" : "none";
	document.getElementById("waterBasicAuto").style.display = player.milestones[14] ? "table-row" : "none";
	document.getElementById("fuelBasicAuto").style.display = player.milestones[14] ? "table-row" : "none";
	
	document.getElementById("reactorLEUAuto").style.display = player.milestones[21] ? "inline-block" : "none";
	document.getElementById("turbineLEUAuto").style.display = player.milestones[21] ? "inline-block" : "none";
	document.getElementById("coolingRodLEUAuto").style.display = player.milestones[22] ? "inline-block" : "none";
	
	document.getElementById("effBasicAuto").style.display = player.milestones[33] ? "inline-block" : "none";
	document.getElementById("coolantbtn").style.display = player.milestones[34] ? "inline-block" : "none";
	
	document.getElementById("buyLEUReactor").style.display = player.milestones[41] ? "none" : "inline-block";
	document.getElementById("buyMaxLEUReactor").style.display = player.milestones[41] ? "inline-block" : "none";
	document.getElementById("buyLEUTurbine").style.display = player.milestones[41] ? "none" : "inline-block";
	document.getElementById("buyMaxLEUTurbine").style.display = player.milestones[41] ? "inline-block" : "none";
	document.getElementById("buyLEUCoolingRod").style.display = player.milestones[41] ? "none" : "inline-block";
	document.getElementById("buyMaxLEUCoolingRod").style.display = player.milestones[41] ? "inline-block" : "none";
	document.getElementById("buyEff").style.display = player.milestones[41] ? "none" : "inline-block";
	document.getElementById("buyMaxEff").style.display = player.milestones[41] ? "inline-block" : "none";
	document.getElementById("fuelBasicBuyAuto").style.display = player.milestones[42] ? "none" : "inline-block";
	document.getElementById("fuelBasicBuyMaxAuto").style.display = (player.milestones[42] && player.automation.basic.fuel[0] <= 1.69e308) ? "inline-block" : "none";
	document.getElementById("drain").style.display = player.milestones[43] ? "none" : "inline-block";
	document.getElementById("drainMax").style.display = player.milestones[43] ? "inline-block" : "none";
	
	for (let i = 0; i < milestones.length; i++) {
		document.getElementById("milestone" + milestones[i]).className = player.milestones[milestones[i]] ? "milestonecomplete" : "milestonelocked";
	}
}