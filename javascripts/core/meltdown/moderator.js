const moderatorCost = [E(4096), E("eeee308"), E("(10^)^308 308")];
const moderatorName = ["None", "Graphite", "Beryllium", "Heavy Water"];

function buyModerator() {
	if (player.meltdown.corium.gte(moderatorCost[player.moderator])) {
		player.meltdown.corium = player.meltdown.corium.sub(moderatorCost[player.moderator]);
		player.moderator += 1;
	}
}

function updateUIModerator() {
	document.getElementById("moderator").innerText = moderatorName[player.moderator];
	document.getElementById("modCost").innerText = moderatorName[player.moderator + 1] + " Moderator for " + moderatorCost[player.moderator];
}