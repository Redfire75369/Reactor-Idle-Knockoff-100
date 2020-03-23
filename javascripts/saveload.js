function ENify(json) {
	let x = new ExpantaNum(0);
	x.array = json.array;
	x.sign = json.sign;
	x.list = json.list;
	return x;
}

Array.prototype.diff = function (a) {
	return this.filter(function (i) {
	return a.indexOf(i) < 0;
	});
};

function getSaveString() {
	return btoa(JSON.stringify(player));
}

function getSave() {
	return localStorage.getItem("save");
}
function saveGame() {
	localStorage.setItem("save", getSaveString());
	console.log("Game saved.")
}

function loadSave(save, imported = false) {
	try {
		if (save === undefined) {
			save = getSave();
		}
		save = JSON.parse(atob(save));
		
		for (let i = 0, keys = Object.keys(getDefault()), ii = keys.length; i < ii; i++) {
			let key = keys[i];
			if (key.includes("automation")) {
				player.automation =  getDefault().automation;
			} else if (typeof getDefault()[key] == "object" && !(getDefault()[key] instanceof ExpantaNum)) {
				for (let j = 0, keys2 = Object.keys(getDefault()[key]), jj = keys2.length; j < jj; j++) {
					let key2= keys2[j];
					
					if (typeof getDefault()[key][key2] == "object" && !(getDefault()[key][key2] instanceof ExpantaNum)) {
						for (let k = 0, keys3 = Object.keys(getDefault()[key][key2]), kk = keys3.length; k < kk; k++) {
							let key3 = keys2[k];
							
							checkAssign(getDefault()[key][key2][key3], save[key][key2][key3], key, key2, key3);
						}
					} else {
						checkAssign(getDefault()[key][key2], save[key][key2], key, key2);
					}
				}
			} else {
				checkAssign(getDefault()[key], save[key], key);
			}
		}
		
		if (imported) {
			alert("Save imported successfully.");
		}
	} catch(err) {
		console.log(err);
		if (imported) {
			alert("Error: Imported save is in invalid format, please make sure you've copied the save correctly and isn't just typing gibberish.");
		} else {
			console.log("The save didn't load.");
		}
	}
}

function checkAssign(check, assignFrom, assignToKey1, assignToKey2, assignToKey3, assignToKey4, assignToKey5) {
	if (assignToKey5 !== undefined) {
		if (check instanceof ExpantaNum) {
			player[assignToKey1][assignToKey2][assignToKey3][assignToKey5] = ENify(assignFrom);
		} else {
			player[assignToKey1][assignToKey2][assignToKey3][assignToKey5] = assignFrom;
		}
	} else if (assignToKey4 !== undefined) {
		if (check instanceof Array) {
			for (let x = 0; x < check.length; x++){
				checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, assignToKey3, assignToKey4, x);
			}
		} else if (check instanceof ExpantaNum) {
			player[assignToKey1][assignToKey2][assignToKey3][assignToKey4] = ENify(assignFrom);
		} else {
			player[assignToKey1][assignToKey2][assignToKey3][assignToKey4] = assignFrom;
		}
	} else if (assignToKey3 !== undefined) {
		if (check instanceof Array) {
			for (let x = 0; x < check.length; x++){
				checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, assignToKey3, x);
			}
		} else if (check instanceof ExpantaNum) {
			player[assignToKey1][assignToKey2][assignToKey3] = ENify(assignFrom);
		} else {
			player[assignToKey1][assignToKey2][assignToKey3] = assignFrom;
		}
	} else if (assignToKey2 !== undefined) {
		if (check instanceof Array) {
			for (let x = 0; x < check.length; x++){
				checkAssign(check[x], assignFrom[x], assignToKey1, assignToKey2, x);
			}
		} else if (check instanceof ExpantaNum) {
			player[assignToKey1][assignToKey2] = ENify(assignFrom);
		} else {
			player[assignToKey1][assignToKey2] = assignFrom;
		}
	} else if (assignToKey1 !== undefined) {
		if (check instanceof Array) {
			for (let x = 0; x < check.length; x++){
				checkAssign(check[x], assignFrom[x], assignToKey1, x);
			}
		} else if (check instanceof ExpantaNum) {
			player[assignToKey1] = ENify(assignFrom);
		} else {
			player[assignToKey1] = assignFrom;
		}
	}
}