function getTurbineCost(type) {
  return E(1).mul(E(10).pow(player.turbine[type]));
}

function buyTurbine(type) {
  if (player.money.gt(getTurbineCost(type))) {
    player.money = player.money.sub(getTurbineCost(type));
    player.turbine[type] = player.turbine[type].add(1);
  }
}

function getTurbineMult(type) {
  return E(4).pow(player.turbine[type].sub(1)).mul(getMilestoneMult());
}

function simulateTurbines(tick = 50) {
  
}
function updateUITurbines() {
  for (let i = 0; i < types.length; i++) {
    document.getElementById(types[i] + "_tur").innerText = f(player.turbine[types[i]]);
    document.getElementById(types[i] + "_turmult").innerText = f(getTurbineMult(types[i]));
    document.getElementById(types[i] + "_turcost").innerText = f(getTurbineCost(types[i]));
  }
}