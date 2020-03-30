const meltdownUpCost = {
	11: E(1),
	12: E(2),
	13: E(3),
	21: E(100),
	22: E(250),
	23: E(1000),
	31: E(1e200),
	32: E(1e300),
	33: E("1e2500")
}
const meltdownUpList = [11, 12, 13, 21, 22, 23, 31, 32, 33];

function canBuyMeltdownUp(id) {
	return (player.meltdown.corium.gte(meltdownUpCost[id]) && !player.meltdown.ups[id]);
}

function buyMeltdownUp(id) {
	if (canBuyMeltdownUp(id)) {
		player.meltdown.corium = player.meltdown.corium.sub(meltdownUpCost[id]);
		player.meltdown.ups[id] = true;
	}
}

function getMeltdownUpMult(id) {
	switch (id) {
		case 11:
			return ExpantaNum.max(1, Math.log2(player.time / 1000));
		case 12:
			return ExpantaNum.max(1, player.energy.add(10).logBase(10).div(4));
		case 13:
			return ExpantaNum.max(1, ExpantaNum.pow(1.5, player.automation.basic.fuel[0])); 
		default:
			return E(1);
	}
}
function getTotalMeltdownUpMult() {
	let ret = E(1);
	for (let i = 0; i < meltdownUpList.length; i++) {
		if (player.meltdown.ups[meltdownUpList[i]]) {
			ret = ret.mul(getMeltdownUpMult(meltdownUpList[i]));
		}
	}
	return ret;
}

function updateUIMeltdownUps() {
	for (let i = 0; i < meltdownUpList.length; i++) {
		document.getElementById("meltdownUp" + meltdownUpList[i]).className = player.meltdown.ups[meltdownUpList[i]] ? "meltdownupbought" : canBuyMeltdownUp(meltdownUpList[i]) ? "meltdownupbuy" : "meltdownuplocked";
	}
}