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
    let missingItem = listItems(getDefault())[0].diff(listItems(save)[0]);
    if (missingItem.includes("save")) {
      console.log("Unrecoverable corrupted save detected, loading default save...");
      return;
    }
    if (missingItem.length != 0 && imported) {
      if (!confirm("Your imported save seems to be missing some values, which means importing this save might be destructive, if you have made a backup of your current save and are sure about importing this save please press OK, if not, press cancel and the save will not be imported.")) {
        return;
      }
    }

    for (let i = 0, keys = Object.keys(getDefault()), ii = keys.length; i < ii; i++) {
      if (typeof getDefault()[keys[i]] == "object" && !(getDefault()[keys[i]] instanceof ExpantaNum)) {
        for (let j = 0, keys2 = Object.keys(getDefault()[keys[i]]), jj = keys2.length; j < jj; j++) {
          if (Array.isArray(getDefault()[keys[i]][keys2[j]])) {
            for (let k = 0; k < getDefault()[keys[i]][keys2[j]].length; k++) {
              if (getDefault()[keys[i]][keys2[j]][k] instanceof ExpantaNum) {
                player[keys[i]][keys2[j]][k] = ENify(save[keys[i]][keys2[j]][k]);
              } else {
                player[keys[i]][keys2[j]][k] = save[keys[i]][keys2[j]][k];
              }
            }
          } else if (getDefault()[keys[i]][keys2[j]] instanceof ExpantaNum) {
            player[keys[i]][keys2[j]] = ENify(save[keys[i]][keys2[j]]);
          } else {
            player[keys[i]][keys2[j]] = save[keys[i]][keys2[j]];
          }
        }
      } else if (Array.isArray(getDefault()[keys[i]])) {
        for (let j = 0; j < getDefault()[keys[i]].length; j++){
          if (getDefault()[keys[i]][j] instanceof ExpantaNum) {
            player[keys[i]][j] = ENify(save[keys[i]][j]);
          } else {
            player[keys[i]][j] = save[keys[i]][j];
          }
        }
      } else {
        if (getDefault()[keys[i]] instanceof ExpantaNum) {
          player[keys[i]] = ENify(save[keys[i]]);
        } else {
          player[keys[i]] = save[keys[i]];
        }
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

function listItems(data, nestIndex = "") {
	let itemList = []
	let stringList = []
	let arrayList = []
	Object.keys(data).forEach(function (index) {
	let value = data[index]
	let thisIndex = nestIndex + (nestIndex === "" ? "" : ".") + index
  if (!(thisIndex.includes("array")||thisIndex.includes("sign")||thisIndex.includes("layer"))) {
    itemList.push(thisIndex)
  }
	switch (typeof value) {
		case "object":
			if (value instanceof Array) {
				arrayList.push(thisIndex)
			} else if (!(value instanceof ExpantaNum)) {
				let temp = listItems(value, thisIndex)
				itemList = itemList.concat(temp[0])
				stringList = stringList.concat(temp[1])
				arrayList = arrayList.concat(temp[2])
			}
			break;
		case "string":
			stringList.push(thisIndex)
			break;
	}});
	return [itemList, stringList, arrayList]
};