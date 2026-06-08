document.addEventListener('DOMContentLoaded', function () {

    // ── Contact form ──────────────────────────────────────────────────────
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
                // Placeholder: send message via API
                console.log('message sent');
            }
        });

        // Clear error state on input
        contactForm.querySelectorAll('input, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                this.classList.remove('is-error');
            });
        });
    }

    // ── Store map tabs ────────────────────────────────────────────────────
    const storeTabs = document.querySelectorAll('[data-store-tab]');

    storeTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            storeTabs.forEach(function (t) { t.classList.remove('is-active'); });
            this.classList.add('is-active');
            // Placeholder: update map marker to matching store
        });
    });
});
