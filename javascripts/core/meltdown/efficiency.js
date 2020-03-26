function getEffCost() {
	return E(10).pow(player.eff.add(3));
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