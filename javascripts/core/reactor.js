function getReactorCost(type) {
  return E(1).mul(E(10).pow(player.production.reactor[type]));
}

function buyReactor(type) {
  if (player.money.gt(getReactorCost(type))) {
    player.money = player.money.sub(getReactorCost(type));
    player.production.reactor[type] = player.production.reactor[type].add(1);
  }
}

function getReactorMult(type) {
  return E(4).pow(player.production.reactor[type].sub(1)).mul(getMilestoneMult());
}

function simulateReactors(tick = 50) {
  
}
function updateUIReactors() {
  for (let i = 0; i < types.length; i++) {
    document.getElementById(types[i] + "_rt").innerText = f(player.production.reactor[i]);
    document.getElementById(types[i] + "_rtmult").innerText = f(getReactorMult(i));
    document.getElementById(types[i] + "_rtcost").innerText = f(getReactorCost(i));
  }
}