document.addEventListener('DOMContentLoaded', function () {

    // ── Delivery type block switching ──────────────────────────────────────
    // Each .order__item-label.block holds one delivery_type radio.
    // Clicking the block's visible area must toggle the .active class.
    var deliveryBlocks = document.querySelectorAll('.order__item-label.block');

    deliveryBlocks.forEach(function (block) {
        var radio = block.querySelector(':scope > input[type="radio"]');
        if (!radio) return;

        // React on the radio's change event (fired by the wrapping <label>)
        radio.addEventListener('change', function () {
            // Deactivate every block that shares the same radio group
            document.querySelectorAll('.order__item-label.block').forEach(function (b) {
                var r = b.querySelector(':scope > input[type="radio"]');
                if (r && r.name === radio.name) {
                    b.classList.remove('active');
                }
            });
            block.classList.add('active');
        });

        // Also handle direct click on the visible delivery row
        // (needed when the label wraps nested labels — browsers may skip the outer)
        var deliveryRow = block.querySelector(':scope > .order__item-radio.delivery');
        if (deliveryRow) {
            deliveryRow.addEventListener('click', function (e) {
                // Don't re-trigger if clicking inside an inner provider block
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            });
        }
    });

    // ── Tooltips ───────────────────────────────────────────────────────────
    if (typeof tippy !== 'undefined') {
        tippy('[data-tippy-content]', {
            placement: 'top',
            theme: 'light',
            maxWidth: 260,
        });
    }

    // ── Location clear button ──────────────────────────────────────────────
    document.querySelectorAll('.field-clear-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var input = btn.closest('.order__item-field');
            if (input) input = input.querySelector('input');
            if (input) { input.value = ''; input.focus(); }
        });
    });

});
