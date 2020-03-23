function getTurbineCost(type) {
  return E(1).mul(E(10).pow(player.production.turbine[type]));
}

function buyTurbine(type) {
  if (player.money.gt(getTurbineCost(type))) {
    player.money = player.money.sub(getTurbineCost(type));
    player.production.turbine[type] = player.production.turbine[type].add(1);
  }
}

function getTurbineMult(type) {
  return E(4).pow(player.production.turbine[type].sub(1)).mul(getMilestoneMult());
}

function simulateTurbines(tick = 50) {
  
}
function updateUITurbines() {
  for (let i = 0; i < types.length; i++) {
    document.getElementById(types[i] + "_tur").innerText = f(player.production.turbine[i]);
    document.getElementById(types[i] + "_turmult").innerText = f(getTurbineMult(i));
    document.getElementById(types[i] + "_turcost").innerText = f(getTurbineCost(i));
  }
}