class DetailsModal extends HTMLElement {
	constructor() {
		super();
		this.detailsContainer = this.querySelector("details");
		this.summaryToggle = this.querySelector("summary");
		this.headerBottom = document.querySelector(".header__bottom");

		this.detailsContainer.addEventListener(
			"keyup",
			(event) => event.code === "Escape" && this.close()
		);
		this.summaryToggle.addEventListener(
			"click",
			this.onSummaryClick.bind(this)
		);
		this.querySelector('button[type="button"]').addEventListener(
			"click",
			this.close.bind(this)
		);

		this.summaryToggle.setAttribute("role", "button");
		this.summaryToggle.setAttribute("aria-expanded", "false");
	}

	isOpen() {
		return this.detailsContainer.hasAttribute("open");
	}

	onSummaryClick(event) {
		event.preventDefault();
		event.target.closest("details").hasAttribute("open")
			? this.close()
			: this.open(event);
	}

	onBodyClick(event) {
		if (!this.contains(event.target)) this.close(false);
	}

	open(event) {
		this.onBodyClickEvent =
			this.onBodyClickEvent || this.onBodyClick.bind(this);
		event.target.closest("details").setAttribute("open", true);
		document.body.addEventListener("click", this.onBodyClickEvent);

		trapFocus(
			this.detailsContainer.querySelector('[tabindex="-1"]'),
			this.detailsContainer.querySelector('input:not([type="hidden"])')
		);

		if (
			event.target
				.closest("details")
				.classList.contains("header-details__search")
		) {
			if (this.headerBottom) {
				this.headerBottom.classList.add(
					event.target.closest("details").dataset.bg
				);
			}

			document.body.classList.add("overflow-hidden-search");
		}
	}

	close(focusToggle = true) {
		removeTrapFocus(focusToggle ? this.summaryToggle : null);
		this.detailsContainer.removeAttribute("open");
		document.body.removeEventListener("click", this.onBodyClickEvent);
		document.body.classList.remove("overflow-hidden");
		document.body.classList.remove("overflow-hidden-search");

		if (this.detailsContainer.classList.contains("header-details__search")) {
			if (this.headerBottom) {
				this.headerBottom.classList.remove(this.detailsContainer.dataset.bg);
				this.headerBottom.classList.add("color-background-1");
			}
		}
	}
}

customElements.define("details-modal", DetailsModal);
