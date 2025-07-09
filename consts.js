let consts;

(function() {
	consts = {
		zodiacSigns: [ "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces" ],
		zodiacRarities: [ "garbage", "common", "uncommon", "rare", "epic", "legendary", "mythic", "godly", "divine", "immortal" ],
		tabs: [
			createTab("assets/score.png", [
				createDropdown("assets/score.png", "Revolutions", "revolutions.html"),
				createDropdown("assets/prestige.png", "Prestige", "prestige.html"),
				createDropdown("assets/promote.png", "Promote", "promote.html")
			]),
			createTab("assets/infinity_64.png", [
				createDropdown("assets/infinity_64.png", "Main", "infinity-main.html"),
				createDropdown("assets/infinity_64.png", "Tree Upgrades", "infinity-tree.html"),
				createDropdown("assets/flash_1_64.png", "Generators", "generators.html"),
				createDropdown("assets/stardust_64.png", "Stars", "stars.html")
			]),
			createTab("assets/eternity_64.png", [
				createDropdown("assets/eternity_64.png", "Milestones", "eternity-milestones.html"),
				createDropdown("assets/a1_1.png", "Animals", "animals.html"),
				createDropdown("assets/flask_128.png", "Laboratory", "laboratory.html"),
				createDropdown("assets/supernova_512.png", "Supernova", "supernova.html"),
				createDropdown("assets/dilation_go_64.png", "Dilation", "dilation.html"),
				createDropdown("assets/loaddt.png", "Dilation Tree", "dilation-tree.html")
			]),
			createTab("assets/unity_64.png", [
				createDropdown("assets/astrology_1_128.png", "Zodiacs", "unity-zodiacs.html"),
				createDropdown("assets/astrology_2_128.png", "Factors", "factors.html"),
				createDropdown("assets/shop_planet.png", "Planet Shop", "planet-shop.html"),
				createDropdown("assets/1.png", "Relics", "relics.html")
			]),
			createTab("assets/attacks_64.png", [
				createDropdown("assets/gold_64.png", "Attacks", "attacks.html")
			]),
			createTab("assets/achievements_64.png", [
				createDropdown("assets/achievements_64.png", "Achievements", "achievements.html")
			]),
			createTab("assets/time_flux_64.png", [
				createDropdown("assets/time_flux_64.png", "Time Flux", "time-flux.html")
			]),
			createTab("assets/option_64.png", [
				createDropdown("assets/option_64.png", "Settings", "settings.html")
			])
		]
	};

	function createTab(iconPath, dropdowns) {
		return { icon: iconPath, dropdowns: dropdowns };
	}

	function createDropdown(iconPath, name, contentFile) {
		let dropdown = { icon: iconPath, name: name, contents: "Loading..." };
		try {
			fetch(contentFile).then(response => {
				if (!response.ok) return "Failed to fetch! Response was not ok";
				response.text().then(text => {
					dropdown.contents = text.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "");
				});
			}, error => {
				dropdown.contents = "Error during fetching: " + error;
			});
		}
		catch (e) {
			dropdown.contents = "Error during loading tab contents: " + e;
		}
		return { inner: dropdown };
	}
})();