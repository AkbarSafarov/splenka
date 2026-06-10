document.addEventListener('DOMContentLoaded', function () {

    const removeButtons = document.querySelectorAll('[data-compare-remove]');

    removeButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const col = this.closest('[data-compare-col]');
            if (!col) return;

            const colIndex = Array.from(col.parentElement.children).indexOf(col);

            document.querySelectorAll('.comparison-table__row').forEach(function (row) {
                const cells = row.querySelectorAll('[data-compare-col]');
                if (cells[colIndex]) cells[colIndex].remove();
            });
        });
    });

    const diffToggle = document.querySelector('[data-compare-diff]');

    if (diffToggle) {
        diffToggle.addEventListener('change', function () {
            const rows = document.querySelectorAll('.comparison-table__row--spec');

            rows.forEach(function (row) {
                const cells = row.querySelectorAll('.comparison-table__cell--value');
                const values = Array.from(cells).map(function (c) { return c.textContent.trim(); });
                const allSame = values.every(function (v) { return v === values[0]; });
                row.style.display = (diffToggle.checked && allSame) ? 'none' : '';
            });
        });
    }

    const tableWrapper = document.querySelector('.comparison-table-wrapper');

    if (tableWrapper) {
        const stickyHead = document.querySelector('.comparison-table__sticky-head');

        if (stickyHead) {
            tableWrapper.addEventListener('scroll', function () {
                stickyHead.scrollLeft = this.scrollLeft;
            });
        }
    }
});
