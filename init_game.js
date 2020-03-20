function init_game() {
  loadSave();
  console.log("Save loaded.");
  document.getElementById("production").style.display = "none";
  document.getElementById("options").style.display = "none";
  showMainTab(player.navigation.main);
}

init_game();