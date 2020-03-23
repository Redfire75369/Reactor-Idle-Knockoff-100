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
			//save = getSave();
		}
		save = JSON.parse(atob(save));
		save = JSON.parse(JSON.stringify(player));
		for (let i = 0, keys = Object.keys(getDefault()), ii = keys.length; i < ii; i++) {
			let key = keys[i];
			
			console.log(JSON.stringify(getDefault()[key]));
			console.log(JSON.stringify(save[key]));
			if (typeof getDefault()[key] == "object" && !(getDefault()[key] instanceof ExpantaNum)) {
				for (let j = 0, keys2 = Object.keys(getDefault()[key]), jj = keys2.length; j < jj; j++) {
					let key2= keys2[j];
					
					if (typeof getDefault()[key][key2] == "object" && !(getDefault()[key][key2] instanceof ExpantaNum)) {
						for (let k = 0, keys3 = Object.keys(getDefault()[key][key2]), kk = keys3.length; k < kk; k++) {
							let key3 = keys2[k];
							
							checkAssign(getDefault()[key][key2][key3], "player[" + key + "][" + key2 + "][" + key3 + "]", save[key][key2][key3]);
						}
					} else {
						checkAssign(getDefault()[key][key2], "player[" + key + "][" + key2 + "]", save[key][key2]);
					}
				}
			} else {
				checkAssign(getDefault()[key], "player[" + key + "]", save[key]);
			}
		}
		if (imported) {
			alert("Save imported successfully.");
		}
		console.log(JSON.stringify(player));
	} catch(err) {
		console.log(err);
		if (imported) {
			alert("Error: Imported save is in invalid format, please make sure you've copied the save correctly and isn't just typing gibberish.");
		} else {
			console.log("The save didn't load.");
		}
	}
}

function checkAssign(check, assignTo, assign) {
	if (check instanceof Array) {
		for (let x = 0; x < check.length; x++){
			checkAssign(check[x], assignTo + "[" + x + "]", assign[x]);
		}
	} else if (check instanceof ExpantaNum) {
		
		window[assignTo] = ENify(assign);
	} else {
		window[assignTo] = assign;
	}
}