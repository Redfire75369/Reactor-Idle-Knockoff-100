function generateEnergy() {
	let x = player.production.turbine[0].mul(getTurbineMult(0)).mul(ExpantaNum.pow(1.05, player.production.coolingRod[0].mul(getCoolingRodMult(0))));
	return (x.gt(player.steam)) ? player.steam : x;
}

function simulateEnergy(tick = 50) {
	player.energy = player.energy.add(generateEnergy().mul(tick/1000));
}
function updateUIEnergy() {
	document.getElementById("energy").innerText = f(player.energy);
}