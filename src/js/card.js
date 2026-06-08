document.addEventListener('DOMContentLoaded', function () {

    // ── Product tabs ──────────────────────────────────────────────────────
    const tabBtns = document.querySelectorAll('.product-tabs__btn');
    const tabPanels = document.querySelectorAll('.product-tabs__panel');

    if (tabBtns.length) {
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const target = this.dataset.tab;

                tabBtns.forEach(function (b) { b.classList.remove('is-active'); });
                tabPanels.forEach(function (p) { p.classList.remove('is-active'); });

                this.classList.add('is-active');
                const panel = document.querySelector('.product-tabs__panel[data-tab="' + target + '"]');
                if (panel) panel.classList.add('is-active');
            });
        });
    }

    // ── Quantity stepper ─────────────────────────────────────────────────
    const steppers = document.querySelectorAll('.qty-stepper');

    steppers.forEach(function (stepper) {
        const input = stepper.querySelector('input[type="number"]');
        const decBtn = stepper.querySelector('[data-qty="dec"]');
        const incBtn = stepper.querySelector('[data-qty="inc"]');

        if (!input) return;

        if (decBtn) {
            decBtn.addEventListener('click', function () {
                const val = parseInt(input.value, 10) || 1;
                if (val > 1) input.value = val - 1;
            });
        }

        if (incBtn) {
            incBtn.addEventListener('click', function () {
                const val = parseInt(input.value, 10) || 1;
                input.value = val + 1;
            });
        }
    });

    // ── Sticky add-to-cart panel ─────────────────────────────────────────
    const productBuyBlock = document.querySelector('.product-buy');

    if (productBuyBlock) {
        const threshold = productBuyBlock.getBoundingClientRect().bottom + window.scrollY;

        window.addEventListener('scroll', function () {
            const stickyCta = document.querySelector('.product-sticky-cta');
            if (stickyCta) {
                stickyCta.classList.toggle('is-visible', window.scrollY > threshold);
            }
        });
    }
});
