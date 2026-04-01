(() => {
	let initProductCarouselSliders = () => {
		$(".product-carousel-section").each(function () {
			if ($(this).hasClass("slider_started")) {
				return "";
			}

			$(this).addClass("slider_started");
			let id = $(this).attr("id");
			let slideEl = $(this).find(".swiper-wrapper");
			let productCount = parseInt(slideEl.data("count"));
			let productCountMobile = parseInt(slideEl.data("count-mobile"));

			let prodSwiperParams = {
				loop: false,
				autoHeight: true,
				allowTouchMove: true,
				slidesPerView: productCount,
				lazy: true,
				preloadImages: false,
				spaceBetween: 24,
				navigation: {
					nextEl: `#${id} .swiper-button-next`,
					prevEl: `#${id} .swiper-button-prev`,
				},
			};

			let initProductCarouselSliders = new Swiper(
				`#${id} .product-carousel-swiper`,
				prodSwiperParams
			);

			initProductCarouselSliders.on("resize", function () {
				var windowWidth = window.innerWidth;

				if (productCount == 6) {
					if (windowWidth < 576) {
						this.params.slidesPerView = productCountMobile;
					} else if (windowWidth < 750) {
						this.params.slidesPerView = 2;
					} else if (windowWidth < 1100) {
						this.params.slidesPerView = 3;
					} else if (windowWidth < 1360) {
						this.params.slidesPerView = 4;
					} else if (windowWidth < 1600) {
						this.params.slidesPerView = 5;
					} else {
						this.params.slidesPerView = 6;
					}
				} else if (productCount == 5) {
					if (windowWidth < 576) {
						this.params.slidesPerView = productCountMobile;
					} else if (windowWidth < 750) {
						this.params.slidesPerView = 2;
					} else if (windowWidth < 1100) {
						this.params.slidesPerView = 3;
					} else if (windowWidth < 1360) {
						this.params.slidesPerView = 4;
					} else {
						this.params.slidesPerView = 5;
					}
				} else if (productCount == 4) {
					if (windowWidth < 576) {
						this.params.slidesPerView = productCountMobile;
					} else if (windowWidth < 750) {
						this.params.slidesPerView = 2;
					} else if (windowWidth < 1100) {
						this.params.slidesPerView = 3;
					} else {
						this.params.slidesPerView = 4;
					}
				} else if (productCount == 3) {
					if (windowWidth < 576) {
						this.params.slidesPerView = productCountMobile;
					} else if (windowWidth < 750) {
						this.params.slidesPerView = 2;
					} else {
						this.params.slidesPerView = 3;
					}
				} else if (productCount == 2) {
					if (windowWidth < 576) {
						this.params.slidesPerView = productCountMobile;
					} else {
						this.params.slidesPerView = 2;
					}
				}
			});
		});
	};

	document.addEventListener("shopify:section:load", function () {
		initProductCarouselSliders();
	});

	initProductCarouselSliders();
})();
