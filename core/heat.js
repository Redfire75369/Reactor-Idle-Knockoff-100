function generateHeat() {
  return player.reactor.LEU.mul(getReactorMult("LEU")).mul(player.fuel.LEU).mul(player.fuelConc.LEU);
}

function simulateHeat(tick = 50) {
  player.heat = player.heat.add(generateHeat().mul(tick / 1000));
}