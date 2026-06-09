document.addEventListener('DOMContentLoaded', function () {

    var deliveryBlocks = document.querySelectorAll('.order__item-label.block');

    deliveryBlocks.forEach(function (block) {
        var radio = block.querySelector(':scope > input[type="radio"]');
        if (!radio) return;

        radio.addEventListener('change', function () {
            document.querySelectorAll('.order__item-label.block').forEach(function (b) {
                var r = b.querySelector(':scope > input[type="radio"]');
                if (r && r.name === radio.name) {
                    b.classList.remove('active');
                }
            });
            block.classList.add('active');
        });

        var deliveryRow = block.querySelector(':scope > .order__item-radio.delivery');
        if (deliveryRow) {
            deliveryRow.addEventListener('click', function (e) {
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

    document.querySelectorAll('.field-clear-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var input = btn.closest('.order__item-field');
            if (input) input = input.querySelector('input');
            if (input) { input.value = ''; input.focus(); }
        });
    });

});
