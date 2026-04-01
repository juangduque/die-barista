(function () {
	const slideshow = () => {
		$(".product-markers-section").each(function () {
			if ($(this).hasClass("slider_started")) {
				return "";
			}
			$(this).addClass("slider_started");
			const markers = $(this).find(".product-markers__marker");
			const markersSlide = $(this).find(
				".product-markers__marker.swiper-slide"
			);

			if (markersSlide.length != 0) {
				const id = $(this).attr("id");
				const box = $(this).find(".product-markers");
				const autoplay = box.data("autoplay");
				const stopAutoplay = box.data("stop-autoplay");
				const swiper_thumbnail = new Swiper(
					`#${id} .product-markers___thumbnail`,
					{
						slidesPerView: "auto",
					}
				);

				if (autoplay) {
					autoplayParm = {
						autoplay: {
							disableOnInteraction: false,
							delay: box.data("delay") * 1000,
						},
					};
				} else {
					autoplayParm = {};
				}
				let swiperParms = {
					effect: box.data("effect"),
					speed: box.data("speed") * 1000,

					creativeEffect: {
						prev: {
							shadow: false,
							translate: [0, 0, -400],
						},
						next: {
							translate: ["100%", 0, 0],
						},
					},
					coverflowEffect: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: false,
					},
					flipEffect: {
						slideShadows: false,
					},
					loop: true,
					autoHeight: false,
					calculateHeight: false,
					keyboard: true,
					navigation: {
						nextEl: `#${id} .swiper-button-next`,
						prevEl: `#${id} .swiper-button-prev`,
					},
					thumbs: {
						swiper: swiper_thumbnail,
					},
					...autoplayParm,
				};
				const swiper = new Swiper(
					`#${id} .product-markers__swiper`,
					swiperParms
				);

				if (autoplay && !stopAutoplay) {
					document
						.querySelector(`#${id} .product-markers__box`)
						.addEventListener("mouseenter", function () {
							swiper.autoplay.stop();
						});
					document
						.querySelector(`#${id} .product-markers__box`)
						.addEventListener("mouseleave", function () {
							swiper.autoplay.start();
						});
				}
			} else {
				markers.each(function () {
					$(this).click(function () {
						markers.removeClass("active");
						$(this).addClass("active");
					});
				});
			}
		});
	};
	if (window.screen.width >= 990) {
		$(document).click(function (e) {
			const currentMarker = $(this).find(".product-markers__marker-tab");
			const currentIcon = $(this).find(".icon-circle");
			if (!currentMarker.is(e.target) && !currentIcon.is(e.target)) {
				$(`.product-markers__item-inner--desctop`).css({
					visibility: "hidden",
					opacity: 0,
				});
				currentMarker.removeClass("active");
			} else {
				$(`.product-markers__item-inner--desctop`).css({
					visibility: "visible",
					opacity: 1,
				});
			}
		});
	}

	const productMarkers = () =>
		$(document).ready(function () {
			$(`.product-markers__item-inner--desctop`).css({
				visibility: "hidden",
				opacity: 0,
				display: "none",
			});

			$(".product-markers-for-mobile .product-markers__item-inner--mobile").css(
				{
					visibility: "hidden",
					opacity: 0,
					display: "none",
				}
			);

			$(
				`.product-markers-for-mobile .product-markers__item-inner--mobile[data-index='1']`
			).css({
				visibility: "visible",
				opacity: 1,
				display: "block",
			});
			$(".product-markers__marker").click(function (e) {
				//mobile
				$(
					".product-markers-for-mobile .product-markers__item-inner--mobile"
				).css({
					visibility: "hidden",
					opacity: 0,
					display: "none",
				});

				$(
					`.product-markers-for-mobile .product-markers__item-inner--mobile[data-index='${$(
						this
					).data("index")}']`
				).css({
					visibility: "visible",
					opacity: 1,
					display: "block",
				});

				//desctop
				if (window.screen.width >= 990) {
					$(`.product-markers__item-inner--desctop`).css({
						visibility: "hidden",
						opacity: 0,
						display: "none",
					});

					$(
						`.product-markers__item-inner--desctop[data-index='${$(this).data(
							"index"
						)}']`
					).css({ visibility: "visible", opacity: 1, display: "block" });
				}
			});
		});

	document.addEventListener("DOMContentLoaded", function () {
		slideshow();
		productMarkers();
		document.addEventListener("shopify:section:load", function () {
			slideshow();
			productMarkers();
		});
	});
})();

(function () {
	const initTabsWithProducts = () => {
		const tabsParent = $(".tabs-with-products");
		const toggleBtn = tabsParent.find(".twp__toggle");
		const tabs = tabsParent.find(".twp__tabs-item");
		const scrollWrapper = tabsParent.find(".twp__inner-scroll-wrapper");
		const rotateSvg = document.querySelector(".items-container svg");
		const hiddenContentItem = document.querySelector(".twp__content-item");
		document.querySelectorAll(".twp__content-item").forEach((e) => {
			e.classList.add("hidden-content");
		});

		toggleBtn.off("click");
		toggleBtn.on("click", function (e) {
			if ($(this) != e.target) {
				rotateSvg.classList.add("active-svg");
			}
			if ($(this).prev().is(":visible")) {
				$(this).prev().stop().slideUp(300);
				rotateSvg.classList.remove("active-svg");
				document;
				document.querySelectorAll(".twp__content-item").forEach((e) => {
					e.classList.add("hidden-content");
				});
			} else {
				$(this).prev().stop().slideDown(300);
				rotateSvg.classList.add("active-svg");
				document.querySelectorAll(".twp__content-item").forEach((e) => {
					e.classList.remove("hidden-content");
				});
			}
		});

		$(document).on("mouseup", function (e) {
			const elem = $(".twp__inner-scroll-wrapper");

			if (
				!elem.is(e.target) &&
				!elem.next().is(e.target) &&
				elem.has(e.target).length === 0 &&
				elem.next().has(e.target).length === 0
			) {
				elem.hide();
			}
		});
	};

	initTabsWithProducts();

	window.addEventListener("resize", function () {
		initTabsWithProducts();
	});

	document.addEventListener("shopify:section:load", function () {
		initTabsWithProducts();
	});
})();
