let consts;

(function() {
	consts = {
		tabs: [
			createTab("assets/score.png", [
				createDropdown("assets/score.png", "Revolutions", function(content) {
					content.innerHTML = "pooper";
				}),
				createDropdown("assets/prestige.png", "Prestige", function(content) {
				}),
				createDropdown("assets/promote.png", "Promote", function(content) {
				})
			]),
			createTab("assets/infinity_64.png", [
				createDropdown("assets/infinity_64.png", "Main", function(content) {
				}),
				createDropdown("assets/infinity_64.png", "Tree Upgrades", function(content) {
				}),
				createDropdown("assets/flash_1_64.png", "Generators", function(content) {
				}),
				createDropdown("assets/stardust_64.png", "Stars", function(content) {
				})
			]),
			createTab("assets/eternity_64.png", [
				createDropdown("assets/eternity_64.png", "Milestones", function(content) {
				}),
				createDropdown("assets/a1_1.png", "Animals", function(content) {
				}),
				createDropdown("assets/flask_128.png", "Laboratory", function(content) {
				}),
				createDropdown("assets/supernova_512.png", "Supernova", function(content) {
				}),
				createDropdown("assets/dilation_go_64.png", "Dilation", function(content) {
				}),
				createDropdown("assets/loaddt.png", "Dilation Tree", function(content) {
				})
			]),
			createTab("assets/unity_64.png", [
				createDropdown("assets/sun.png", "Zodiacs", function(content) {
				}),
				createDropdown("assets/astrology_2_128.png", "Factors", function(content) {
				}),
				createDropdown("assets/shop_planet.png", "Planet Shop", function(content) {
				}),
				createDropdown("assets/1.png", "Relics", function(content) {
				})
			]),
			createTab("assets/attacks_64.png", [
				createDropdown("assets/gold_64.png", "Attacks", function(content) {
				})
			]),
			createTab("assets/achievements_64.png", [
				createDropdown("assets/achievements_64.png", "Achievements", function(content) {
				})
			]),
			createTab("assets/time_flux_64.png", [
				createDropdown("assets/time_flux_64.png", "Time Flux", function(content) {
					let html = "";

					html += "<h1>Gains:</h1>"
					html += katex.renderToString(
						"\\text{Time Flux (per hour)} = 3600 \\times \\frac{\\text{TF Gain Level} + 1}{\\text{TF Gain Level} + 10} - \\left\\{ \\begin{array}{cl}"
							+ " \\text{Offline Flux On} & : \\ \\text{OF Percent} \\times \\min(3600 \\times \\frac{\\text{TF Gain Level} + 1}{\\text{TF Gain Level} + 10}, 1800) \\\\"
							+ " \\text{Offline Flux Off} & : \\ 0"
						+ "\\end{array} \\right."
					, { throwOnError: false });
					html += "<br/>"
					html += katex.renderToString("\\text{Offline Flux (per hour)} = \\left\\{ \\begin{array}{cl}"
						+ " \\text{Offline Flux On} & : \\ 5 \\times \\frac{\\text{OF Percent} \\times \\min(3600 \\times \\frac{\\text{TF Gain Level} + 1}{\\text{TF Gain Level} + 10}, 1800)}{3} + 600 \\\\"
						+ " \\text{Offline Flux Off} & : \\ 0"
					+ "\\end{array} \\right."
					, { throwOnError: false });
					html += "<br/>"
					html += katex.renderToString(
						"\\text{Max Time Flux} = 3600 \\times 2^\\text{TF Capacity Level}"
					, { throwOnError: false });
					html += "<br/>"
					html += katex.renderToString(
						"\\text{Max Offline Flux} = 86400 \\times 2^\\text{OF Capacity Level}"
					, { throwOnError: false });

					html += "<h1>Costs:</h1>"
					html += katex.renderToString(
						"\\text{Time Flux Capacity Cost} = 1800 \\times 2^\\text{TF Capacity Level}"
					, { throwOnError: false });
					html += "<br/>";
					html += katex.renderToString(
						"\\text{Time Flux Gain Cost} = 3600 \\times 1.75^\\text{TF Gain Level}"
					, { throwOnError: false });
					html += "<br/>";
					html += katex.renderToString(
						"\\text{Offline Flux Gain Cost} = 18000 \\times 2^\\text{OF Capacity Level}"
					, { throwOnError: false });

					content.innerHTML = html;
				})
			]),
			createTab("assets/option_64.png", [
				createDropdown("assets/option_64.png", "Settings", function(content) {
				})
			])
		]
	};

	function createTab(iconPath, dropdowns) {
		return { icon: iconPath, dropdowns: dropdowns };
	}

	function createDropdown(iconPath, name, addContent) {
		return { icon: iconPath, name: name, contents: addContent };
	}
})();