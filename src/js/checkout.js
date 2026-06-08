document.addEventListener('DOMContentLoaded', function () {

    // ── Delivery method toggle ────────────────────────────────────────────
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const addressFields = document.querySelector('.checkout-address-fields');

    if (deliveryRadios.length && addressFields) {
        deliveryRadios.forEach(function (radio) {
            radio.addEventListener('change', function () {
                // Show address fields only for courier delivery
                const showAddress = this.value !== 'pickup';
                addressFields.style.display = showAddress ? '' : 'none';
            });
        });
    }

    // ── Promo code ────────────────────────────────────────────────────────
    const promoInput = document.querySelector('.checkout-promo input');
    const promoBtn = document.querySelector('.checkout-promo button');

    if (promoInput && promoBtn) {
        promoBtn.addEventListener('click', function () {
            const code = promoInput.value.trim();
            if (!code) return;
            // Placeholder: replace with real API call
            console.log('promo code:', code);
        });
    }

    // ── Form validation ───────────────────────────────────────────────────
    const checkoutForm = document.querySelector('.checkout-form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const required = checkoutForm.querySelectorAll('[required]');
            let valid = true;

            required.forEach(function (field) {
                const empty = !field.value.trim();
                field.classList.toggle('is-error', empty);
                if (empty) valid = false;
            });

            if (valid) {
                // Placeholder: submit order via API
                console.log('order submitted');
            }
        });
    }
});
