function getCoolingRodCost(type) {
  return E(10000).mul(E(100).pow(player.production.coolingRod[type]));
}

function buyCoolingRod(type) {
  if (player.money.gt(getCoolingRodCost(type))) {
    player.money = player.money.sub(getCoolingRodCost(type));
    player.production.coolingRod[type] = player.production.coolingRod[type].add(1);
  }
}

function getCoolingRodMult(type) {
  return E(4).pow(player.production.coolingRod[type].sub(1)).mul(getMilestoneMult());
}

function simulateCoolingRods(tick = 50) {
  
}
function updateUICoolingRods() {
  for (let i = 0; i < types.length; i++) {
    document.getElementById(types[i] + "_cr").innerText = f(player.production.coolingRod[i]);
    document.getElementById(types[i] + "_crmult").innerText = f(getCoolingRodMult(i));
    document.getElementById(types[i] + "_crcost").innerText = f(getCoolingRodCost(i));
  }
}