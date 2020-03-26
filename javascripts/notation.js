function notation(num, dp = 1) {
	switch ("Scientific") {
		case "Scientific":
			return scientific(num, dp)
	}
}

function scientific(num, dp) {
	if (num.lt(E("e6"))) {
		return num.toFixed(dp).toString();
	} else if (num.lt(E("eee6"))) {
		if (num.div(E(10).pow(num.logBase(10).floor())).lt(9.99)) {
			return (num.div(E(10).pow(num.logBase(10).floor())).toFixed(dp)) + "e" + scientific(num.logBase(10).floor(), dp);
		} else {
			return E(1).toFixed(dp) + "e" + scientific(num.logBase(10).floor().add(1), dp);
		}
	} else {
		return num.floor().toHyperE();
	}
}