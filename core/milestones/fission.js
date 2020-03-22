const milestones = [11, 12, 13, 14];

function getMilestoneMult() {
	let ret = E(1);
	for (let i = 0; i < milestones.length; i++) {
		if (player.milestones[milestones[i]]) {
			ret = ret.mul(2);
		}
	}
	return ret;
}

function checkMilestones() {
	player.milestones[11] = player.milestones[11] ? true : player.money.gte(10);
	player.milestones[12] = player.milestones[12] ? true : player.fuel.LEU.gte(100);
	player.milestones[13] = player.milestones[13] ? true : player.reactor.LEU.gte(8);
	player.milestones[14] = player.milestones[14] ? true : player.energy.gte(1e18);
}

function updateUIMilestones() {
	document.getElementById("milestoneMult").innerText = f(getMilestoneMult());
	document.getElementById("mineLEU").style.display = player.milestones[11] ? "inline-block" : "none";
	document.getElementById("autobtn").style.display = player.milestones[12] ? "inline-block" : "none";
	document.getElementById("LEU_crrow").style.display= player.milestones[13] ? "table-row" : "none";
	for (let i = 0; i < milestones.length; i++) {
		document.getElementById("milestone" + milestones[i]).className = player.milestones[milestones[i]] ? "milestonecomplete" : "milestonelocked";
	}
}