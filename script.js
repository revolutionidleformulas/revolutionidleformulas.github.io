class InitializePageEvent extends Event {
	constructor(page, raw) {
		super("initializePage");
		this.page = page;
		this.raw = raw;
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	const content = document.getElementById("content");
	if (typeof content !== undefined && content !== null) {
		document.dispatchEvent(new InitializePageEvent(content, content.cloneNode(true)));
	}
});

document.addEventListener("initializePage", function(event) {
	const copyButtons = document.getElementsByClassName("copy-latex-formula-buttons");
	for (let i = 0; i < copyButtons.length; i++) {
		const copyButton = copyButtons[i];
		const katex = event.raw.querySelector(`[id="${copyButton.getAttribute("data-target")}"]`).innerText;
		let latex = katex.trim();
		let inline;
		switch (latex[0]) {
			case '\\':
				if (latex[1] == '(') {
					latex = latex.slice(2, latex.length - 2).trim();
					inline = true;
					break;
				}
				else if (latex[1] == '[') {
					latex = latex.slice(2, latex.length - 2).trim();
					inline = false;
					break;
				}
				else {
					console.error(`Unexpected second character during 'copy-buttons' phase! Got: ${latex[1]}, expected: '(' or '['`);
					continue;
				}
			case '$':
				if (latex[1] == '$') {
					latex = latex.slice(2, latex.length - 2).trim();
					inline = true;
				}
				else {
					latex = latex.slice(1, latex.length - 1).trim();
					inline = false;
				}
				break;
			default:
				console.error(`Unexpected first character during 'copy-buttons' phase! Got: ${latex[0]}, expected: '\\' or '$'`);
				continue;
		}

		const buttons = [document.createElement("img"), document.createElement("img") ];
		buttons[0].src = "assets/copy_latex.png";
		buttons[0].onclick = function(event) {
			navigator.clipboard.writeText(inline
				? `\\begin{math} ${latex} \\end{math}`
				: `\\begin{equation} ${latex} \\end{equation}`
			).then(_ => {
				addNotification("Copied to the clipboard!");
			}, reason => {
				addNotification("Failed to copy to the clipboard!");
				console.error(reason);
			});
		};
		buttons[1].src = "assets/copy_mediawiki.png";
		buttons[1].onclick = function(event) {
			navigator.clipboard.writeText(inline
				? `<math display="inline">${latex}</math>`
				: `<math display="block">${latex}</math>`
			).then(_ => {
				addNotification("Copied to the clipboard!");
			}, reason => {
				addNotification("Failed to copy to the clipboard!");
				console.error(reason);
			});
		};

		copyButton.append(buttons[0]);
		copyButton.append(buttons[1]);
	}
});

(function() {
	let clickedOnDropdown = false;
	let currentTab;

	window.onload = function() {
		document.body.prepend((function() {
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
					dropdownImg.src = consts.tabs[i].dropdowns[j].inner.icon;
					dropdownIcon.append(dropdownImg);
					dropdownOption.append(dropdownIcon);

					const dropdownText = document.createElement("div");
					dropdownText.classList.add("dropdown-title");
					dropdownText.innerText = consts.tabs[i].dropdowns[j].inner.name;
					dropdownOption.append(dropdownText);

					dropdownOption.addEventListener("click", function() {
						clickTab(tabs, consts.tabs[i].dropdowns[j].inner);
					});

					dropdown.append(dropdownOption);
				}

				if (dropdownCount == 1) {
					icon.addEventListener("click", function() {
						clickTab(tabs, consts.tabs[i].dropdowns[0].inner);
					});
				}

				const img = document.createElement("img");
				img.style.zIndex = 1;
				img.src = consts.tabs[i].icon;
				icon.append(img);
				icon.append(dropdown);

				tabs.append(icon);
			}
			tabs.onscroll = function() {
				for (let i = 0; i < tabs.children.length; i++) {
					const icon = tabs.children[i];
					const dropdown = icon.children[1];
					dropdown.style.marginTop = -tabs.scrollTop + "px";
				}
			};
			return tabs;
		})());

		function clickTab(tab, dropdown) {
			if (clickedOnDropdown) return;
			clickedOnDropdown = true;

			const content = document.getElementById("content");
			content.innerHTML = dropdown.contents;
			document.dispatchEvent(new InitializePageEvent(content, content.cloneNode(true)));

			if (typeof currentTab !== 'undefined') currentTab.classList.remove('chosen');
			currentTab = tab
			currentTab.classList.add('chosen');

			clickedOnDropdown = false;
		}
	}
})();

function isMobile() {
	const a = navigator.userAgent || navigator.vendor || window.opera;
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetch|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
		return true;
	}
	else {
		return false;
	}
}

function addNotification(text) {
	const notifications = document.getElementById("notifications");
	const notification = document.createElement("div");
	notification.classList.add("notification");
	{
		const contents = document.createElement("div");
		contents.innerText = text;
		notification.append(contents);
	}

	notifications.append(notification);
	for (let i = 0; i < notifications.childNodes.length - 1; i++) {
		const child = notifications.childNodes[i];
		child.animate([
			{ transform: "translateY(" + child.getBoundingClientRect().height + "px)" },
			{ transform: "translateY(0)" }
		], {
			duration: 2000,
			iterations: 1,
			easing: "cubic-bezier(0, 0.99, 0, 1)"
		});
	}

	const animation = notification.animate([
		{ transform: "translateY(20em)" },
		{ transform: "translateY(0)" }
	], {
		duration: 2000,
		iterations: 1,
		easing: "cubic-bezier(0, 0.99, 0, 1)"
	});
	animation.play();
	animation.onfinish = () => {
		const animation = notification.animate([
			{ transform: "translateX(0)" },
			{ transform: "translateX(20em)" }
		], {
			duration: 3000,
			delay: 8000,
			iterations: 1,
			easing: "cubic-bezier(0, 0.99, 0, 1)"
		});
		animation.play();
		animation.onfinish = () => {
			notifications.removeChild(notification);
		};
	};
}
