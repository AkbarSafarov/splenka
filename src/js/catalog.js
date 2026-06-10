document.addEventListener('DOMContentLoaded', function () {

    const viewBtns = document.querySelectorAll('[data-view]');
    const catalogGrid = document.querySelector('.catalog-products');

    if (viewBtns.length && catalogGrid) {
        viewBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                viewBtns.forEach(function (b) { b.classList.remove('is-active'); });
                this.classList.add('is-active');
                const view = this.dataset.view;
                catalogGrid.dataset.view = view;
            });
        });
    }

    const sortSelect = document.querySelector('[data-sort]');

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            console.log('sort:', this.value);
        });
    }

    // ── Mobile filter toggle ──────────────────────────────────────────────
    const filterToggleBtn = document.querySelector('.catalog-filter-toggle');
    const filterSidebar = document.querySelector('.catalog-filter');

    if (filterToggleBtn && filterSidebar) {
        filterToggleBtn.addEventListener('click', function () {
            filterSidebar.classList.toggle('is-open');
            document.body.classList.toggle('filter-open');
        });
    }

    // ── Show more products ────────────────────────────────────────────────
    const loadMoreBtn = document.querySelector('[data-load-more]');

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function () {
            console.log('load more');
        });
    }
});
