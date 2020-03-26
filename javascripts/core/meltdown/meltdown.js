function getMeltdownGoal() {
	return infinity;
}

function coriumGain() {
	return ExpantaNum.pow(100, player.energy.logBase(2).sub(1024).div(1024));
}
function canMeltdown() {
	return (player.energy.gte(getMeltdownGoal()) && player.milestones[24]);
}

function meltdown() {
	if (canMeltdown()) {
		player.meltdown.corium = player.meltdown.corium.add(coriumGain());
		player.meltdown.amt += 1;
		player.energy = getDefault().energy;
		player.totalWater = getDefault().totalWater;
		player.steam = getDefault().steam;
		player.heat = getDefault().heat;
		player.fuel = getDefault().fuel;
		player.production = getDefault().production;
		player.automation = getDefault().automation;
	}
}

function updateUIMeltdown() {
	document.getElementById("corium").innerText = notation(player.meltdown.corium);
	document.getElementById("coriumAmt").style.display = (player.meltdown.amt > 0) ? "inline-block" : "none";
	document.getElementById("meltdownbtn").style.display = (player.meltdown.amt > 0) ? "inline-block" : "none";
	document.getElementById("meltdown").style.display = (canMeltdown()) ? "inline-block" : "none";
	document.getElementById("coriumOnMeltdown").innerText = notation(coriumGain());
}
		