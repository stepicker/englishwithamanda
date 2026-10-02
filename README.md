# English with Amanda

This is a static website. Edit the HTML pages and shared CSS/JavaScript directly; there is no compilation step.

- `css/style.css` contains the shared site styles.
- `js/main.js` handles the preloader, mobile navigation, sticky header, scroll-to-top button, animations, and homepage carousels.
- `home-resources.css` styles the homepage testimonials and download cards.
- `about-content.css` styles the About page.
- `home-contact-form.js` validates the homepage contact form; Netlify handles submissions.
- `zoom-confirmation/confirmation.js` reads booking details from the confirmation URL.
- `downloads/` holds the learning PDFs; `img/materials/` holds their previews.

Bootstrap layout, IcoFont icons, AOS animations, jQuery, and the scroll-to-top plugin are shared dependencies. Slick and Swiper load only on the homepage. Calendly and PayPal integrations use their external services.

The unused Edurock demo markup, scripts, assets, original SCSS, and obsolete source map have been removed. The current `css/style.css` is the source of truth for styles.

To preview locally, run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`. Form delivery, Calendly bookings, and payments require their corresponding external services.

Before publishing changes, check the pages at desktop and mobile widths, the mobile menu, all three homepage carousels, contact form validation, confirmation details, and local asset/download links. Hidden form error messages, responsive menus, and confirmation fields are used by the site and should be preserved.
