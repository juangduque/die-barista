(() => {
	let slideshowSwipers = []; // Store all slideshow Swiper instances

	const initSliders = () => {
		const slideshows = document.querySelectorAll(".slideshow__swiper");
		slideshows.forEach((slideshow) => {
			const autoplay =
				slideshow.getAttribute("data-autoplay") === "true" ? true : false;
			const stopAutoplay =
				slideshow.getAttribute("data-stop-autoplay") === "true" ? false : true;
			if (autoplay) {
				const autoPlayDuration = slideshow.getAttribute("data-duration") + "ms";
				setTimeout(() => {
					slideshow.querySelector("b").style.animationDuration =
						autoPlayDuration;
				}, 100);
			}

			const slideshowSwiper = new Swiper(slideshow, {
				autoHeight: false,
				allowTouchMove: true,
				//pauseOnMouseEnter: stopAutoplay,
				parallax: true,
				pagination: {
					el: ".swiper-pagination",
					clickable: true,
					type: "bullets",
					renderBullet: function (index, className) {
						return (
							'<span class="' +
							className +
							'">' +
							"<em>" +
							(index + 1) +
							"</em>" +
							"<i></i>" +
							"<b></b>" +
							"</span>"
						);
					},
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
				on: {
					init: function () {
						slideshowSwipers.push(this); // Store the Swiper instance
					},
					slideChange: function () {
						if (autoplay) {
							const bullets = slideshow.querySelectorAll(
								".swiper-pagination-bullet"
							);
							const activeIndex = this.realIndex;
							bullets.forEach((bullet, index) => {
								bullet.classList.toggle(
									"swiper-pagination-bullet-active",
									index === activeIndex
								);
								const autoPlayDuration =
									slideshow.getAttribute("data-duration") + "ms";
								setTimeout(() => {
									bullet.querySelector("b").style.animationDuration =
										autoPlayDuration;
								}, 100);
							});
						}
					},
					slideChangeTransitionEnd: function () {
						if (autoplay) {
							slideshowSwipers.forEach((swiper) => {
								swiper.autoplay.start();
								swiper.autoplay.running = true;

								setTimeout(() => {
									document.querySelector(
										".swiper-pagination-bullet-active b"
									).style.display = "block";
								}, 50);
							});
						}
					},
				},
			});

			if (autoplay) {
				slideshowSwiper.autoplay.start();
				slideshowSwiper.autoplay.running = true;

				slideshow.addEventListener("mouseenter", () => {
					slideshowSwipers.forEach((swiper) => {
						if (stopAutoplay) {
							swiper.autoplay.stop();
							swiper.autoplay.running = false;

							setTimeout(() => {
								document.querySelector(
									".swiper-pagination-bullet-active b"
								).style.display = "none";
							}, 50);
						}
					});
				});
				slideshow.addEventListener("mouseleave", () => {
					slideshowSwipers.forEach((swiper) => {
						if (stopAutoplay) {
							swiper.autoplay.start();
							swiper.autoplay.running = true;

							setTimeout(() => {
								document.querySelector(
									".swiper-pagination-bullet-active b"
								).style.display = "block";
							}, 50);
						}
					});
				});
			}

			if (slideshowSwiper.slides.length < 2) {
				slideshowSwiper.allowTouchMove = false;
			} else {
				slideshowSwiper.allowTouchMove = true;
			}

			if (slideshowSwiper.slides.length > 1) {
				slideshow.classList.add("slideshow__swiper--multiple-slides");
			}
		});
	};

	initSliders();

	document.addEventListener("shopify:section:load", function () {
		initSliders();
	});
})();
