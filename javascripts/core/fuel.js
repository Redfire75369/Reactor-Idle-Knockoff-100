function mineFuel(type, amount) {
	if (player.energy.gt(E(10).mul(amount))) {
		player.energy = player.energy.sub(E(10).mul(amount));
		player.fuel.amount[type] = player.fuel.amount[type].add(amount);
	}
}

function simulateFuel(tick = 50) {
	
}
function updateUIFuel() {
	for (let i = 0; i < types.length; i++) {
		document.getElementById(types[i] + "_fuel").innerText = notation(player.fuel.amount[i]);
		document.getElementById(types[i] + '_conc').innerText = player.fuel.conc[i];
	}
}