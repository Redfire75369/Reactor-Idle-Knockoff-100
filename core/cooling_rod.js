function getCoolingRodCost(type) {
  return E(1).mul(E(10).pow(player.coolingRod[type]));
}

function buyCoolingRod(type) {
  if (player.money.gt(getCoolingRodCost(type))) {
    player.money = player.money.sub(getCoolingRodCost(type));
    player.coolingRod[type] = player.coolingRod[type].add(1);
  }
}

function getCoolingRodMult(type) {
  return E(4).pow(player.coolingRod[type].sub(1)).mul(getMilestoneMult());
}

function simulateCoolingRods(tick = 50) {
  
}
function updateUICoolingRods() {
  for (let i = 0; i < types.length; i++) {
    document.getElementById(types[i] + "_cr").innerText = f(player.coolingRod[types[i]]);
    document.getElementById(types[i] + "_crmult").innerText = f(getCoolingRodMult(types[i]));
    document.getElementById(types[i] + "_crcost").innerText = f(getCoolingRodCost(types[i]));
  }
}