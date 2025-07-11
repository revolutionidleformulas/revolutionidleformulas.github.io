const settings = {
	getDigitPrecision: function() {
		const defaultValue = 5;
		const key = "digitPrecision";

		try {
			if (window.localStorage.getItem(key) == null) {
				return defaultValue;
			}

			return toInt(window.localStorage.getItem(key));
		}
		catch {
			return defaultValue;
		}
	},
	setDigitPrecision: function(value) {
		const key = "digitPrecision";

		try {
			window.localStorage.setItem(key, value);
			return true;
		}
		catch {
			return false;
		}
	},

	// TODO: Implement
	getLanguage: function() {
		const defaultValue = "en_us";
		const key = "language";

		try {
			if (window.localStorage.getItem(key) == null) {
				return defaultValue;
			}

			return window.localStorage.getItem(key);
		}
		catch {
			return defaultValue;
		}
	}
};