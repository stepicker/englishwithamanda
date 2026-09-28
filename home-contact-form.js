(function () {
    'use strict';

    var form = document.getElementById('home-contact-form');
    if (!form) return;

    var error = document.getElementById('home-contact-error');
    var fields = ['name', 'email', 'message'].map(function (name) {
        return form.elements.namedItem(name);
    });

    // Use the shared inline error instead of browser validation bubbles.
    form.noValidate = true;
    form.addEventListener('submit', function (event) {
        var invalid = false;
        fields.forEach(function (field) {
            var value = field.value.trim();
            var valid = value.length > 0;
            if (field.name === 'email') {
                field.value = value;
                valid = valid && /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value) && field.validity.valid;
            }
            if (valid) {
                field.removeAttribute('aria-invalid');
                field.removeAttribute('aria-describedby');
            } else {
                field.setAttribute('aria-invalid', 'true');
                field.setAttribute('aria-describedby', error.id);
                invalid = true;
            }
        });

        error.hidden = !invalid;
        if (invalid) event.preventDefault();
    });
}());
