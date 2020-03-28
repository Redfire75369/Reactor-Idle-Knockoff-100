function getMeltdownGoal() {
	return infinity;
}

function coriumGain() {
	let x = player.energy;
	if (player.energy.gt(getLimit())) {
		x = getLimit();
	}
	let mult = player.milestones[32] ? E(2) : E(1);
	return ExpantaNum.pow(10, x.logBase(2).sub(1024).div(1024));
}
function canMeltdown() {
	return (player.energy.gte(getMeltdownGoal()) && player.milestones[24]);
}

function meltdown() {
	if (canMeltdown()) {
		player.meltdown.corium = player.meltdown.corium.add(coriumGain());
		player.meltdown.amt += 1;
		
		player.energy = getDefault().energy;
		player.heat = getDefault().heat;
		player.eff = getDefault().eff;

		
		player.drain = getDefault().drain;
		player.steam = getDefault().steam;
		
		player.fuel = getDefault().fuel;
		player.production = getDefault().production;
		
		player.automation = player.milestones[31] ? player.automation : getDefault().automation;
	}
}

function updateUIMeltdown() {
	document.getElementById("corium").innerText = notation(player.meltdown.corium);
	document.getElementById("coriumAmt").style.display = (player.meltdown.amt > 0) ? "inline-block" : "none";
	document.getElementById("meltdownbtn").style.display = (player.meltdown.amt > 0) ? "inline-block" : "none";
	document.getElementById("meltdown").style.display = (canMeltdown()) ? "inline-block" : "none";
	document.getElementById("coriumOnMeltdown").innerText = notation(coriumGain());
}
		