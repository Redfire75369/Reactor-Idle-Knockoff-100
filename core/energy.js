function generateEnergy() {
  return (player.turbine.LEU.mul(getTurbineMult("LEU")).gt(player.steam)) ? player.steam : player.turbine.LEU.mul(getTurbineMult("LEU"));
}

function simulateEnergy(tick = 50) {
  player.energy = player.energy.add(generateEnergy().mul(tick/1000));
}
function updateUIEnergy() {
  document.getElementById("energy").innerText = f(player.energy);
}