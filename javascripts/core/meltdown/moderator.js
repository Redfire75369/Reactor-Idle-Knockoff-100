const moderatorCost = [E(4096), E("ee300"), E("(10^)^4 308")];
const moderatorName = ["None", "Graphite", "Beryllium", "Heavy Water"];

function buyModerator() {
	if (player.meltdown.corium.gte(moderatorCost[player.moderator])) {
		player.meltdown.corium = player.meltdown.corium.sub(moderatorCost[player.moderator]);
		player.moderator += 1;
	}
}

function updateUIModerator() {
	let boughtUp = 0;
	for (let i = 0; i < meltdownUpList.length; i++) {
		if (player.meltdown.ups[meltdownUpList[i]]) {
			boughtUp++;
		}
	}
	document.getElementById("modDiv").style.display = (boughtUp >= 6 && player.moderator < 3) ? "inline-block" : "none";
	document.getElementById("moderator").innerText = moderatorName[player.moderator];
	document.getElementById("modCost").innerText = moderatorName[player.moderator + 1] + " Moderator for " + moderatorCost[player.moderator];
	document.getElementById("modLimit").innerText = notation(getLimit(), 2);
}