function notation(num, dp = 1) {
	if (num.gte(getLimit())) {
		return "Infinite";
	}
	switch ("Scientific") {
		case "Scientific":
			return scientific(num, dp)
	}
}

function scientific(num, dp) {
	if (num.lt(E("e6"))) {
		return num.toFixed(dp).toString();
	} else if (num.lt(E("eee6"))) {
		if (num.div(E(10).pow(num.logBase(10).floor())).lt(9.999)) {
			return (num.div(E(10).pow(num.logBase(10).floor())).toFixed(dp)) + "e" + scientific(num.logBase(10).floor(), 0);
		} else {
			return E(1).toFixed(dp) + "e" + scientific(num.logBase(10).floor().add(1), 0);
		}
	} else {
		return num.floor().toHyperE();
	}
}