function condenseSteam() {
	let x = generateEnergy().div(player.production.turbine[0]).div(E(1.05).pow(player.production.coolingRod[0]));
	return player.steam.gt(x) ? x : player.steam;
}
function generateSteam() {
	return (player.water.gt(player.heat)) ? player.heat : player.water;
}

function getDrainCost() {
	let r = player.meltdown.ups[21] ? E(5) : E(10);
	return E(100).mul(r.pow(player.drain));
}
function canBuyDrain() {
	return player.energy.gte(getDrainCost());
}

function drainOcean() {
	if (canBuyDrain()) {
		player.energy = player.energy.sub(getDrainCost());
		player.drain = player.drain.add(1);
	}
}
function drainMaxOcean() {
	if (canBuyDrain()) {
		let r = player.meltdown.ups[21] ? E(5) : E(10);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 100, r, player.drain);
		player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 100, r, player.drain));
		player.drain = player.drain.add(x);
	}
}

function simulateSteam(tick = 50) {
	player.steam = player.steam.add(generateSteam().mul(tick / 1000));
	player.steam = player.steam.sub(condenseSteam().mul(tick / 1000));
	player.water = E(10).pow(player.drain.add(2)).sub(player.steam);
}
function updateUISteam() {
	document.getElementById("water").innerText = notation(player.water);
	document.getElementById("steam").innerText = notation(player.steam);
	document.getElementById("drainCost").innerText = notation(getDrainCost());
}