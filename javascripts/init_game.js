function init_game() {
	loadSave();
	console.log("Save loaded.");
	document.getElementById("production").style.display = "none";
	document.getElementById("milestones").style.display = "none";
	document.getElementById("automation").style.display = "none";
	document.getElementById("meltdownt").style.display = "none";
	document.getElementById("meltdownUps").style.display = "none";
	document.getElementById("coolants").style.display = "none";
	document.getElementById("options").style.display = "none";
	showMainTab(player.navigation.main);
	targetedThemeChange(player.options.theme);
}

init_game();