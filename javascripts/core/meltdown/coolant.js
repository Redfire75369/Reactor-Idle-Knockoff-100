const coolantCost = {
	NaK: E("e20"),
	Na: E("e100"),
	FLiNaK: infinity,
	FLiBe: E("ee5"),
	Pb: E("ee100"),
	PbBi: E("(10^)^50 308")
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
	if (type == "none") {
		player.coolantActive = type;
		return;
	}
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
	document.getElementById("switchNone").className = player.coolantActive == "none" ? "coolanton" : "coolantoff";
	for (let i = 0, keys = Object.keys(coolantCost); i < keys.length; i++) {
		document.getElementById("buy" + keys[i]).style.display = player.coolant[keys[i]] == 1 ? "none": "inline-block";
		document.getElementById("switch" + keys[i]).style.display = player.coolant[keys[i]] == 1 ? "inline-block": "none";
		document.getElementById("switch" + keys[i]).className = player.coolantActive == keys[i] ? "coolanton" : "coolantoff";
	}
}