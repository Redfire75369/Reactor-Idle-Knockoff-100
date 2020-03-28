function getReactorCost(type) {
	let r = player.meltdown.ups[21] ? E(5) : E(10);
	return E(1).mul(r.pow(player.production.reactor[type]));
}
function getTurbineCost(type) {
	let r = player.meltdown.ups[21] ? E(5) : E(10);
	return E(1).mul(r.pow(player.production.turbine[type]));
}
function getCoolingRodCost(type) {
	let r = player.meltdown.ups[21] ? E(50) : E(100);
	return E(10000).mul(r.pow(player.production.coolingRod[type]));
}
function getCentrifugeCost(type) {
	let r = player.meltdown.ups[21] ? E(20) : E(40);
	return E(100).mul(r.pow(player.production.centrifuge[type]));
}

function canBuyReactor(type) {
	return player.energy.gte(getReactorCost(type));
}
function canBuyTurbine(type) {
	return player.energy.gte(getTurbineCost(type));
}
function canBuyCoolingRod(type) {
	return player.energy.gte(getCoolingRodCost(type));
}
function canBuyCentrifuge(type) {
	return player.meltdown.corium.gte(getCentrifugeCost(type));
}


function buyReactor(type) {
	if (canBuyReactor(type)) {
		player.energy = player.energy.sub(getReactorCost(type));
		player.production.reactor[type] = player.production.reactor[type].add(1);
	}
}
function buyTurbine(type) {
	if (canBuyTurbine(type)) {
		player.energy = player.energy.sub(getTurbineCost(type));
		player.production.turbine[type] = player.production.turbine[type].add(1);
	}
}
function buyCoolingRod(type) {
	if (canBuyCoolingRod(type)) {
		player.energy = player.energy.sub(getCoolingRodCost(type));
		player.production.coolingRod[type] = player.production.coolingRod[type].add(1);
	}
}
function buyCentrifuge(type) {
	if (canBuyCentrifuge(type)) {
		player.corium = player.corium.sub(getCentrifugeCost());
		player.production.centrifuge[type] = player.production.centrifuge[type].add(1);
	}
}

function buyMaxReactor(type) {
	if (canBuyReactor(type)) {
		let r = player.meltdown.ups[21] ? E(5) : E(10);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 1, r, player.production.reactor[type]);
		player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 1, r, player.production.reactor[type]));
		player.production.reactor[type] = player.production.reactor[type].add(x);
	}
}
function buyMaxTurbine(type) {
	if (canBuyTurbine(type)) {
		let r = player.meltdown.ups[21] ? E(5) : E(10);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 1, r, player.production.turbine[type]);
		player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 1, r, player.production.turbine[type]));
		player.production.turbine[type] = player.production.turbine[type].add(x);
	}
}
function buyMaxCoolingRod(type) {
	if (canBuyCoolingRod(type)) {
		let r = player.meltdown.ups[21] ? E(50) : E(100);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 10000, r, player.production.coolingRod[type]);
		player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 10000, r, player.production.coolingRod[type]));
		player.production.coolingRod[type] = player.production.coolingRod[type].add(x);
	}
}
function buyMaxCentrifuge(type) {
	if (canBuyCentrifuge(type)) {
		let r = player.meltdown.ups[21] ? E(20) : E(40);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 100, r, player.production.centrifuge[type]);
		player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 100, r, player.production.coolingRod[type]));
		player.production.coolingRod[type] = player.production.coolingRod[type].add(x);
	}
}

function getReactorMult(type) {
	let ret = E(4).pow(player.production.reactor[type].sub(1)).mul(getMilestoneMult());
	ret = ret.mul(getTotalMeltdownUpMult());
	ret = player.meltdown.ups[22] ? ret.mul(ExpantaNum.max(1, E(2).pow(player.production.turbine[type]))) : ret;
	ret = player.meltdown.ups[23] ? ret.pow(player.meltdown.corium.log10().div(10).max(1)) : ret;
	return ret;
}
function getTurbineMult(type) {
	let ret = E(4).pow(player.production.turbine[type].sub(1)).mul(getMilestoneMult());
	ret = ret.mul(getTotalMeltdownUpMult());
	ret = player.meltdown.ups[22] ? ret.mul(ExpantaNum.max(1, E(2.1).pow(player.production.reactor[type]))) : ret;
	ret = player.meltdown.ups[23] ? ret.pow(player.meltdown.corium.log10().div(10).max(1)) : ret;
	return ret;
}
function getCoolingRodMult(type) {
	return E(5).pow(player.production.coolingRod[type].sub(1)).mul(getMilestoneMult());
}
function getCentrifugeMult(type) {
	return E(3).pow(player.production.centrifuge[type].sub(1)).mul(getMilestoneMult());
}

function simulateProduction(tick = 50) {
	
}
function updateUIProduction() {
	for (let i = 0; i < types.length; i++) {
		document.getElementById(types[i] + "_rt").innerText = notation(player.production.reactor[i]);
		document.getElementById(types[i] + "_rtmult").innerText = notation(getReactorMult(i));
		document.getElementById(types[i] + "_rtcost").innerText = notation(getReactorCost(i));
		document.getElementById(types[i] + "_tur").innerText = notation(player.production.turbine[i]);
		document.getElementById(types[i] + "_turmult").innerText = notation(getTurbineMult(i));
		document.getElementById(types[i] + "_turcost").innerText = notation(getTurbineCost(i));
		document.getElementById(types[i] + "_cr").innerText = notation(player.production.coolingRod[i]);
		document.getElementById(types[i] + "_crmult").innerText = notation(getCoolingRodMult(i));
		document.getElementById(types[i] + "_crcost").innerText = notation(getCoolingRodCost(i));
	}
}