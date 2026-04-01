(function () {
	let swiperInformationBar;
	const informationBarSwipeEnabled = document.querySelector(
		".swiper--information-bar"
	);

	const addClasses = () => {
		const slides = document.querySelectorAll(".information-bar__link");
		slides.forEach((slide) => {
			slide.classList.add("swiper-slide");
		});
	};

	const initInformationBarSlider = () => {
		swiperInformationBar = new Swiper(".swiper--information-bar", {
			loop: true,
			autoplay: true,
			slidesPerView: 1,
			slidesPerGroup: 1,
		});
	};

	const destroySlider = () => {
		const slides = document.querySelectorAll(".information-bar__link");

		if (Array.isArray(swiperInformationBar)) {
			swiperInformationBar.forEach((swiper) => {
				swiper.destroy(true, true);
			});
		} else {
			swiperInformationBar.destroy(true, true);
		}
		swiperInformationBar = null;

		slides.forEach((slide) => {
			slide.removeAttribute("style");
			slide.classList.remove("swiper-slide");
		});
	};

	const initInformationBar = () => {
		const informationBarSection = document.querySelector(
			".information-bar-section"
		);

		const sectionResizeObserver = new ResizeObserver((entries) => {
			const [entry] = entries;

			if (entry.contentRect.width < 751 && informationBarSwipeEnabled) {
				addClasses();
				initInformationBarSlider();
			} else if (swiperInformationBar) {
				destroySlider();
			}
		});

		sectionResizeObserver.observe(informationBarSection);
	};

	if (swiperInformationBar) {
		destroySlider();
	}
	addClasses();
	initInformationBar();
	initInformationBarSlider();

	document.addEventListener("shopify:section:load", function () {
		if (swiperInformationBar) {
			destroySlider();
		}
		addClasses();
		initInformationBar();
		initInformationBarSlider();
	});
})();
