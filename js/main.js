(function($) {
    "use strict";

    //preloader
    $(window).on( 'load', function() {
        $("#back__preloader").delay(1000).fadeOut(400);
    })

    jQuery(document).ready(function() {

        /*====== mobile off canvas active ======*/
        function headermobileAside() {
            var navbarTrigger = $('.mobile-aside-button'),
                endTrigger = $('.mobile-aside-close'),
                container = $('.mobile-off-canvas-active');
            navbarTrigger.on('click', function(e) {
                e.preventDefault();
                container.addClass('inside');
            });
            endTrigger.on('click', function() {
                container.removeClass('inside');
            });
        };
        headermobileAside();

        /*---------------------
            mobile-menu
        --------------------- */
        var $offCanvasNav = $('.mobile-menu'),
            $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');
        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
        /*Close Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.slideUp();
        /*Category Sub Menu Toggle*/
        $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
            var $this = $(this);
            if ((($this.parent().attr('class') || '').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active');
                    $this.siblings('ul').slideUp();
                } else {
                    $this.parent('li').addClass('active');
                    $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.siblings('ul').slideDown();
                }
            }
        });

        // mobile__menu__end

        // scrollToTop
        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            topDistance: '300', // Distance from top before showing element (px)
            topSpeed: 300, // Speed back to top (ms)
            animation: 'fade', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '<i class="icofont-rounded-up"></i>', // Text for element
            activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        });

        // Reserve the header's space so fixing it cannot shorten the page
        // and push the scroll position back across the sticky threshold.
        var stickyHeaders = document.querySelectorAll('.header__sticky');
        stickyHeaders.forEach(function(header) {
            var wrapper = header.parentElement;
            function reserveHeaderSpace() {
                wrapper.style.height = header.getBoundingClientRect().height + 'px';
            }
            reserveHeaderSpace();
            if ('ResizeObserver' in window) {
                new ResizeObserver(reserveHeaderSpace).observe(header);
            } else {
                $(window).on('resize load', reserveHeaderSpace);
            }
        });

        function updateStickyHeaders() {
            var isSticky = $(window).scrollTop() >= 245;
            stickyHeaders.forEach(function(header) {
                header.classList.toggle('sticky', isSticky);
            });
        }
        $(window).on('scroll', updateStickyHeaders);
        updateStickyHeaders();

        if ($('.materials-slider').length) $('.materials-slider').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            appendArrows: $('.materials-controls'),
            prevArrow: '<button type="button" class="prev_class" aria-label="Previous materials"><i class="icofont-long-arrow-left" aria-hidden="true"></i></button>',
            nextArrow: '<button type="button" class="next_class" aria-label="Next materials"><i class="icofont-long-arrow-right" aria-hidden="true"></i></button>',
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 576, settings: { slidesToShow: 1 } }
            ]
        });
        if ($('.testimonial__slider__active__3').length) $('.testimonial__slider__active__3').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            adaptiveHeight: false,
            prevArrow: '<button type="button" class="prev_class" aria-label="Previous review"><i class="icofont-long-arrow-left" aria-hidden="true"></i></button>',
            nextArrow: '<button type="button" class="next_class" aria-label="Next review"><i class="icofont-long-arrow-right" aria-hidden="true"></i></button>',
            responsive: [{
                    breakpoint: 1367,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 321,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]

        });

        /* ----------------------------
            AOS Scroll Animation
        -------------------------------*/
        AOS.init({
            offset: 40,
            duration: 1000,
            once: true,
            easing: 'ease',
        });

    });
})(jQuery);

if (document.querySelector('.featured__course')) {
new Swiper(".featured__course", {
    grabCursor: true,
    navigation: {
        nextEl: ".ewa-featured-course-next",
        prevEl: ".ewa-featured-course-prev",
    },
    slidesPerView: 1,
    breakpoints: {
        575: {
          slidesPerView: 2,
        },

        768: {
          slidesPerView: 2,
        },

        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3
        },
        1500: {
            slidesPerView: 4
        }
    },
});

}
