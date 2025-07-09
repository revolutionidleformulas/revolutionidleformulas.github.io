(function() {
	document.addEventListener("initializePage", function(event) {
		const calculator = document.getElementById("calculator-zodiac-stats");
		if (typeof calculator !== undefined && calculator !== null)
			createZodiacStatsCalculator(calculator);
	});
})();

function createZodiacStatsCalculator(parent) {
	const id = "calculator-zodiac-stats";
	parent.classList.add(id);

	var data = { sign: undefined, level: 1, rarity: 0, rarityPlus: 0, quality: 1, statFields: new Array(4) };
	function updateStatsTable() {
		const statname1 = data.statFields[0].name;
		const statname2 = data.statFields[1].name;
		const statname3 = data.statFields[2].name;
		const statname4 = data.statFields[3].name;
		statname1.innerText = statname2.innerText = statname3.innerText = statname4.innerText = '???';

		const statvalue1 = data.statFields[0].value;
		const statvalue2 = data.statFields[1].value;
		const statvalue3 = data.statFields[2].value;
		const statvalue4 = data.statFields[3].value;
		statvalue1.innerText = statvalue2.innerText = statvalue3.innerText = statvalue4.innerText = '???';

		if (data.sign === undefined) return;

		var statNames = consts.zodiacStats.get(data.sign);
		if (statNames === undefined) return;

		statname1.innerText = statNames[0];
		statname2.innerText = statNames[1];
		statname3.innerText = statNames[2];
		statname4.innerText = statNames[3];

		console.debug(data);
		var score = Decimal.pow(1.125, new Decimal(data.rarity).add(data.rarityPlus)).times(data.quality).times(Decimal.pow(data.level, 2).add(9));
		if (data.rarity + data.rarityPlus > 8) score = score.times(2);
		if (data.level >= 100) score = score.times(Decimal.minus(data.level, 90).divdedBy(10).pow(2.5));

		const func0 = consts.zodiacStatsFunction.get(statNames[0]);
		const func1 = consts.zodiacStatsFunction.get(statNames[1]);
		const func2 = consts.zodiacStatsFunction.get(statNames[2]);
		const func3 = consts.zodiacStatsFunction.get(statNames[3]);
		statvalue1.innerText = func0(score).toString();
		statvalue2.innerText = func1(score).toString();
		statvalue3.innerText = func2(score).toString();
		statvalue4.innerText = func3(score).toString();
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
				data.sign = event.target.value;
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
			content.firstChild.addEventListener("input", (event) => {
				data.rarity = 0;
				updateStatsTable();
			});
			content.lastChild.addEventListener("input", (event) => {
				data.rarityPlus = event.data;
				updateStatsTable();
			});
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
			content.firstChild.addEventListener("input", (event) => {
				data.quality = Decimal.fromString(((event.data === null) || event.data.length == 0) ? "0" : event.data).max(0);
				event.target.value = data.quality.toString();
				updateStatsTable();
			});
			body.append(content);

			options.append(body);
		}
		{
			const body = document.createElement("tbody");

			const name = document.createElement("th");
			name.innerText = "Stats";
			body.append(name);

			const content = document.createElement("td");
			const a = document.createElement("table");
			for (let i = 0; i < 4; i++) {
				const b = document.createElement("tbody");

				const c = document.createElement("td");
				const d = document.createElement("td");
				const e = document.createElement("td");
				c.style.textAlign = "left";
				d.innerText = "=";
				data.statFields[i] = { name: c, value: e };

				b.append(c);
				b.append(d);
				b.append(e);
				a.append(b);
			}
			content.append(a);
			body.append(content);
			options.append(body);

			updateStatsTable();
		}
	}
}