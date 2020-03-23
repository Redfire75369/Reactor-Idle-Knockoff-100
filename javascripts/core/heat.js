function generateHeat() {
	return player.production.reactor[0].mul(getReactorMult(0)).mul(ExpantaNum.pow(1.05, player.production.coolingRod[0].mul(getCoolingRodMult(0)))).mul(player.fuel.amount[0]).mul(player.fuel.conc[0]);
}

function simulateHeat(tick = 50) {
	player.heat = player.heat.add(generateHeat().mul(tick / 1000));
}