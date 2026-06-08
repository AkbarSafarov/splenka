document.addEventListener("DOMContentLoaded", function() {

    const body = document.body;
    const html = document.documentElement;
    const overflowHidden = 'oveflowHidden';
    const menuBurger = document.querySelector('.menu_burger');
    const header = document.querySelector('.header');

    
    function updateStickerHeight() {
        const header = document.querySelector('.header');
        if (header) {
            const height = header.offsetHeight;
            document.documentElement.style.setProperty('--v-header-height', `${height}px`);
        } 
    }

    updateStickerHeight();
    
    window.addEventListener('resize', function() {
        updateStickerHeight();
    });

    function accordion() {
        const accordionRows = document.querySelectorAll('.accordion_row');
        
        if (!accordionRows || accordionRows.length === 0) {
            return;
        }

        function closeAllAccordions() {
            accordionRows.forEach(row => {
                row.classList.remove('opened');
            });
        }
        function toggleAccordion(accordionRow) {
            const isOpened = accordionRow.classList.contains('opened');
            
            closeAllAccordions();
            
            if (!isOpened) {
                accordionRow.classList.add('opened');
            }
        }

        accordionRows.forEach(row => {
            const accordionBtn = row.querySelector('.accordion_btn');
            
            if (accordionBtn) {
                accordionBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); 
                    toggleAccordion(row);
                });
            }

            const accordionBody = row.querySelector('.accordion_body');
            if (accordionBody) {
                accordionBody.addEventListener('click', function(e) {
                    e.stopPropagation(); 
                });
            }
        });

        document.addEventListener('click', function(e) {
            const isClickInsideAccordion = Array.from(accordionRows).some(row => {
                return row.contains(e.target);
            });

            if (!isClickInsideAccordion) {
                closeAllAccordions();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                closeAllAccordions();
            }
        });

        const resetButtons = document.querySelectorAll('.accordion_body_btn .btn_button.border');
        if (resetButtons && resetButtons.length > 0) {
            resetButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const accordionBody = this.closest('.accordion_body');
                    
                    if (accordionBody) {
                        const checkboxes = accordionBody.querySelectorAll('input[type="checkbox"]');
                        if (checkboxes && checkboxes.length > 0) {
                            checkboxes.forEach(checkbox => {
                                checkbox.checked = false;
                            });
                        }

                        const radios = accordionBody.querySelectorAll('input[type="radio"]');
                        if (radios && radios.length > 0) {
                            radios.forEach(radio => {
                                radio.checked = false;
                            });
                        }

                        const priceInputs = accordionBody.querySelectorAll('.price_feild input');
                        if (priceInputs && priceInputs.length > 0) {
                            priceInputs.forEach(input => {
                                input.value = '';
                            });
                        }

                        // Обновляем счетчик
                        const accordionRow = accordionBody.closest('.accordion_row');
                        if (accordionRow) {
                            updateCounter(accordionRow);
                        }
                    }
                });
            });
        }

        const showButtons = document.querySelectorAll('.accordion_body_btn .btn_button.black');
        if (showButtons && showButtons.length > 0) {
            showButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const accordionRow = this.closest('.accordion_row');
                    
                    if (accordionRow) {
                        updateCounter(accordionRow);
                        
                        accordionRow.classList.remove('opened');
                    }
                });
            });
        }

        function updateCounter(accordionRow) {
            if (!accordionRow || !accordionRow.classList.contains('add')) {
                return;
            }

            const checkboxes = accordionRow.querySelectorAll('input[type="checkbox"]:checked');
            const counter = accordionRow.querySelector('.accordion_btn .count');
            
            if (counter) {
                const count = checkboxes ? checkboxes.length : 0;
                if (count > 0) {
                    counter.textContent = ` ${count}`;
                    counter.style.display = 'inline';
                } else {
                    counter.textContent = '';
                    counter.style.display = 'none';
                }
            }
        }

        const allCheckboxes = document.querySelectorAll('.accordion_row.add input[type="checkbox"]');
        if (allCheckboxes && allCheckboxes.length > 0) {
            allCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const accordionRow = this.closest('.accordion_row');
                    if (accordionRow) {
                        updateCounter(accordionRow);
                    }
                });
            });
        }

        accordionRows.forEach(row => {
            if (row.classList.contains('add')) {
                updateCounter(row);
            }
        });
    }

    function showCheckbox(){
        const MAX_VISIBLE_ITEMS = 5;

        const filterFields = document.querySelectorAll('.filter_field');

        if (!filterFields || filterFields.length === 0) {
            return;
        }

        filterFields.forEach(filterField => {
            const innerField = filterField.querySelector('.inner_field');
            
            if (!innerField) {
                return;
            }

            const checkboxFields = innerField.querySelectorAll('.checkbox_field');
            
            if (!checkboxFields || checkboxFields.length <= MAX_VISIBLE_ITEMS) {
                return;
            }

            checkboxFields.forEach((checkbox, index) => {
                if (index >= MAX_VISIBLE_ITEMS) {
                    checkbox.style.display = 'none';
                    checkbox.classList.add('hidden-checkbox');
                }
            });

            const showMoreBtn = document.createElement('button');
            showMoreBtn.className = 'show_more_btn';
            showMoreBtn.type = 'button';
            showMoreBtn.innerHTML = `
                <i class="bi bi-chevron-down"></i>
                <span class="show-text">Показать все</span>
                <span class="hide-text" style="display: none;">Скрыть</span>
                
            `;

            innerField.appendChild(showMoreBtn);

            showMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isExpanded = this.classList.contains('expanded');
                const hiddenCheckboxes = innerField.querySelectorAll('.checkbox_field.hidden-checkbox');
                const showText = this.querySelector('.show-text');
                const hideText = this.querySelector('.hide-text');
                const icon = this.querySelector('.bi');

                if (isExpanded) {
                    hiddenCheckboxes.forEach(checkbox => {
                        checkbox.style.display = 'none';
                    });
                    
                    showText.style.display = 'inline';
                    hideText.style.display = 'none';
                    icon.style.transform = 'rotate(0deg)';
                    this.classList.remove('expanded');
                } else {
                    hiddenCheckboxes.forEach(checkbox => {
                        checkbox.style.display = 'block';
                    });
                    
                    showText.style.display = 'none';
                    hideText.style.display = 'inline';
                    icon.style.transform = 'rotate(180deg)';
                    this.classList.add('expanded');
                }
            });
        });
    }

    accordion();
    showCheckbox();
    catalogMenu();

    function catalogMenu() {
        const btn = document.querySelector('.catalog_btn');
        const menu = document.getElementById('catalogMenu');
        if (!btn || !menu) return;

        // Create backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'catalog-menu-backdrop';
        document.body.appendChild(backdrop);

        function open() {
            menu.classList.add('is-open');
            backdrop.classList.add('is-open');
            btn.classList.add('is-active');
        }

        function close() {
            menu.classList.remove('is-open');
            backdrop.classList.remove('is-open');
            btn.classList.remove('is-active');
        }

        function toggle() {
            menu.classList.contains('is-open') ? close() : open();
        }

        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggle();
        });

        backdrop.addEventListener('click', close);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') close();
        });

        // Category hover: activate panel
        const cats = menu.querySelectorAll('.catalog-menu__cat[data-cat]');
        const panels = menu.querySelectorAll('.catalog-menu__panel[data-panel]');

        function activateCat(catEl) {
            const cat = catEl.dataset.cat;
            cats.forEach(c => c.classList.remove('is-active'));
            panels.forEach(p => p.classList.remove('is-active'));
            catEl.classList.add('is-active');
            const panel = menu.querySelector(`.catalog-menu__panel[data-panel="${cat}"]`);
            if (panel) panel.classList.add('is-active');
        }

        cats.forEach(cat => {
            cat.addEventListener('mouseenter', function() {
                activateCat(this);
            });
        });

        // Activate "faucets" by default on open
        btn.addEventListener('click', function() {
            if (menu.classList.contains('is-open')) {
                const defaultCat = menu.querySelector('.catalog-menu__cat[data-cat="faucets"]');
                if (defaultCat) activateCat(defaultCat);
            }
        });
    }

    const cardGallery = document.querySelector('.gallery-thumbs');

    if (cardGallery) {
        const thumbsSwiper = new Swiper('.gallery-thumbs', {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 16,
            watchSlidesProgress: true,
            breakpoints: {
                992: {
                    direction: 'vertical'
                },
                0: {
                    direction: 'horizontal'
                }
            }
        });
        
        const mainSwiper = new Swiper('.gallery-main', {
            spaceBetween: 10,
            thumbs: {
                swiper: thumbsSwiper
            }
        });
    }
        
    
    const colorOptions = document.querySelectorAll('.color-option');

    if(colorOptions.length) {
        const colorLabel = document.querySelector('.color-label span');

        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                colorLabel.textContent = option.getAttribute('title');
            });
        });

    }

    const favoriteAdds = document.querySelectorAll('.favorite_add');

    if(favoriteAdds.length) {
        favoriteAdds.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }

    const compareAdds = document.querySelectorAll('.compare_add');

    if(compareAdds.length) {
        compareAdds.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }

    const buyBtn = document.querySelectorAll('.buy_btn');

    if(buyBtn.length) {
        buyBtn.forEach(btn => {
            btn.addEventListener('click', function() {
                const wrap = btn.closest('.product-actions');
                if(wrap) {
                    wrap.classList.add('active');
                }
                this.classList.toggle('active');
            });
        });
    }

    const amountBlock = document.querySelectorAll('.amount_block');

    if(amountBlock.length) {
        amountBlock.forEach(block => {
            const minus = block.querySelector('.minus');
            const plus = block.querySelector('.plus');
            const input = block.querySelector('input');

            minus.addEventListener('click', () => {
                const value = parseInt(input.value);
                if (value > 1) input.value = value - 1;
            });

            plus.addEventListener('click', () => {
                input.value = parseInt(input.value) + 1;
            });

            input.addEventListener('input', () => {
                const value = parseInt(input.value);
                if (isNaN(value) || value < 1) input.value = 1;
            });
        });
    }

    const techCards = document.querySelectorAll('.tech-card');

    if (techCards.length) {
        techCards.forEach(card => {
            card.addEventListener('click', function () {
                card.classList.add('active');
            });

            const closeText = card.querySelector('.close_tech');

            if (closeText) {
                closeText.addEventListener('click', function (e) {
                    e.stopPropagation();
                    card.classList.remove('active');
                });
            }
        });
    }
});