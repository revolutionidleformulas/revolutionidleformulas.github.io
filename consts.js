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
				createDropdown("assets/astrology_1_128.png", "Zodiacs", "unity-zodiacs.html" /*function(content) {
					let html = "";

					html += "<center><h1>Zodiacs</h1></center>";

					html += "<h2>Stats</h2>";
					html += "<hr/>";

					// START ZODIAC STATS CALCULATOR
					html += "<div style=\"float: right;\">";
					html += "<center style=\"font-size: 1.4em;\">Stats Calculator</center>";

					html += "<div style=\"float: left; position: relative; width: 10em; height: 10em; padding: 1em;\">";
					html += "<img style=\"position: relative; width: 100%;\" src=\"assets/astrology_1_128.png\" />";
					html += "<img style=\"position: relative; width: 40%; top: -50%; left: 50%; transform: translate(-50%, -50%);\" src=\"assets/zodiac_slot.png\" />";
					html += "</div>";

					html += "<table style=\"padding-left: 1em; padding-top: 0.5em; th { text-align: left; }\">";
					html += "<tr>";
					html += "<th style=\"text-align: left;\">Zodiac Sign</th>";
					html += "<td><select><option value=\"\">--Please choose a zodiac sign--</option>"
						+ "<option value=\"aries\">Aries</option>"
						+ "<option value=\"taurus\">Taurus</option>"
						+ "<option value=\"gemini\">Gemini</option>"
						+ "<option value=\"cancer\">Cancer</option>"
						+ "<option value=\"leo\">Leo</option>"
						+ "<option value=\"virgo\">Virgo</option>"
						+ "<option value=\"libra\">Libra</option>"
						+ "<option value=\"scorpio\">Scorpio</option>"
						+ "<option value=\"sagittarius\">Sagittarius</option>"
						+ "<option value=\"capricorn\">Capricorn</option>"
						+ "<option value=\"aquarius\">Aquarius</option>"
						+ "<option value=\"pisces\">Pisces</option>"
						+ "</select></td>";
					html += "</tr>";
					html += "<tr>";
					html += "<th style=\"text-align: left;\">Level</th>";
					html += "<td><input type=\"number\" min=1 step=1 oninput=\"validity.valid||(value=Math.round(value))\" /></td>";
					html += "</tr>";
					html += "<tr>";
					html += "<th style=\"text-align: left;\">Rarity</th>";
					html += "<td><select><option value=\"\">--Please choose rarity--</option>"
						+ "<option value=\"garbage\">Garbage</option>"
						+ "<option value=\"common\">Common</option>"
						+ "<option value=\"uncommon\">Uncommon</option>"
						+ "<option value=\"rare\">Rare</option>"
						+ "<option value=\"epic\">Epic</option>"
						+ "<option value=\"legendary\">Legendary</option>"
						+ "<option value=\"mythic\">Mythic</option>"
						+ "<option value=\"godly\">Godly</option>"
						+ "<option value=\"divine\">Divine</option>"
						+ "<option value=\"immortal\">Immortal</option>"
						+ "</select> +<input type=\"number\" min=0 step=1 oninput=\"validity.valid||(value=Math.round(value))\" /></td>";
					html += "</tr>";
					html += "<tr>";
					html += "<th style=\"text-align: left;\">Quality</th>";
					html += "<td><input type=\"text\" /></td>";
					html += "</tr>";

					html += "<tr>";
					html += "<th style=\"text-align: left;\">Stats</th>";
					html += "<td><span>???</span> = <span>???</span></td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td></td>";
					html += "<td><span>???</span> = <span>???</span></td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td></td>";
					html += "<td><span>???</span> = <span>???</span></td>";
					html += "</tr>";
					html += "<tr>";
					html += "<td></td>";
					html += "<td><span>???</span> = <span>???</span></td>";
					html += "</tr>";

					html += "</table>";

					html += "</div>";
					// END ZODIAC STATS CALCULATOR

					html += "<p>To put it simply, zodiac stats are culmination of zodiacs level, rarity and quality, aka \"score\". Score is calculated using the following formula:<br/></p>";
					html += katex.renderToString(
						"\\text{Score} = 1.125^R \\times Q \\times (9 + L^2) \\times \\left\\{ \\begin{array}{cl}"
							+ " 8 < R & : \\ 2 \\\\" + " R \\leq 8 & : \\ 1"
						+ "\\end{array} \\right. \\times \\left\\{ \\begin{array}{cl}"
							+ " L \\geq 100 & : \\ (\\frac{L - 90}{10})^{2.5} \\\\" + " L < 100 & : \\ 1"
						+ "\\end{array} \\right.") + "<br/>";
					html += "<center>where " + katex.renderToString("R") + " is rarity, " + katex.renderToString("Q") + " is quality, " + katex.renderToString("L") + " is level.</center>";

					html += "<p>However, each zodiac stat has its own formula:</p>";
					html += "<table>";
					html += "<tr><th>Mults Gain</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} \\lessapprox 7672.61 & : \\ 1.35^\\text{Score} \\\\"
						+ " 7672.61 \\lessapprox \\text{Score} \\lessapprox 698207.39 & : \\ 10^{900} \\times 1.35^{0.1 \\times \\text{Score}} \\\\"
						+ " 698207.39 \\lessapprox \\text{Score} \\lessapprox 7.6 \\times 10^9 & : \\ 10^{9009} \\times 1.35^{0.001 \\times \\text{Score}} \\\\"
						+ " 7.6 \\times 10^9 \\lessapprox \\text{Score} \\lessapprox 4.22 \\times 10^{5.32 \\times 10^9}  & : \\ 10^{10^6 \\times (9.009 \\times 10^{-6} \\times \\lg(1.35) \\times \\lg{\\text{Score}})^{0.25}} \\\\"
						+ " 10^{5.32 \\times 10^9} \\lessapprox \\text{Score} & : \\ 10^{5 \\times 10^6 \\times (\\frac{(9.009 \\times 10^{-6} \\times \\lg(1.35) \\times \\lg{\\text{Score}})^{0.25}}{5})^{0.25}} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Promotion Power</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} \\lessapprox 6335.55 & : \\ 1.2^{\\lg{\\text{Score}}} \\\\"
						+ " 6335.55 \\lessapprox \\text{Score} & : \\ 2 \\times (\\frac{1.2^{\\lg{\\text{Score}}}}{2})^{0.3} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Common Exponent</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} \\lessapprox 3.16 \\times 10^{12} & : \\ 1 + 0.016 \\times \\lg{\\text{Score}} \\\\"
						+ " 3.16 \\times 10^{12} \\lessapprox \\text{Score} & : \\ 1.2 \\times (\\frac{1 + 0.016 \\times \\lg{\\text{Score}}}{1.2})^{0.112} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Ascension Power</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} \\lessapprox 9318.85 & : \\ 1.5^{\\lg{\\text{Score}}} \\\\"
						+ " 9318.85 \\lessapprox \\text{Score} & : \\ 5 \\times (\\frac{1.5^{\\lg{\\text{Score}}}}{5})^{0.25} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Laps Speed</th><td>" + katex.renderToString("2^{\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>Slowdown Power</th><td>" + katex.renderToString("\\left[ \\lg(\\text{Score} + 9)^{1.5} \\right]") + "</td></tr>";
					html += "<tr><th>IP Gain</th><td>" + katex.renderToString("1 + 0.025 \\times {\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>Infinity Gain</th><td>" + katex.renderToString("3^{\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>Generator Exponent</th><td>" + katex.renderToString("1 + 0.024 \\times {\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>Mult Pet Bought Gen</th><td>" + katex.renderToString("1 + 0.007 \\times {\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>Star Base</th><td>" + katex.renderToString("1.8^{\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>Stardust Exponent</th><td>" + katex.renderToString("1 + 0.02 \\times {\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>Eternity Gain</th><td>" + katex.renderToString("2^{\\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>EP Gain</th><td>" + katex.renderToString("1 + 0.011 \\times \\lg{\\text{Score}}") + "</td></tr>";
					html += "<tr><th>Lab Mult Power</th><td>" + katex.renderToString("1 + 0.012 \\times \\lg{\\text{Score}}") + "</td></tr>";
					html += "<tr><th>Supernova Req</th><td>" + katex.renderToString("\\frac{1}{1 + 0.02 \\times \\lg{\\text{Score}}}") + "</td></tr>";
					html += "<tr><th>DP Gain</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} \\lessapprox 10^{10} & : \\ 1 + 0.05 \\times \\lg{\\text{Score}} \\\\"
						+ " 10^{10} \\lessapprox \\text{Score} & : \\ 1.5 \\times (\\frac{1 + 0.05 \\times \\lg{\\text{Score}}}{1.5})^{0.4} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Free Lab Levels</th><td>" + katex.renderToString("\\left[ 5 \\times \\lg(\\text{Score} + 9)^{3} \\right]") + "</td></tr>";
					html += "<tr><th>DTP Cost</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} \\lessapprox 4.71 & : \\ \\frac{1}{1 + 0.015 \\times \\lg{\\text{Score}}} \\\\"
						+ " 4.71 \\lessapprox \\text{Score} & : \\ 0.99 \\times (\\frac{1}{0.99 \\times (1 + 0.015 \\times \\lg{\\text{Score}})})^{0.5} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Center DTU Effect</th><td>" + katex.renderToString("1 + 0.02 \\times \\lg{\\text{Score}}") + "</td></tr>";
					html += "<tr><th>Ach.29 Reward</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} < 10^4 & : \\ 1 + 0.005 \\times \\lg{\\text{Score}} \\\\"
						+ " 10^4 \\leq \\text{Score} & : \\ 1.02 \\times (\\frac{1 + 0.005 \\times \\lg{\\text{Score}}}{1.02})^{0.05} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Game Speed</th><td>" + katex.renderToString("\\left\\{ \\begin{array}{cl}"
						+ " \\text{Score} < 10^{10} & : \\ 1 + 0.1 \\times \\lg{\\text{Score}} \\\\"
						+ " 10^{10} \\leq \\text{Score} & : \\ 2 \\times (\\frac{1 + 0.1 \\times \\lg{\\text{Score}}}{2})^{0.02} \\\\"
						+ "\\end{array} \\right.") + "</td></tr>";
					html += "<tr><th>Luck</th><td>" + katex.renderToString("0.07 \\times \\lg{(20 \\times (\\frac{\\text{Score}}{20})^{0.45})}") + "</td></tr>";
					html += "<tr><th>Quality Mult</th><td>" + katex.renderToString("1 + 0.04 \\times \\lg{\\text{Score}}") + "</td></tr>";
					html += "</table>";

					content.innerHTML = html;
				}*/),
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

	async function createDropdown(iconPath, name, contentFile) {
		const contents = await fetch(contentFile).then(response => {
			if (!response.ok) return "Failed to fetch! Response was not ok";
			return response.text();
		});
		return { icon: iconPath, name: name, contents: contents };
	}
})();