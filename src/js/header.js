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
    const searchOverlayList    = header.querySelector('.js-search-overlay-list');
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
        const cats    = catalogMenu.querySelectorAll('.catalog-menu__cat[data-cat]');
        const panels  = catalogMenu.querySelectorAll('.catalog-menu__panel[data-panel]');
        const inner   = catalogMenu.querySelector('.catalog-menu__inner');
        const content = catalogMenu.querySelector('.catalog-menu__content');

        function isMobile() { return window.innerWidth <= 767; }

        // ── Back button (injected once) ──────────────────────────────────────
        let backBtn = null;
        if (content) {
            backBtn = document.createElement('button');
            backBtn.type = 'button';
            backBtn.className = 'catalog-menu__back';
            backBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Назад';
            content.insertBefore(backBtn, content.firstChild);

            backBtn.addEventListener('click', function () {
                if (inner) inner.classList.remove('panel-open');
                cats.forEach(function (c) { c.classList.remove('is-active'); });
                panels.forEach(function (p) { p.hidden = true; p.classList.remove('is-active'); });
            });
        }

        function activatePanel(catEl) {
            const key = catEl.dataset.cat;
            cats.forEach(function (c) { c.classList.remove('is-active'); });
            panels.forEach(function (p) { p.hidden = true; p.classList.remove('is-active'); });
            catEl.classList.add('is-active');
            const panel = catalogMenu.querySelector('.catalog-menu__panel[data-panel="' + key + '"]');
            if (panel) { panel.hidden = false; panel.classList.add('is-active'); }
        }

        const firstActive = catalogMenu.querySelector('.catalog-menu__cat.is-active') || cats[0];
        if (firstActive) {
            panels.forEach(function (p) { p.hidden = true; });
            activatePanel(firstActive);
        }

        cats.forEach(function (cat) {
            cat.addEventListener('mouseenter', function () {
                if (!isMobile()) activatePanel(this);
            });

            cat.addEventListener('click', function (e) {
                if (!isMobile()) return;
                const arrow = cat.querySelector('.catalog-menu__cat-arrow');
                if (!arrow || !e.target.closest('.catalog-menu__cat-arrow')) return;
                e.preventDefault();
                activatePanel(cat);
                if (inner) inner.classList.add('panel-open');
                if (catalogMenu) catalogMenu.scrollTop = 0;
            });
        });

        catalogBtn.addEventListener('click', function () {
            const isOpen = !catalogMenu.hidden;
            closeAll();
            if (!isOpen) {
                show(catalogMenu);
                show(backdrop);
                catalogBtn.classList.add('is-active');
                catalogBtn.setAttribute('aria-expanded', 'true');

                if (!isMobile()) {
                    const active = catalogMenu.querySelector('.catalog-menu__cat.is-active') || cats[0];
                    if (active) activatePanel(active);
                } else {
                    if (inner) inner.classList.remove('panel-open');
                    panels.forEach(function (p) { p.hidden = true; p.classList.remove('is-active'); });
                    cats.forEach(function (c) { c.classList.remove('is-active'); });
                }
            }
        });
    }

    if (searchToggle) {
        searchToggle.addEventListener('click', function () {
            const isOpen = searchOverlay && !searchOverlay.hidden;
            closeAll();
            if (!isOpen) openSearchOverlay('');
        });
    }

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
        const len = val.length;
        // empty → show categories; 2-3 chars → list; 4+ → columns
        if (searchOverlayEmpty)   searchOverlayEmpty.hidden   = len >= 2;
        if (searchOverlayList)    searchOverlayList.hidden    = len < 2 || len >= 4;
        if (searchOverlayResults) searchOverlayResults.hidden = len < 4;
        if (searchOverlayClear)   searchOverlayClear.hidden   = !len;
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
