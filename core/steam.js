function condenseSteam() {
  return player.steam.gt(generateEnergy().div(player.turbine.LEU)) ? generateEnergy().div(player.turbine.LEU) : player.steam;
}
function generateSteam() {
  return (player.water.gt(player.heat)) ? player.heat : player.water;
}

function getDrainCost() {
  return E(1).mul(player.water.add(player.steam));
}
function drainOcean() {
  if (player.money.gt(getDrainCost())) {
    player.money = player.money.sub(getDrainCost());
    player.water = player.water.add(player.steam).mul(10).sub(player.steam);
  }
}

function simulateSteam(tick = 50) {
  player.steam = player.steam.add(generateSteam().mul(tick / 1000));
  player.steam = player.steam.sub(condenseSteam().mul(tick / 1000));
  player.water = player.water.add(condenseSteam().mul(tick / 1000));
  player.water = player.water.sub(generateSteam().mul(tick / 1000));
}
function updateUISteam() {
  document.getElementById("water").innerText = f(player.water);
  document.getElementById("steam").innerText = f(player.steam);
  document.getElementById("drainCost").innerText = f(getDrainCost());
}