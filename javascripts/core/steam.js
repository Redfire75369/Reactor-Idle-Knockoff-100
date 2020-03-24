function condenseSteam() {
	let x = generateEnergy().div(player.production.turbine[0]).div(ExpantaNum.pow(1.05, player.production.coolingRod[0].mul(getCoolingRodMult(0))));
	return player.steam.gt(x) ? x : player.steam;
}
function generateSteam() {
	return (player.water.gt(player.heat)) ? player.heat : player.water;
}

function getDrainCost() {
	return E(1).mul(player.totalWater);
}

function drainOcean() {
	if (canBuy(getDrainCost())) {
		buy(getDrainCost());
		player.totalWater = player.totalWater.mul(10);
		player.water = player.totalWater.sub(player.steam);
	}
}

function simulateSteam(tick = 50) {
	player.steam = player.steam.add(generateSteam().mul(tick / 1000));
	player.steam = player.steam.sub(condenseSteam().mul(tick / 1000));
	player.water = player.water.add(condenseSteam().mul(tick / 1000));
	player.water = player.water.sub(generateSteam().mul(tick / 1000));
}
function updateUISteam() {
	document.getElementById("water").innerText = f(player.water);
	document.getElementById("steam").innerText = f(player.steam);
	document.getElementById("drainCost").innerText = formatCost(f(getDrainCost()));
}