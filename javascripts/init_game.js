function init_game() {
	loadSave();
	console.log(JSON.stringify(player.navigation));
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
	console.log(JSON.stringify(E("J^63 10^^^(10^)^7625597484984 3638334640023.7783")));
}

init_game();