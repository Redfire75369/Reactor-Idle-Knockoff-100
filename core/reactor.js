function getReactorCost(type) {
  return E(1).mul(E(10).pow(player.reactor[type]));
}

function buyReactor(type) {
  if (player.money.gt(getReactorCost(type))) {
    player.money = player.money.sub(getReactorCost(type));
    player.reactor[type] = player.reactor[type].add(1);
  }
}

function getReactorMult(type) {
  return E(4).pow(player.reactor[type].sub(1));
}

function simulateReactors(tick = 50) {
  
}
function updateUIReactors() {
  for (let i = 0; i < types.length; i++) {
    document.getElementById(types[i] + "_rt").innerText = f(player.reactor[types[i]]);
    document.getElementById(types[i] + "_rtmult").innerText = f(getReactorMult(types[i]));
    document.getElementById(types[i] + "_rtcost").innerText = f(getReactorCost(types[i]));
  }
}