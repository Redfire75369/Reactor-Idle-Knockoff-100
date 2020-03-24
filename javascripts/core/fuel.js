function mineFuel(type, amount) {
	if (player.money.gt(10)) {
		player.money = player.money.sub(10);
		player.fuel.amount[type] = player.fuel.amount[type].add(amount);
	}
}

function simulateFuel(tick = 50) {
	
}
function updateUIFuel() {
	for (let i = 0; i < types.length; i++) {
		document.getElementById(types[i] + "_fuel").innerText = f(player.fuel.amount[i]);
		document.getElementById(types[i] + '_conc').innerText = player.fuel.conc[i];
	}
}