document.addEventListener('DOMContentLoaded', function () {

    const navItems = document.querySelectorAll('.account-nav__item');
    const sections = document.querySelectorAll('.account-section');

    if (navItems.length && sections.length) {
        navItems.forEach(function (item) {
            item.addEventListener('click', function (e) {
                e.preventDefault();

                const target = this.dataset.section;

                navItems.forEach(function (n) { n.classList.remove('is-active'); });
                sections.forEach(function (s) { s.classList.remove('is-active'); });

                this.classList.add('is-active');
                const section = document.querySelector('.account-section[data-section="' + target + '"]');
                if (section) section.classList.add('is-active');
            });
        });
    }

    const orderRows = document.querySelectorAll('.account-order');

    orderRows.forEach(function (row) {
        const toggle = row.querySelector('.account-order__toggle');
        if (!toggle) return;

        toggle.addEventListener('click', function () {
            row.classList.toggle('is-open');
        });
    });

    const profileForm = document.querySelector('.account-profile-form');

    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('profile saved');
        });
    }
});
