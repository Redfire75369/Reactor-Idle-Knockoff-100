function getEffCost() {
	let r = player.meltdown.ups[21] ? E(5) : E(10);
	return E(1).mul(E(10).pow(player.eff.add(3)));
}
function canBuyEff() {
	return player.energy.gte(getEffCost());
}

function buyEff() {
	if (canBuyEff()) {
		player.energy = player.energy.sub(getEffCost());
		player.eff = player.eff.add(1);
	}
}
function buyMaxEff() {
	if (canBuyEff()) {
		let r = player.meltdown.ups[21] ? E(5) : E(10);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 1, r, player.eff);
		player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 1, r, player.eff));
		player.eff = player.eff.add(x);
	}
}

function getEffIncrement() {
	return E(1.50);
}

function getEff() {
	return getEffIncrement().pow(player.eff);
}

function updateUIEff() {
	document.getElementById("effDiv").style.display = player.meltdown.amt > 0 ? "inline-block" : "none";
	document.getElementById("effCost").innerText = notation(getEffCost());
	document.getElementById("eff").innerText = notation(getEff());
	document.getElementById("effMult").innerText = notation(getEffIncrement().sub(1).mul(100));
}