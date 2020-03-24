function getReactorCost(type) {
	return E(1).mul(E(10).pow(player.production.reactor[type]));
}
function getTurbineCost(type) {
	return E(1).mul(E(10).pow(player.production.turbine[type]));
}
function getCoolingRodCost(type) {
	return E(10000).mul(E(100).pow(player.production.coolingRod[type]));
}

function buyReactor(type) {
	if (canBuy(getReactorCost(type))) {
		buy(getReactorCost(type));
		player.production.reactor[type] = player.production.reactor[type].add(1);
	}
}
function buyTurbine(type) {
	if (canBuy(getTurbineCost(type))) {
		buy(getTurbineCost(type));
		player.production.turbine[type] = player.production.turbine[type].add(1);
	}
}
function buyCoolingRod(type) {
	if (canBuy(getCoolingRodCost(type))) {
		buy(getCoolingRodCost(type));
		player.production.coolingRod[type] = player.production.coolingRod[type].add(1);
	}
}

function getReactorMult(type) {
	return E(4).pow(player.production.reactor[type].sub(1)).mul(getMilestoneMult());
}
function getTurbineMult(type) {
	return E(4).pow(player.production.turbine[type].sub(1)).mul(getMilestoneMult());
}
function getCoolingRodMult(type) {
	return E(5).pow(player.production.coolingRod[type].sub(1)).mul(getMilestoneMult());
}

function simulateProduction(tick = 50) {
	
}
function updateUIProduction() {
	for (let i = 0; i < types.length; i++) {
		document.getElementById(types[i] + "_rt").innerText = f(player.production.reactor[i]);
		document.getElementById(types[i] + "_rtmult").innerText = f(getReactorMult(i));
		document.getElementById(types[i] + "_rtcost").innerText = formatCost(f(getReactorCost(i)));
		document.getElementById(types[i] + "_tur").innerText = f(player.production.turbine[i]);
		document.getElementById(types[i] + "_turmult").innerText = f(getTurbineMult(i));
		document.getElementById(types[i] + "_turcost").innerText = formatCost(f(getTurbineCost(i)));
		document.getElementById(types[i] + "_cr").innerText = f(player.production.coolingRod[i]);
		document.getElementById(types[i] + "_crmult").innerText = f(getCoolingRodMult(i));
		document.getElementById(types[i] + "_crcost").innerText = formatCost(f(getCoolingRodCost(i)));
	}
}