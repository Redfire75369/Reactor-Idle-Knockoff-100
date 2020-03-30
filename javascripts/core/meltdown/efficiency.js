function getEffCost() {
	let r = player.meltdown.ups[21] ? E(5) : E(10);
	return E(1000).mul(r.pow(player.eff));
}
function canBuyEff() {
	return player.energy.gte(getEffCost());
}

function buyEff() {
	if (canBuyEff()) {
		if (getEffCost().lt("(10^)^4 308")) {
			player.energy = player.energy.sub(getEffCost());
		}
		player.eff = player.eff.add(1);
	}
}
function buyMaxEff() {
	if (canBuyEff()) {
		let r = player.meltdown.ups[31] ? E(2) : player.meltdown.ups[21] ? E(5) : E(10);
		let x = ExpantaNum.affordGeometricSeries(player.energy, 1000, r, player.eff);
		if (getEffCost().lt("(10^)^4 308")) {
			player.energy = player.energy.sub(ExpantaNum.sumGeometricSeries(x, 1000, r, player.eff));
		}
		player.eff = player.eff.add(x);
	}
}

function getEffIncrement() {
	let ret = (player.coolantActive == "FLiNaK") ? player.meltdown.corium.add(1).logBase(10).add(1.50) : E(1.50);
	return ret;
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