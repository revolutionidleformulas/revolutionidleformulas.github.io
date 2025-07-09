(function() {
	document.addEventListener("initializePage", function(event) {
		const calculator = document.getElementById("calculator-zodiac-stats");
		if (typeof calculator !== undefined && calculator !== null)
			createZodiacStatsCalculator(calculator);
	});
})();

function createZodiacStatsCalculator(parent) {
	const id = "calculator-zodiac-stats";
	const idStatname = "calculator-zodiac-stats_statname";
	const idStatvalue = "calculator-zodiac-stats_statvalue";
	parent.classList.add(id);

	const data = { sign: undefined, level: 1 };
	function updateStatsTable() {
		const statname1 = document.getElementById(idStatname + 1);
		const statname2 = document.getElementById(idStatname + 2);
		const statname3 = document.getElementById(idStatname + 1);
		const statname4 = document.getElementById(idStatname + 4);
		statname1.innerText = statname2.innerText = statname3.innerText = statname4.innerText = '???';

		const statvalue1 = document.getElementById(idStatvalue + 1);
		const statvalue2 = document.getElementById(idStatvalue + 2);
		const statvalue3 = document.getElementById(idStatvalue + 1);
		const statvalue4 = document.getElementById(idStatvalue + 4);
		statvalue1.innerText = statvalue2.innerText = statvalue3.innerText = statvalue4.innerText = '???';

		const statNames = consts.zodiacStats.get(data.sign);
		if (typeof statNames !== undefined) return;

		statname1.innerText = statNames[0];
		statname2.innerText = statNames[1];
		statname3.innerText = statNames[2];
		statname4.innerText = statNames[3];
	}

	const title = document.createElement("center");
	title.style.fontSize = "1.4em";
	title.innerText = "Stats Calculator";
	parent.append(title);

	const visual = document.createElement("div");
	visual.style.float = "left";
	visual.style.position = "relative";
	visual.style.width = "10em";
	visual.style.height = "10em";
	parent.append(visual);
	{
		const background = document.createElement("img");
		background.style.position = "relative";
		background.style.width = "100%";
		background.src = "assets/astrology_1_128.png";
		visual.append(background);

		const zodiacSlot = document.createElement("img");
		zodiacSlot.style.position = "relative";
		zodiacSlot.style.width = "40%";
		zodiacSlot.style.top = "-50%";
		zodiacSlot.style.left = "50%";
		zodiacSlot.style.transform = "translate(-50%, -50%)";
		zodiacSlot.src = "assets/zodiac_slot.png";
		visual.append(zodiacSlot);
	}

	const options = document.createElement("table");
	options.style.paddingTop = "0.5em";
	options.style.paddingLeft = "1em";
	parent.append(options);
	{
		{
			const body = document.createElement("tbody");

			const name = document.createElement("th");
			name.innerText = "Zodiac Sign";
			body.append(name);

			const content = document.createElement("td");
			let html = "<select><option value=\"\">--Please choose a zodiac sign--</option>";
			for (let i = 0; i < consts.zodiacSigns.length; i++) {
				html += "<option value=\"" + consts.zodiacSigns[i] + "\">" + consts.zodiacSigns[i] + "</option>";
			}
			content.innerHTML = html + "</select>";
			content.firstChild.addEventListener("input", (event) => {
				data.sign = event.data;
				updateStatsTable();
			});
			body.append(content);

			options.append(body);
		}
		{
			const body = document.createElement("tbody");

			const name = document.createElement("th");
			name.innerText = "Level";
			body.append(name);

			const content = document.createElement("td");
			content.innerHTML = "<input type=\"number\" min=1 step=1 oninput=\"validity.valid||(value=Math.round(value))\" />";
			content.firstChild.addEventListener("input", (event) => {
				data.level = event.data;
				updateStatsTable();
			});
			body.append(content);

			options.append(body);
		}
		{
			const body = document.createElement("tbody");

			const name = document.createElement("th");
			name.innerText = "Rarity";
			body.append(name);

			const content = document.createElement("td");
			let html = "<select><option value=\"\">--Please choose rarity--</option>";
			for (let i = 0; i < consts.zodiacRarities.length; i++) {
				html += "<option value=\"" + consts.zodiacRarities[i] + "\">" + consts.zodiacRarities[i] + "</option>";
			}
			content.innerHTML = html + "</select>+<input type=\"number\" min=0 step=1 oninput=\"validity.valid||(value=Math.round(value))\" />";
			body.append(content);

			options.append(body);
		}
		{
			const body = document.createElement("tbody");

			const name = document.createElement("th");
			name.innerText = "Quality";
			body.append(name);

			const content = document.createElement("td");
			content.innerHTML = "<input type=\"text\" />";
			body.append(content);

			options.append(body);
		}
		{
			const body = document.createElement("tbody");

			const name = document.createElement("th");
			name.innerText = "Stats";
			body.append(name);

			const content = document.createElement("td");
			let html = "<table>";
			for (let i = 0; i < 4; i++) {
				html += "<tbody><td id=\"" + idStatname + (i + 1) + "\" style=\"text-align: left;\">???</td><td>=</td><td id=\"" + idStatvalue + (i + 1) + "\">???</td></tbody>";
			}
			content.innerHTML = html + "</table>";
			body.append(content);

			options.append(body);
		}
	}
}