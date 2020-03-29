const coolantCost = {
	NaK: infinity,
	Na: E("ee5"),
	FLiNaK: E("ee100"),
	FLiBe: E("eee5"),
	Pb: E("eee100"),
	PbBi: E("eeee308")
};

function getCoolantCost(type) {
	return coolantCost[type];
}
function canBuyCoolant(type) {
	return player.meltdown.corium.gt(getCoolantCost(type));
}
function buyCoolant(type) {
	if (canBuyCoolant(type)) {
		player.meltdown.corium = player.meltdown.corium.sub(getCoolantCost(type));
		player.coolant[type] = 1;
	}
}

function switchCoolant(type) {
	if (player.coolant[type] == 1) {
		player.coolantActive = type;
	}
}

function simulateCoolant() {
	let random = Math.random();
	if (coolantActive == "FLiNaK" && random > 0.00125) {
		meltdown(true);
	}
}

function updateUICoolant() {
	for (let i = 0, keys = Object.keys(coolantCost); i < keys.length; i++) {
		document.getElementById("buy" + keys[i]).style.display = player.coolant[keys[i]] == 1 ? "none": "inline-block";
		document.getElementById("switch" + keys[i]).style.display = player.coolant[keys[i]] == 1 ? "inline-block": "none";
		document.getElementById("switch" + keys[i]).className = player.coolantActive == keys[i] ? "coolanton" : "coolantoff";
	}
}