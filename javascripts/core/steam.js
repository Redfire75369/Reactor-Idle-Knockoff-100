function condenseSteam() {
	let d = player.coolantActive == "FLiNaK" ? player.meltdown.corium.add(1).logBase(10).add(1).pow(10) : E(1);
	let x = getTurbineMult(0).mul(E(1.05).pow(getCoolingRodMult(0))).div(d);
	return player.steam.gt(x) ? x : player.steam;
}
function generateSteam() {
	return (player.water.gt(player.heat)) ? player.heat : player.water;
}

function getDrainCost() {
	let r = player.meltdown.ups[31] ? E(2) : player.meltdown.ups[21] ? E(5) : E(10);
	return E(100).mul(r.pow(player.drain));
}
function canBuyDrain() {
	return player.energy.gte(getDrainCost());
}

function drainOcean() {
	if (canBuyDrain()) {
		if (getDrainCost().lt("(10^)^4 308")){
			player.energy = player.energy.sub(getDrainCost());
		}
		player.drain = player.drain.add(1);
	}
}
function drainMaxOcean() {
	if (canBuyDrain()) {
		let r = player.meltdown.ups[31] ? E(2) : player.meltdown.ups[21] ? E(5) : E(10);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 100, r, player.drain);
		if (getDrainCost().lt("(10^)^4 308")){
			player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 100, r, player.drain));
		}
		player.drain = player.drain.add(x);
	}
}

function updateUISteam() {
	document.getElementById("water").innerText = notation(player.water);
	document.getElementById("steam").innerText = notation(player.steam);
	document.getElementById("drainCost").innerText = notation(getDrainCost());
}