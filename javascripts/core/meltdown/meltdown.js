function getMeltdownGoal() {
	return infinity;
}

function coriumGain() {
	return ExpantaNum.pow(100, player.energy.log2().sub(1024).div(1024));
}
function canMeltdown() {
	return player.energy.gte(getMeltdownGoal()) && player.milestones[24];
}

function meltdown() {
	if (canMeltdown()) {
		player.money = getDefault().money;
		player.energy = getDefault().energy;
		player.water = getDefault().water;
		player.totalWater = getDefault().totalWater;
		player.steam = getDefault().steam;
		player.heat = getDefault().heat;
		player.fuel = getDefault().fuel;
		player.production = getDefault().production;
		player.meltdown.corium = player.meltdown.corium.add(coriumGain());
		player.meltdown.amt += 1;
	}
}

function updateUIMeltdown() {
	document.getElementById("corium").innerText = f(player.meltdown.corium);
	document.getElementById("coriumAmt").style.display = (player.meltdown.amt.gt(0)) ? "inline-block" : "none";
	document.getElementById("meltdown").style.display = (canMeltdown()) ? "inline-block" : "none";
	document.getElementById("coriumOnMeltdown").innerText = f(coriumGain());
}
		