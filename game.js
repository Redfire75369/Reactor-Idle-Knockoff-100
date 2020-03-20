function E(x) {
  return new ExpantaNum(x);
} 

let $ = id => document.getElementById(id);
let $$ = type => document.createElement(type);

function getDefault() {
  return {
    money: E(0),
    energy: E(0),
    heat: E(0),
    water: E(100),
    steam: E(0),
    reactor: {
      LEU: E(1)
    },
    coolingRod: {
      LEU: E(1)
    },
    turbine: {
      LEU: E(1),
    },
    fuel: {
      LEU: E(1)
    },
    fuelConc: {
      LEU: 3
    },
    options: {
      notation: "HyperE",
      notationNo: 0
    },
    navigation: {
      main: "production",
      production: "LEU"
    }
  };
}

const zero = E(0);
const types = ["LEU"];
var player = getDefault();


function hardReset() {
  player = getDefault();
}

var updateUILoop = setInterval(function(){
  updateUIMoney();
  updateUIEnergy();
  updateUISteam();
  updateUIFuel();
  updateUIReactors();
  updateUICoolingRods();
  updateUITurbines();
}, 100)


var gameLoop = setInterval(function() {
  simulateSteam(50);
  simulateHeat(50);
  simulateEnergy(50);
}, 50)

var saveLoop = setInterval(function() {
  saveGame();
}, 15000)

/*var testLoop = setInterval(function() {
  console.log(player);
}, 10000);*/