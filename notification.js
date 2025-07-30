class NotificationManager {
    SUCCESS_CODE = 0;
    ERROR_CODE = 1;

    streak = 0;
    last = 0;

	addNotification(text, code = this.SUCCESS_CODE) {
        if (this.streak === 5) {
            text = `Rampage!`;
        }
        else if (this.streak === 8) {
            text = `Scandalous!`;
        }
        else if (this.streak === 14) {
            text = `Overpowered!`;
        }
        else if (this.streak === 20) {
            text = `Began a notification clicker career!`;
        }
        else if (this.streak > 20) {
            text = `Current clicks: ${this.streak - 20}`;
        }

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

        if (code === this.SUCCESS_CODE && (new Date() - this.last) / 1000 < 2) {
            this.streak = this.streak + 1;
        }
        else {
            this.streak = 0;
        }
        this.last = new Date();
	}
}