let consts;

(function() {
	consts = {
		zodiacSigns: [ "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces" ],
		zodiacRarities: [ "garbage", "common", "uncommon", "rare", "epic", "legendary", "mythic", "godly", "divine", "immortal" ],
		zodiacStats: new Map([
			["aries", ["multsgain", "prompower", "ascensionpower", "commonexponent"]],
			["taurus", ["ipgain", "infinitygain", "genexponent", "multperboughtgen"]],
			["gemini", ["eternitygain", "epgain", "supernovareq", "labmultpower"]],
			["cancer", ["dtpcost", "centerdtueff", "ach29reward", "gamespeed"]],
			["leo", ["lapsspeed", "prompower", "ascensionpower", "commonexponent"]],
			["virgo", ["starbase", "infinitygain", "genexponent", "multperboughtgen"]],
			["libra", ["dpgain", "epgain", "supernovareq", "labmultpower"]],
			["scorpio", ["luckadd", "centerdtueff", "ach29reward", "gamespeed"]],
			["sagittarius", ["lapsspeed", "slowdownpower", "ascensionpower", "commonexponent"]],
			["capriorn", ["starbase", "stardustexponent", "genexponent", "multperboughtgen"]],
			["aquarius", ["dpgain", "freelablevels", "supernovareq", "labmultpower"]],
			["pisces", ["luckadd", "zodiacqualitymult", "ach29reward", "gamespeed"]]
		]),
		zodiacStatsFunction: new Map([
			["multsgain", function(zodiacScore) {
				let value = Decimal.pow(1.35, zodiacScore);
				if (value.e > 1000) value = value.dividedBy(Decimal.pow(10, 1000)).pow(0.1).times(Decimal.pow(10, 1000));
				if (value.e > 10000) value = value.dividedBy(Decimal.pow(10, 10000)).pow(0.01).times(Decimal.pow(10, 10000));
				if (value.e > 100000) value = Decimal.pow(10, Decimal.pow(value.log10() / 1000000, 0.25).times(1000000));
				if (value.e > 500000) value = Decimal.pow(10, Decimal.pow(value.log10() / 5000000, 0.25).times(5000000));
				return value;
			}],
			["prompower", function(zodiacScore) {
				let value = Decimal.pow(1.2, Decimal.log10(zodiacScore));
				if (value.gt(2)) value = value.dividedBy(2).pow(0.3).times(2);
				return value;
			}],
			["commonexponent", function(zodiacScore) {
				let value = Decimal.log10(zodiacScore).multiply(0.016).add(1);
				if (value.gt(1.2)) value = value.dividedBy(1.2).pow(0.115).times(1.2);
				return value;
			}],
			["ascensionpower", function(zodiacScore) {
				let value = Decimal.pow(1.5, Decimal.log10(zodiacScore));
				if (value.gt(5)) value = value.dividedBy(5).pow(0.25).times(5);
				return value;
			}],
			["slowdownpower", function(zodiacScore) {
				return Decimal.log10(new Decimal(9).add(zodiacScore)).pow(1.5).round();
			}],
			["ipgain", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.025).add(1);
			}],
			["infinitygain", function(zodiacScore) {
				return Decimal.pow(3, Decimal.log10(zodiacScore));
			}],
			["genexponent", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.024).add(1);
			}],
			["multperboughtgen", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.007).add(1);
			}],
			["starbase", function(zodiacScore) {
				return Decimal.pow(1.8, Decimal.log10(zodiacScore));
			}],
			["stardustexponent", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.02).add(1);
			}],
			["eternitygain", function(zodiacScore) {
				return Decimal.pow(2, Decimal.log10(zodiacScore));
			}],
			["epgain", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.011).add(1);
			}],
			["labmultpower", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.012).add(1);
			}],
			["supernovareq", function(zodiacScore) {
				return Decimal.divide(1, Decimal.log10(zodiacScore).times(0.02).add(1));
			}],
			["dpgain", function(zodiacScore) {
				var chance = Decimal.log10(zodiacScore).times(0.05).add(1);
				if (chance.gt(1.5)) chance = chance.dividedBy(1.5).pow(0.4).times(1.5);
				return chance;
			}],
			["freelablevels", function(zodiacScore) {
				return Decimal.log10(new Decimal(9).add(zodiacScore)).pow(3).times(5).round();
			}],
			["dtpcost", function(zodiacScore) {
				var chance = Decimal.dOne.dividedBy(Decimal.log10(zodiacScore).times(0.015).add(1));
				if (chance.gt(0.99)) chance = chance.dividedBy(0.99).pow(0.5).times(0.99);
				return chance;
			}],
			["centerdtueff", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.02).add(1);
			}],
			["ach29reward", function(zodiacScore) {
				var chance = Decimal.log10(zodiacScore).times(0.005).add(1);
				if (chance.gt(1.5)) chance = chance.dividedBy(1.02).pow(0.05).times(1.02);
				return chance;
			}],
			["gamespeed", function(zodiacScore) {
				var chance = Decimal.log10(zodiacScore).times(0.1).add(1);
				if (chance.gt(2)) chance = chance.dividedBy(2).pow(0.02).times(2);
				return chance;
			}],
			["luckadd", function(zodiacScore) {
				return Decimal.log10(Decimal.divide(zodiacScore, 20).pow(0.45).times(20)).times(0.07);
			}],
			["zodiacqualitymult", function(zodiacScore) {
				return Decimal.log10(zodiacScore).times(0.04).add(1);
			}]
		]),

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