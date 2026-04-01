(function () {
	const header = () => {
		$("[data-hover-opacity]").hover(
			function () {
				if (
					$(this).hasClass("header__follow") &&
					$(".header-details__search").attr("open")
				) {
					return "";
				}
				const id = $(this).data("hover-opacity");
				$(`[data-hover-opacity=${id}]`).addClass("opacity");
				$(this).removeClass("opacity");
			},
			function () {
				const id = $(this).data("hover-opacity");
				$(`[data-hover-opacity=${id}]`).removeClass("opacity");
			}
		);

		const headerOverlay = document.querySelector(".header__overlay");
		const searchDetails = document.querySelector(".header__search details");
		headerOverlay.addEventListener("click", () => {
			searchDetails.removeAttribute("open");
			document.body.classList.remove("overflow-hidden-search");
		});
	};

	document.addEventListener("shopify:section:load", header);

	header();
})();
