function buyAuto(type) {
	switch (type) {
		case "energy":
			if (player.money.gte(1e8) && player.autotierone.energy != 1) { 
				player.autotierone.energy = 1;
			}
		default:
	}
}

function simulateAuto() {
	if (player.autotierone.energy == 1) {
		sellEnergy();
	}
}