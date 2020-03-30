function generateEnergy() {
	let d = player.coolantActive == "FLiNaK" ? player.meltdown.corium.add(1).logBase(10).add(1).pow(10) : E(1);
	let x = player.production.turbine[0].mul(getTurbineMult(0)).mul(E(1.05).pow(player.production.coolingRod[0].mul(getCoolingRodMult(0))).mul(getEff()));
	if (player.coolantActive == "PbBi") {
		x = x.tetr(4);
	}
	return (x.gt(player.steam)) ? player.steam.mul(d) : x.mul(d);
}

function simulateEnergy(tick = 50) {
	let r = player.meltdown.ups[33] ? player.production.coolingRod[0].mul(getCoolingRodMult(0)).add(10).logBase(10) : player.meltdown.ups[32] ? E(1e10) : E(10);
	//console.log(player.steam.toString());
	player.steam = player.steam.add(generateSteam().mul(tick / 1000));
	//console.log(player.steam.toString());
	player.energy = player.energy.add(generateEnergy().mul(tick/1000));
	//console.log(player.steam.toString());
	player.steam = player.steam.sub(condenseSteam().mul(tick / 1000));
	//console.log(player.steam.toString());
	if (player.coolantActive == "PbBi") {
		player.water = E(100).mul(r.add(1).mul(player.drain.tetr(player.production.coolingRod[0].slog()))).sub(player.steam);
	} else if (player.meltdown.ups[33]) {
		player.water = E(100).mul(r.pow(player.drain.mul(20))).mul(player.drain.tetr(3)).sub(player.steam);
	} else {
		player.water = E(100).mul(r.pow(player.drain)).sub(player.steam);
	}
}

function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy, true);
}