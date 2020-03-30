const themes = ["Light", "Dark", "Void"];

/*Theme Change*/
function themeChange() {
	player.options.themeNo = (player.options.themeNo + 1 == themes.length) ? 0 : player.options.themeNo + 1;
	player.options.theme = themes[player.options.themeNo];
	document.getElementById("theme").innerText = "Theme: " + player.options.theme;
	document.getElementById("style").setAttribute("href", "stylesheets/" + player.options.theme.toLowerCase() + ".css");
}

function targetedThemeChange(theme) {
	while (player.options.theme != theme) {
		themeChange();
	}
	document.getElementById("theme").innerText = "Theme: " + player.options.theme;
	document.getElementById("style").setAttribute("href", "stylesheets/" + player.options.theme.toLowerCase() + ".css");
}

function save() {
	saveGame();
}
function load() {
	loadSave(getSave());
}


function importSave() {
	let save = prompt("Input your save. WARNING: Your current save file will be overwritten.");
	if (save === null) {
		return
	}
	loadSave(save, true);
	showMainTab(player.navigation.main);
	targetedThemeChange(player.options.theme);
	saveGame();
}
function exportSave() {
	saveGame();
	copyStringToClipboard(getSave());
	alert("Save copied to clipboard");
}