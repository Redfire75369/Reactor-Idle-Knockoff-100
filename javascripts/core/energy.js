function generateEnergy() {
	let x = player.production.turbine[0].mul(getTurbineMult(0)).mul(E(1.05).pow(player.production.coolingRod[0].mul(getCoolingRodMult(0))).mul(getEff()));
	return (x.gt(player.steam)) ? player.steam : x;
}

function simulateEnergy(tick = 50) {
	player.energy = player.energy.add(generateEnergy().mul(tick/1000));
}
function updateUIEnergy() {
	document.getElementById("energy").innerText = notation(player.energy);
}