(function () {
	/* Toggle content */
	$(".product-description-more").click(function (e) {
		e.preventDefault();
		$(this).closest(".product-description-short").next().show();
		$(this).closest(".product-description-short").hide();
	});

	$(".product-description-less").click(function (e) {
		e.preventDefault();
		$(this).closest(".product-description-full").prev().show();
		$(this).closest(".product-description-full").hide();
	});

	/* Toggle fields */
	$(".js-show-more").click(function (e) {
		e.preventDefault();
		$(this).siblings("input").removeClass("hidden");
		$(this).siblings("label").removeClass("hidden");
		$(this).remove();
	});
})();

/* Second floated product form */
class FloatedForm extends HTMLElement {
	constructor() {
		super();
		this.renderForm();
	}

	renderForm() {
		fetch(this.getAttribute("data-product-url"))
			.then((response) => response.text())
			.then((responseText) => {
				const responseHTML = new DOMParser().parseFromString(
					responseText,
					"text/html"
				);
				this.productElement = responseHTML.querySelector(
					'div[id^="ProductInfo-"]'
				);

				this.preventDuplicatedIDs();
				this.removeDOMElements();
				this.setInnerHTML(this, this.productElement.innerHTML);

				if (window.Shopify && Shopify.PaymentButton) {
					Shopify.PaymentButton.init();
				}

				if (window.ProductModel) window.ProductModel.loadShopifyXR();

				this.showMoreFields();
			});
	}

	setInnerHTML(element, html) {
		element.innerHTML = html;

		// Reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
		element.querySelectorAll("script").forEach((oldScriptTag) => {
			const newScriptTag = document.createElement("script");
			Array.from(oldScriptTag.attributes).forEach((attribute) => {
				newScriptTag.setAttribute(attribute.name, attribute.value);
			});
			newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
			oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
		});
	}

	preventDuplicatedIDs() {
		const sectionId = this.productElement.dataset.section;
		this.productElement.innerHTML = this.productElement.innerHTML.replaceAll(
			sectionId,
			`floated-${sectionId}`
		);

		if (this.productElement.querySelectorAll("variant-selects")) {
			this.productElement
				.querySelectorAll("variant-selects")
				.forEach((radio) => {
					radio.dataset.originalSection = sectionId;
				});
		}

		if (this.productElement.querySelectorAll("variant-radios")) {
			this.productElement
				.querySelectorAll("variant-radios")
				.forEach((radio) => {
					radio.dataset.originalSection = sectionId;
				});
		}
	}

	removeDOMElements() {
		const text = this.productElement.querySelector(".product__text");
		if (text) text.remove();

		const shareButtons = this.productElement.querySelector(".share-buttons");
		if (shareButtons) shareButtons.remove();

		const rating = this.productElement.querySelector(".rating");
		if (rating) rating.remove();

		const tags = this.productElement.querySelector(".product-tags");
		if (tags) tags.remove();

		const description = this.productElement.querySelector(
			".product__description"
		);
		if (description) description.remove();

		const advantage = this.productElement.querySelector(".advantage-wrapper");
		if (advantage) advantage.remove();

		const inventory = this.productElement.querySelector(".advantage");
		if (inventory) inventory.remove();

		const note = this.productElement.querySelector(".note");
		if (note) note.remove();

		const promoBanner = this.productElement.querySelector(".promo-banner");
		if (promoBanner) promoBanner.remove();

		const pickupAvailability = this.productElement.querySelector(
			"pickup-availability"
		);
		if (pickupAvailability) pickupAvailability.remove();

		const productModal = this.productElement.querySelector("product-modal");
		if (productModal) productModal.remove();

		const productForm = this.productElement.querySelector("floated-form");
		if (productForm) productForm.remove();

		const relatedProduct = this.productElement.querySelector("related-product");
		if (relatedProduct) relatedProduct.remove();

		const gift = this.productElement.querySelector(".customer");
		if (gift) gift.remove();

		const customLiquid = this.productElement.querySelector(".custom-liquid");
		if (customLiquid) customLiquid.remove();
	}

	showMoreFields() {
		$(".js-show-more").click(function (e) {
			e.preventDefault();
			$(this).siblings("input").removeClass("hidden");
			$(this).siblings("label").removeClass("hidden");
			$(this).remove();
		});
	}
}

customElements.define("floated-form", FloatedForm);

//let sizeBtn = document.querySelector(".pickup-availability-button");
//sizeBtn.addEventListener("click", function () {
//	document.querySelector("size-guide-popup").style.display = "block";

//	document.body.classList.add("overflow-hidden");

//	document.querySelector(".size-guide").style.visibility = "visible";
//});

//let closebtnSize = document.querySelector(".size-guide-close-button");
//closebtnSize.addEventListener("click", function () {
//	document.querySelector("size-guide-popup").style.display = "none";

//	document.body.classList.remove("overflow-hidden");

//	document.querySelector(".size-guide").style.visibility = "hidden";
//});

//	this.onBodyClick = this.handleBodyClick.bind(this);

//	this.querySelector("button").addEventListener("click", () => {
//		this.hide();
//	});

//	this.addEventListener("keyup", () => {
//		if (event.code.toUpperCase() === "ESCAPE") this.hide();
//	});

//handleBodyClick(evt) {
//	const target = evt.target;
//	if (
//		target != this &&
//		!target.closest("size-guide-popup") &&
//		target.id != "ShowSizeGuide"
//	) {
//		this.hide();
//	}
//}

//hide() {
//	this.removeAttribute("open");
//	document.body.removeEventListener("click", this.onBodyClick);
//	document.body.classList.remove("overflow-hidden");
//	removeTrapFocus(this.focusElement);
//	document.querySelector(".size-guide").style.visibility = "hidden";
//}
