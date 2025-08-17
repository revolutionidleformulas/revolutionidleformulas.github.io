let consts;

(function() {
	consts = {
		zodiacSigns: [ "aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces" ],
		zodiacRarities: [ "garbage", "common", "uncommon", "rare", "epic", "legendary", "mythic", "godly", "divine", "immortal" ],
		zodiacStatsBySign: new Map([
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
		zodiacStats: new Map([
			["multsgain", {
				calculate: function(zodiacScore) {
					let value = Decimal.pow(1.35, zodiacScore);
					if (value.e > 1000) value = value.dividedBy(Decimal.pow(10, 1000)).pow(0.1).times(Decimal.pow(10, 1000));
					if (value.e > 10000) value = value.dividedBy(Decimal.pow(10, 10000)).pow(0.01).times(Decimal.pow(10, 10000));
					if (value.e > 1000000) value = Decimal.pow(10, Decimal.pow(value.log10() / 1000000, 0.25).times(1000000));
					if (value.e > 5000000) value = Decimal.pow(10, Decimal.pow(value.log10() / 5000000, 0.01).times(5000000));
					return value;
				}
			}],
			["prompower", {
				calculate: function(zodiacScore) {
					let value = Decimal.pow(1.2, Decimal.log10(zodiacScore));
					if (value.gt(2)) value = value.dividedBy(2).pow(0.3).times(2);
					return value;
				}
			}],
			["commonexponent", {
				calculate: function(zodiacScore) {
					let value = Decimal.log10(zodiacScore).multiply(0.016).add(1);
					if (value.gt(1.2)) value = value.dividedBy(1.2).pow(0.115).times(1.2);
					return value;
				}
			}],
			["ascensionpower", {
				calculate: function(zodiacScore) {
					let value = Decimal.pow(1.5, Decimal.log10(zodiacScore));
					if (value.gt(5)) value = value.dividedBy(5).pow(0.25).times(5);
					return value;
				}
			}],
			["slowdownpower", {
				calculate: function(zodiacScore) {
					return Decimal.log10(new Decimal(9).add(zodiacScore)).pow(1.5).round();
				}
			}],
			["ipgain", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.025).add(1);
				}
			}],
			["infinitygain", {
				calculate: function(zodiacScore) {
					return Decimal.pow(3, Decimal.log10(zodiacScore));
				}
			}],
			["genexponent", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.024).add(1);
				}
			}],
			["multperboughtgen", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.007).add(1);
				}
			}],
			["starbase", {
				calculate: function(zodiacScore) {
					return Decimal.pow(1.8, Decimal.log10(zodiacScore));
				}
			}],
			["stardustexponent", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.02).add(1);
				}
			}],
			["eternitygain", {
				calculate: function(zodiacScore) {
					return Decimal.pow(2, Decimal.log10(zodiacScore));
				}
			}],
			["epgain", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.011).add(1);
				}
			}],
			["labmultpower", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.012).add(1);
				}
			}],
			["supernovareq", {
				calculate: function(zodiacScore) {
					var value = Decimal.divide(1, Decimal.log10(zodiacScore).times(0.02).add(1));
					if (value.lt(0.8)) value = value.dividedBy(0.8).pow(0.1).times(0.8);
					return value;
				}
			}],
			["dpgain", {
				calculate: function(zodiacScore) {
					var value = Decimal.log10(zodiacScore).times(0.05).add(1);
					if (value.gt(1.5)) value = value.dividedBy(1.5).pow(0.4).times(1.5);
					if (value.gt(1.6)) value = value.dividedBy(1.6).pow(0.15).times(1.6);
					return value;
				}
			}],
			["freelablevels", {
				calculate: function(zodiacScore) {
					return Decimal.log10(new Decimal(9).add(zodiacScore)).pow(3).times(5).round();
				}
			}],
			["dtpcost", {
				calculate: function(zodiacScore) {
					var value = Decimal.dOne.dividedBy(Decimal.log10(zodiacScore).times(0.015).add(1));
					if (value.lt(0.99)) value = value.dividedBy(0.99).pow(0.5).times(0.99);
					if (value.lt(0.9)) value = value.dividedBy(0.9).pow(0.3).times(0.9);
					return value;
				}
			}],
			["centerdtueff", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.02).add(1);
				}
			}],
			["ach29reward", {
				calculate: function(zodiacScore) {
					var value = Decimal.log10(zodiacScore).times(0.005).add(1);
					if (value.gt(1.02)) value = value.dividedBy(1.02).pow(0.05).times(1.02);
					return value;
				}
			}],
			["gamespeed", {
				calculate: function(zodiacScore) {
					var value = Decimal.log10(zodiacScore).times(0.1).add(1);
					if (value.gt(2)) value = value.dividedBy(2).pow(0.02).times(2);
					return value;
				}
			}],
			["luckadd", {
				calculate: function(zodiacScore) {
					return Decimal.log10(Decimal.divide(zodiacScore, 20).pow(0.45).times(20)).times(0.07);
				}
			}],
			["zodiacqualitymult", {
				calculate: function(zodiacScore) {
					return Decimal.log10(zodiacScore).times(0.04).add(1);
				}
			}]
		]),

		tabs: [
			createTab("assets/score.png", "filter-none", [
				createDropdown("assets/score.png", "filter-none", "Revolutions", "revolutions.html"),
				createDropdown("assets/prestige.png", "filter-white-2-prestige-color", "Prestige", "prestige.html"),
				createDropdown("assets/promote.png", "filter-white-2-promote-color", "Promote", "promote.html")
			]),
			createTab("assets/infinite.png", "filter-white-2-infinity-color", [
				createDropdown("assets/infinite.png", "filter-white-2-infinity-color", "Main", "infinity-main.html"),
				createDropdown("assets/infinite.png", "filter-white-2-infinity-color", "Tree Upgrades", "infinity-tree.html"),
				createDropdown("assets/flash_1_64.png", "filter-white-2-generator-flash-color", "Generators", "generators.html"),
				createDropdown("assets/stardust_64.png", "filter-none", "Stars", "stars.html")
			]),
			createTab("assets/eternity_64.png", "filter-white-2-eternity-color", [
				createDropdown("assets/eternity_64.png", "filter-white-2-eternity-color", "Milestones", "eternity-milestones.html"),
				createDropdown("assets/a1_1.png", "filter-none", "Animals", "animals.html"),
				createDropdown("assets/flask_128.png", "filter-none", "Laboratory", "laboratory.html"),
				createDropdown("assets/supernova_512.png", "filter-none", "Supernova", "supernova.html"),
				createDropdown("assets/dilation_go_64.png", "filter-white-2-dilation-color", "Dilation", "dilation.html"),
				createDropdown("assets/dil_tree_outline.png", "filter-none", "Dilation Tree", "dilation-tree.html")
			]),
			createTab("assets/unity_64.png", "filter-white-2-unity-color", [
				createDropdown("assets/unity_64.png", "filter-white-2-unity-color", "Main", "unity-main.html"),
				createDropdown("assets/astrology_1_128.png", "filter-none", "Zodiacs", "unity-zodiacs.html"),
				createDropdown("assets/shop_planet.png", "filter-none", "Planet Shop", "planet-shop.html"),
				createDropdown("assets/1.png", "filter-none", "Relics", "relics.html")
			]),
			createTab("assets/attack.png", "filter-white-2-attacks-color", [
				createDropdown("assets/attack.png", "filter-white-2-attacks-color", "Main", "attacks-main.html"),
				createDropdown("assets/prestige.png", "filter-white-2-attacks-prestige-color", "Prestige", "attacks-prestige.html")
			]),
			createTab("assets/achievements_64.png", "filter-white-2-achievements-color", [
				createDropdown("assets/achievements_64.png", "filter-white-2-achievements-color", "Achievements", "achievements.html")
			]),
			createTab("assets/timeflux.png", "filter-white-2-time-flux-color", [
				createDropdown("assets/timeflux.png", "filter-white-2-time-flux-color", "Time Flux", "time-flux.html")
			]),
			createTab("assets/option_64.png", "filter-white-2-options-color", [
				createDropdown("assets/option_64.png", "filter-white-2-options-color", "Settings", "settings.html")
			])
		]
	};

	function createTab(iconPath, filterClass, dropdowns) {
		return { icon: iconPath, filter: filterClass, dropdowns: dropdowns };
	}

	function createDropdown(iconPath, filterClass, name, contentFile) {
		let dropdown = { icon: iconPath, filter: filterClass, name: name, contents: "Loading..." };
		try {
			fetch("text/" + "en_us" + "/" + contentFile).then(response => {
				if (!response.ok) {
					dropdown.contents = "Error during fetching";
					return "Failed to fetch! Response was not ok";
				}

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