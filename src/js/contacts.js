document.addEventListener('DOMContentLoaded', function () {

    const contactForm = document.querySelector('.contacts-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const required = this.querySelectorAll('[required]');
            let valid = true;

            required.forEach(function (field) {
                const empty = !field.value.trim();
                field.classList.toggle('is-error', empty);
                if (empty) valid = false;
            });

            if (valid) {
                console.log('message sent');
            }
        });

        contactForm.querySelectorAll('input, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                this.classList.remove('is-error');
            });
        });
    }

    const storeTabs = document.querySelectorAll('[data-store-tab]');

    storeTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            storeTabs.forEach(function (t) { t.classList.remove('is-active'); });
            this.classList.add('is-active');
        });
    });
});
