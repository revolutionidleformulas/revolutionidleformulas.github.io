let clickedOnDropdown = false;
let currentTab;

window.onload = function() {
	document.body.append(createContentElement());
	document.body.prepend(createTabsElement());

	function createTabsElement() {
		const tabs = document.createElement("nav");
		tabs.classList.add("tabs");
		for (let i = 0; i < consts.tabs.length; i++) {
			const icon = document.createElement("ul");
			icon.style.zIndex = 1;

			const dropdown = document.createElement("div");
			dropdown.classList.add("dropdown");

			const dropdownCount = consts.tabs[i].dropdowns.length;
			for (let j = 0; j < dropdownCount; j++) {
				const dropdownOption = document.createElement("div");
				dropdownOption.classList.add("dropdown-option");

				const dropdownIcon = document.createElement("div");
				dropdownIcon.classList.add("dropdown-icon");
				const dropdownImg = document.createElement("img");
				dropdownImg.src = consts.tabs[i].dropdowns[j].icon;
				dropdownIcon.append(dropdownImg);
				dropdownOption.append(dropdownIcon);

				const dropdownText = document.createElement("div");
				dropdownText.classList.add("dropdown-title");
				dropdownText.innerText = consts.tabs[i].dropdowns[j].name;
				dropdownOption.append(dropdownText);

				dropdownOption.addEventListener("click", function() {
					if (clickedOnDropdown) return;
					clickedOnDropdown = true;

					const content = document.getElementById("content");
					content.innerHTML = "";
					consts.tabs[i].dropdowns[j].contents(content);

					currentTab = icon;

					clickedOnDropdown = false;
				});

				dropdown.append(dropdownOption);
			}

			if (dropdownCount == 1) {
				icon.addEventListener("click", function() {
					if (clickedOnDropdown) return;
					clickedOnDropdown = true;

					const content = document.getElementById("content");
					content.innerHTML = "";
					consts.tabs[i].dropdowns[0].contents(content);

					if (typeof currentTab !== 'undefined') currentTab.classList.remove('chosen');
					currentTab = icon;
					currentTab.classList.add('chosen');

					clickedOnDropdown = false;
				});
			}

			const img = document.createElement("img");
			img.style.zIndex = 1;
			img.src = consts.tabs[i].icon;
			icon.append(img);
			icon.append(dropdown);

			tabs.append(icon);
		}
		return tabs;
	}

	function createContentElement() {
		const content = document.createElement("div");
		content.classList.add("content");
		content.id = "content";
		return content;
	}
}
