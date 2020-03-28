function getCoolantCost(tier) {
	return E(8192).pow((2*tier)**2);
}
function canBuyCoolant(tier) {
	return player.energy.gt(getCoolantCost(tier));
}
function buyCoolant(tier) {
	if (canBuyCoolant(tier)) {
		player.energy = player.energy.sub(getCoolantCost(tier));
		player.coolant[tier].fluid = player.coolant[tier].fluid.add(1);
	}
}