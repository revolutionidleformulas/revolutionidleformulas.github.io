(function() {
	document.addEventListener("initializePage", function(event) {
		const calculator = document.getElementById("calculator-zodiac-stats");
		if (typeof calculator !== undefined && calculator !== null)
			createZodiacStatsCalculator(calculator);
	});
})();

function createZodiacStatsCalculator(parent) {
	parent.classList.add("calculator-zodiac-stats");

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
				html += "<tbody><td style=\"text-align: left;\">???</td><td>=</td><td>???</td></tbody>";
			}
			content.innerHTML = html + "</table>";
			body.append(content);

			options.append(body);
		}
	}
}