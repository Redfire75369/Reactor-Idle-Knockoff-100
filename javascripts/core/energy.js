function generateEnergy() {
	let x = player.turbine.LEU.mul(getTurbineMult("LEU")).mul(ExpantaNum.pow(1.05, player.coolingRod.LEU.mul(getCoolingRodMult("LEU"))));
	return (x.gt(player.steam)) ? player.steam : x;
}

function simulateEnergy(tick = 50) {
	player.energy = player.energy.add(generateEnergy().mul(tick/1000));
}
function updateUIEnergy() {
	document.getElementById("energy").innerText = f(player.energy);
}