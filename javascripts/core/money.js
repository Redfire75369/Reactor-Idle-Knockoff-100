function sellEnergy() {
	player.money = player.money.add(player.energy);
	player.energy = zero;
}

function updateUIMoney() {
	document.getElementById("money").innerText = f(player.money);
}