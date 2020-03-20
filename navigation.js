function showSubTab() {
	switch (player.navigation.main) {
		case "production":
			showProdTab(player.navigation.production);
			break;
		default:
	}
}

function showMainTab(tab) {
  document.getElementById(player.navigation.main).style.display = "none";
  document.getElementById(tab).style.display = "inline-block";
  player.navigation.main = tab;
  showSubTab();
}

function showProdTab(tab) {
  document.getElementById(player.navigation.production).style.display = "none";
	document.getElementById(tab).style.display = "inline-block";
	player.navigation.production = tab;
}