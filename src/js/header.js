document.addEventListener('DOMContentLoaded', function () {

    // ── Elements ───────────────────────────────────────────────────────────────
    const header        = document.querySelector('.header');
    if (!header) return;

    const backdrop      = header.querySelector('.js-header-backdrop');
    const catalogBtn    = header.querySelector('.js-catalog-open');
    const catalogMenu   = header.querySelector('.js-catalog-menu');
    const searchToggle  = header.querySelector('.js-search-toggle');
    const searchWrap    = header.querySelector('.js-search-wrap');
    const searchInput   = header.querySelector('.js-search-input');
    const searchDrop    = header.querySelector('.js-search-drop');
    const accountToggle = header.querySelector('.js-account-toggle');
    const accountDrop   = header.querySelector('.js-account-drop');
    const cartToggle    = header.querySelector('.js-cart-toggle');
    const cartDrop      = header.querySelector('.js-cart-drop');
    const searchOverlay      = header.querySelector('.js-search-overlay');
    const searchOverlayClose = header.querySelector('.js-search-overlay-close');
    const searchOverlayInput = header.querySelector('.js-search-overlay-input');
    const searchOverlayClear = header.querySelector('.js-search-overlay-clear');
    const searchOverlayEmpty   = header.querySelector('.js-search-overlay-empty');
    const searchOverlayResults = header.querySelector('.js-search-overlay-results');
    const accountLogin  = header.querySelector('.js-account-login');
    const accountUser   = header.querySelector('.js-account-user');
    const accountLogout = header.querySelector('.js-account-logout');

    // ── Helpers ────────────────────────────────────────────────────────────────
    function show(el) { if (el) el.hidden = false; }
    function hide(el) { if (el) el.hidden = true; }

    function closeAll() {
        hide(catalogMenu);
        hide(searchOverlay);
        hide(accountDrop);
        hide(cartDrop);
        hide(backdrop);

        if (searchWrap)    searchWrap.classList.remove('is-open');
        if (searchDrop)    hide(searchDrop);

        [catalogBtn, searchToggle, accountToggle, cartToggle].forEach(function (btn) {
            if (btn) {
                btn.classList.remove('is-active');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ── Catalog mega menu ──────────────────────────────────────────────────────
    if (catalogBtn && catalogMenu) {
        const cats   = catalogMenu.querySelectorAll('.catalog-menu__cat[data-cat]');
        const panels = catalogMenu.querySelectorAll('.catalog-menu__panel[data-panel]');

        function activatePanel(catEl) {
            const key = catEl.dataset.cat;
            cats.forEach(function (c) { c.classList.remove('is-active'); });
            panels.forEach(function (p) { p.hidden = true; p.classList.remove('is-active'); });
            catEl.classList.add('is-active');
            const panel = catalogMenu.querySelector('.catalog-menu__panel[data-panel="' + key + '"]');
            if (panel) { panel.hidden = false; panel.classList.add('is-active'); }
        }

        // init first active panel
        const firstActive = catalogMenu.querySelector('.catalog-menu__cat.is-active') || cats[0];
        if (firstActive) {
            panels.forEach(function (p) { p.hidden = true; });
            activatePanel(firstActive);
        }

        cats.forEach(function (cat) {
            cat.addEventListener('mouseenter', function () { activatePanel(this); });
        });

        catalogBtn.addEventListener('click', function () {
            const isOpen = !catalogMenu.hidden;
            closeAll();
            if (!isOpen) {
                show(catalogMenu);
                show(backdrop);
                catalogBtn.classList.add('is-active');
                catalogBtn.setAttribute('aria-expanded', 'true');
                const active = catalogMenu.querySelector('.catalog-menu__cat.is-active') || cats[0];
                if (active) activatePanel(active);
            }
        });
    }

    // ── Inline search ──────────────────────────────────────────────────────────
    if (searchToggle && searchWrap) {
        searchToggle.addEventListener('click', function () {
            const isOpen = searchWrap.classList.contains('is-open');
            closeAll();
            if (!isOpen) {
                searchWrap.classList.add('is-open');
                searchToggle.classList.add('is-active');
                searchToggle.setAttribute('aria-expanded', 'true');
                show(backdrop);
                setTimeout(function () { if (searchInput) searchInput.focus(); }, 260);
            }
        });
    }

    if (searchInput && searchDrop) {
        searchInput.addEventListener('input', function () {
            if (this.value.trim().length >= 2) {
                show(searchDrop);
            } else {
                hide(searchDrop);
            }
        });

        // Enter → open full overlay
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                openSearchOverlay(this.value.trim());
            }
        });
    }

    if (searchWrap) {
        searchWrap.addEventListener('submit', function (e) {
            e.preventDefault();
            openSearchOverlay(searchInput ? searchInput.value.trim() : '');
        });
    }

    // ── Search overlay (full) ──────────────────────────────────────────────────
    function openSearchOverlay(query) {
        closeAll();
        show(searchOverlay);
        show(backdrop);
        if (searchToggle) {
            searchToggle.classList.add('is-active');
            searchToggle.setAttribute('aria-expanded', 'true');
        }
        if (searchOverlayInput) {
            searchOverlayInput.value = query || '';
            setTimeout(function () { searchOverlayInput.focus(); }, 50);
        }
        updateOverlayState(query || '');
    }

    function updateOverlayState(val) {
        const hasQuery = val.length >= 2;
        if (searchOverlayEmpty)   searchOverlayEmpty.hidden   = hasQuery;
        if (searchOverlayResults) searchOverlayResults.hidden = !hasQuery;
        if (searchOverlayClear)   searchOverlayClear.hidden   = !val.length;
    }

    if (searchOverlayInput) {
        searchOverlayInput.addEventListener('input', function () {
            updateOverlayState(this.value.trim());
        });
    }

    if (searchOverlayClear) {
        searchOverlayClear.addEventListener('click', function () {
            if (searchOverlayInput) { searchOverlayInput.value = ''; searchOverlayInput.focus(); }
            updateOverlayState('');
        });
    }

    if (searchOverlayClose) {
        searchOverlayClose.addEventListener('click', closeAll);
    }

    // ── Account dropdown ───────────────────────────────────────────────────────
    if (accountToggle && accountDrop) {
        accountToggle.addEventListener('click', function () {
            const isOpen = !accountDrop.hidden;
            closeAll();
            if (!isOpen) {
                show(accountDrop);
                show(backdrop);
                accountToggle.classList.add('is-active');
                accountToggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    if (accountLogout) {
        accountLogout.addEventListener('click', function () {
            show(accountLogin);
            hide(accountUser);
        });
    }

    // ── Cart dropdown ──────────────────────────────────────────────────────────
    if (cartToggle && cartDrop) {
        cartToggle.addEventListener('click', function () {
            const isOpen = !cartDrop.hidden;
            closeAll();
            if (!isOpen) {
                show(cartDrop);
                show(backdrop);
                cartToggle.classList.add('is-active');
                cartToggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    // ── Close on backdrop / Escape / outside click ─────────────────────────────
    if (backdrop) backdrop.addEventListener('click', closeAll);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAll();
    });

    document.addEventListener('click', function (e) {
        if (!header.contains(e.target)) closeAll();
    });
});
