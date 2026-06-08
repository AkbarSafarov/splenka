function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Общие настройки
const SWIPER_CONFIGS = {
    baseFadeConfig: {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        fadeEffect: { crossFade: true },
        speed: 1000,
        on: {
            autoplayTimeLeft(s, time, progress) {
                const activeButton = document.querySelector(`${s.params.pagination.el} .swiper-pagination-bullet-active::before`);
                if (activeButton) {
                    activeButton.style.animationDuration = `${time / 1000}s`;
                }
            },
            slideChange() {
                setTimeout(() => {
                    const activeButton = document.querySelector(`${this.params.pagination.el} .swiper-pagination-bullet-active`);
                    if (activeButton) {
                        const beforeEl = activeButton.querySelector('::before');
                        if (beforeEl) {
                            beforeEl.style.animation = 'none';
                            setTimeout(() => {
                                beforeEl.style.animation = 'progressBar 6s linear infinite';
                            }, 10);
                        }
                    }
                }, 50);
            }
        }
    },

    baseProductsConfig: {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        breakpoints: {
            0: { slidesPerView: 1 },
            580: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
        }
    },

    baseModalConfig: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 800,
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        keyboard: { enabled: true },
        mousewheel: { invert: false },
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true
    },

    baseMobileSwiper: {
        slidesPerView: 'auto',
        spaceBetween: 12,
        loop: true
    }
};

// Конфигурации для конкретных слайдеров 
const SLIDER_CONFIGS = {
    '.mySwiper_banner': {
        ...SWIPER_CONFIGS.baseFadeConfig,
        pagination: { el: '.slider_top_block .swiper-pagination', clickable: true },
        navigation: { nextEl: '.slider_top_block .arrow_btn.next', prevEl: '.slider_top_block .arrow_btn.prev' }
    },
    '.new_products .mySwiper_products': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        pagination: { el: '.new_products .swiper-pagination', clickable: true },
        navigation: { nextEl: '.new_products .arrow_btn.next', prevEl: '.new_products .arrow_btn.prev' }
    },
    '.hit_products .mySwiper_products': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        pagination: { el: '.hit_products .swiper-pagination', clickable: true },
        navigation: { nextEl: '.hit_products .arrow_btn.next', prevEl: '.hit_products .arrow_btn.prev' }
    },
    '.technologies_section .mySwiper_technologies': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        navigation: { nextEl: '.technologies_section .arrow_btn.next', prevEl: '.technologies_section .arrow_btn.prev' }
    },
    '.comparison-products-wrap .mySwiper_products-comparison': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        loop: false,
        autoplay: false,
        navigation: { nextEl: '.comparison-products-wrap .arrow_btn.next', prevEl: '.comparison-products-wrap .arrow_btn.prev' }
    },

    
    '.buys .mySwiper_products': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        navigation: { nextEl: '.buys .arrow_btn.next', prevEl: '.buys .arrow_btn.prev' }
    },
    '.likes .mySwiper_products': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        navigation: { nextEl: '.likes .arrow_btn.next', prevEl: '.likes .arrow_btn.prev' }
    },
    '.mySwiper_room': {
        ...SWIPER_CONFIGS.baseFadeConfig,
        pagination: { el: '.swiper-pagination-room', clickable: true }
    },
    '.mySwiper_project_detals': {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: { 
            nextEl: '.project_detals_section .arrow_btn.next',
            prevEl: '.project_detals_section .arrow_btn.prev'
        }
    },
    '.mySwiper_bn': {
        ...SWIPER_CONFIGS.baseFadeConfig,
        pagination: { el: '.swiper-pagination-bn', clickable: true },
        navigation: {
            nextEl: '.slider_bn_block .arrow_btn.next',
            prevEl: '.slider_bn_block .arrow_btn.prev'
        }
    },
    '.mySwiper_tabs': {
        slidesPerView: 1,
        spaceBetween: 16,
        effect: 'fade',
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: {
            nextEl: '.tabs_imag .arrow_btn.next',
            prevEl: '.tabs_imag .arrow_btn.prev'
        }
    },
    '.interiors_review': {
        slidesPerView: 4,
        spaceBetween: 16,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: {
            nextEl: '.interiors_section .arrow_btn.next',
            prevEl: '.interiors_section .arrow_btn.prev'
        },
        breakpoints: {
            0: { slidesPerView: 'auto' },
            992: { slidesPerView: 4 }
        }
    },
    '.say_review': {
        slidesPerView: 3,
        spaceBetween: 16,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: {
            nextEl: '.say_section .arrow_btn.next',
            prevEl: '.say_section .arrow_btn.prev'
        },
        breakpoints: {
            0: { slidesPerView: 'auto' },
            992: { slidesPerView: 3 }
        }
    },
    '.review-slider-swiper': {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        effect: 'fade',
        autoplay: { delay: 5000, disableOnInteraction: false },
        navigation: {
            nextEl: '.review-slider-modal .arrow_btn.next',
            prevEl: '.review-slider-modal .arrow_btn.prev'
        }
    },
    '.mySwiper_slider_modal': {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination-slider_modal', clickable: true }
    },
    '.reviewsSwiper': {
        slidesPerView: 'auto',
        spaceBetween: 8,
        loop: true,
        centeredSlides: true,
        roundLengths: true,
        navigation: {
            nextEl: '.reviewsSwiper .arrow_btn.next',
            prevEl: '.reviewsSwiper .arrow_btn.prev'
        },
        breakpoints: {
            0: { slidesPerView: 'auto', centeredSlides: false },
            992: { slidesPerView: 'auto' }
        }
    }
};

// Инициализатор слайдеров
class SwiperManager {
    constructor() {
        this.swiperInstances = new Map();
        this.responsiveSwipers = new Map();
        this.initUniversalSwipers();
        this.initResponsiveSwipers();
        this.initSpecialSwipers();
    }

    // инициализация всех слайдеров
    initUniversalSwipers() {
        this.initDataAttributeSwipers();
        
        this.initLegacySwipers();
    }
    initDataAttributeSwipers() {
        document.querySelectorAll('[data-swiper]').forEach(element => {
            this.initSwiperFromAttributes(element);
        });
    }

    // слайдеры из атрибутов
    initSwiperFromAttributes(element) {
        try {
            const config = this.buildConfigFromAttributes(element);
            
            this.applyNavigation(element, config);
            
            this.applyPagination(element, config);
            
            const swiper = new Swiper(element, config);
            const instanceId = `swiper-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            this.swiperInstances.set(instanceId, swiper);
            element.dataset.swiperInstanceId = instanceId;
            
            console.log('Swiper initialized with config:', config);

        } catch (error) {
            console.error('Error initializing swiper from attributes:', error, element);
        }
    }

    // конфиги из data-атрибутов
    buildConfigFromAttributes(element) {
        const config = {};
        
        // Базовые настройки
        config.loop = element.dataset.swiperLoop !== 'false';
        config.speed = parseInt(element.dataset.swiperSpeed) || 500;
        config.spaceBetween = parseInt(element.dataset.swiperSpace) || 0;
        
        // Автоплей
        if (element.dataset.swiperAutoplay === 'true') {
            config.autoplay = {
                delay: parseInt(element.dataset.swiperAutoplayDelay) || 5000,
                disableOnInteraction: false,
            };
        }
        
        // Эффект
        if (element.dataset.swiperEffect) {
            config.effect = element.dataset.swiperEffect;
            if (element.dataset.swiperEffect === 'fade') {
                config.fadeEffect = { crossFade: true };
            }
        }
        
        // Количество слайдов
        if (element.dataset.swiperPerView) {
            config.slidesPerView = element.dataset.swiperPerView === 'auto' ? 'auto' : parseInt(element.dataset.swiperPerView);
        }
        
        // Направление
        if (element.dataset.swiperDirection) {
            config.direction = element.dataset.swiperDirection;
        }
        
        // Центрированные слайды
        if (element.dataset.swiperCentered === 'true') {
            config.centeredSlides = true;
        }
        
        // Брейкпоинты
        if (element.dataset.swiperBreakpoints) {
            try {
                config.breakpoints = JSON.parse(element.dataset.swiperBreakpoints);
            } catch (e) {
                console.warn('Invalid breakpoints JSON, using default');
                config.breakpoints = {
                    0: { slidesPerView: 'auto' },
                    768: { slidesPerView: config.slidesPerView || 2 },
                    992: { slidesPerView: config.slidesPerView || 3 }
                };
            }
        }
        
        return config;
    }

    // навигации
    applyNavigation(element, config) {
        const container = element.closest('[data-swiper-container]') || element.parentElement;
        
        const nextEl = container.querySelector('.swiper-button-next, .arrow_btn.next, [data-swiper-next]');
        const prevEl = container.querySelector('.swiper-button-prev, .arrow_btn.prev, [data-swiper-prev]');
        
        if (nextEl && prevEl) {
            config.navigation = {
                nextEl: nextEl,
                prevEl: prevEl
            };
        }
        
        if (element.dataset.swiperNext && element.dataset.swiperPrev) {
            config.navigation = {
                nextEl: element.dataset.swiperNext,
                prevEl: element.dataset.swiperPrev
            };
        }
    }

    // пагинации
    applyPagination(element, config) {
        if (element.dataset.swiperPagination) {
            const paginationEl = document.querySelector(element.dataset.swiperPagination);
            if (paginationEl) {
                config.pagination = {
                    el: paginationEl,
                    clickable: true,
                    type: element.dataset.swiperPaginationType || 'bullets'
                };
            }
        }
    }

    // обратная совместимость
    initLegacySwipers() {
        Object.keys(SLIDER_CONFIGS).forEach(selector => {
            const element = document.querySelector(selector);
            
            if (element && !element.hasAttribute('data-swiper')) {
                const config = SLIDER_CONFIGS[selector];
                this.swiperInstances.set(selector, new Swiper(element, config));
                
                if (selector === '.mySwiper_modal') {
                    this.initModalSwiperLogic(this.swiperInstances.get(selector), element);
                }
            }
        });
    }

    // адаптивные слайдеры
    initResponsiveSwipers() {
        const responsiveConfigs = [
            {
                selector: '.projects-swiper',
                breakpoint: 991,
                instanceKey: 'projects',
                config: SWIPER_CONFIGS.baseMobileSwiper
            },
            {
                selector: '.service_price-swiper',
                minWidth: 560,
                maxWidth: 1300,
                instanceKey: 'service_price',
                config: { ...SWIPER_CONFIGS.baseMobileSwiper, spaceBetween: 16 }
            },
            {
                selector: '.comfort-swiper',
                breakpoint: 991,
                instanceKey: 'comfort',
                config: SWIPER_CONFIGS.baseMobileSwiper
            },
            {
                selector: '.faq-slider-swiper',
                breakpoint: 991,
                instanceKey: 'faq',
                config: SWIPER_CONFIGS.baseMobileSwiper
            },
            {
                selector: '.viewed-swiper',
                breakpoint: 991,
                instanceKey: 'viewed',
                config: SWIPER_CONFIGS.baseMobileSwiper
            },
            {
                selector: '.review-card-swiper',
                breakpoint: 767,
                instanceKey: 'review-card',
                config: SWIPER_CONFIGS.baseMobileSwiper
            }
        ];

        responsiveConfigs.forEach(config => {
            this.initResponsiveSwiper(config);
        });

        document.querySelectorAll('.article_section').forEach(slider => {
            const sliderClass = slider.querySelector('.article-swiper');
            if (sliderClass && !sliderClass.hasAttribute('data-swiper')) {
                this.initResponsiveSwiper({
                    selector: `.${sliderClass.className}`,
                    breakpoint: 991,
                    instanceKey: `article-${Date.now()}`,
                    config: SWIPER_CONFIGS.baseMobileSwiper
                });
            }
        });

        this.initDynamicResponsiveSwiper('.js-subcat-row');
        this.initDynamicResponsiveSwiper('.js-subcat2-row');
    }

    
    initResponsiveSwiper({ selector, breakpoint, minWidth, maxWidth, instanceKey, config }) {
        const element = document.querySelector(selector);
        if (!element || element.hasAttribute('data-swiper')) return;

        const checkAndInit = () => {
            const width = window.innerWidth;
            const shouldBeActive = 
                (breakpoint && width <= breakpoint) ||
                (minWidth && maxWidth && width >= minWidth && width < maxWidth);

            if (shouldBeActive && !this.responsiveSwipers.has(instanceKey)) {
                this.responsiveSwipers.set(instanceKey, new Swiper(selector, config));
            } else if (!shouldBeActive && this.responsiveSwipers.has(instanceKey)) {
                this.responsiveSwipers.get(instanceKey).destroy(true, true);
                this.responsiveSwipers.delete(instanceKey);
            }
        };

        checkAndInit();
        window.addEventListener('resize', debounce(checkAndInit, 250));
    }

    initDynamicResponsiveSwiper(selector) {
        const row = document.querySelector(selector);
        if (!row || row.hasAttribute('data-swiper')) return;

        let swiperInstance = null;
        const instanceKey = selector.replace('.', '');
        
        const checkSwiper = () => {
            if (window.innerWidth <= 1426 && !swiperInstance) {
                const children = Array.from(row.children);
                row.classList.add('swiper');
                row.classList.remove('row');
                row.innerHTML = `<div class="swiper-wrapper">
                    ${children.map(child => `<div class="swiper-slide">${child.outerHTML}</div>`).join('')}
                </div>`;
                
                swiperInstance = new Swiper(selector, {
                    slidesPerView: 'auto',
                    spaceBetween: 8,
                });
                this.responsiveSwipers.set(instanceKey, swiperInstance);
            } else if (window.innerWidth > 1426 && swiperInstance) {
                swiperInstance.destroy(true, true);
                swiperInstance = null;
                this.responsiveSwipers.delete(instanceKey);
                
                const slides = row.querySelectorAll('.swiper-slide .col');
                row.classList.remove('swiper');
                row.classList.add('row');
                row.innerHTML = '';
                slides.forEach(slide => row.appendChild(slide));
            }
        };

        const checkSwiperBound = () => checkSwiper.call(this);
        
        checkSwiperBound();
        window.addEventListener('resize', debounce(checkSwiperBound, 250));
    }

    initSpecialSwipers() {
        const contentSwiperWrap = document.querySelector('.contentSwiperWrap');
        if (contentSwiperWrap && !contentSwiperWrap.hasAttribute('data-swiper')) {
            const swiperThumbs = new Swiper('.contentSwiperThumb', {
                spaceBetween: 12,
                slidesPerView: 'auto',
                watchSlidesProgress: true,
            });

            this.swiperInstances.set('content', new Swiper('.contentSwiper', {
                spaceBetween: 12,
                slidesPerView: 1,
                freeMode: true,
                thumbs: { swiper: swiperThumbs },
            }));
        }

        const galleryContainer = document.querySelector('.gallery-container');
        if (galleryContainer && !galleryContainer.hasAttribute('data-swiper')) {
            const galleryThumbs = new Swiper('.gallery-thumbs', {
                slidesPerView: 'auto',
                direction: 'vertical',
                spaceBetween: 12,
                loop: true,
            });

            const galleryMain = new Swiper('.gallery-main', {
                loop: true,
                pagination: { el: '.swiper-pagination-gal', clickable: true },
                navigation: { nextEl: '.gallery-main .next', prevEl: '.gallery-main .prev' },
                effect: 'fade',
                fadeEffect: { crossFade: true },
                thumbs: { swiper: galleryThumbs }
            });

            this.swiperInstances.set('gallery', galleryMain);
            this.swiperInstances.set('gallery-thumbs', galleryThumbs);

            document.querySelectorAll('.gallery-main .swiper-slide img').forEach((image, index) => {
                image.addEventListener('click', () => {
                    const modal = new bootstrap.Modal(document.getElementById('showTabModal'));
                    modal.show();
                    
                    const modalSwiper = this.swiperInstances.get('.mySwiper_modal');
                    if (modalSwiper) {
                        modalSwiper.slideToLoop(index);
                    }
                });
            });
        }
    }

    initModalSwiperLogic(swiper, sliderElement) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const zoomLinks = document.querySelectorAll('.zoom');
        const modalEl = document.getElementById('showTabModal');

        if (!thumbnails.length || !zoomLinks.length || !modalEl) return;

        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                swiper.slideTo(index);
                this.updateActiveThumbnail(index, thumbnails);
            });
        });

        zoomLinks.forEach((zoom, i) => {
            zoom.addEventListener('click', (e) => {
                e.preventDefault();
                const href = zoom.getAttribute('href');
                const slides = sliderElement.querySelectorAll('.swiper-slide img, .swiper-slide video');
                
                let targetIndex = 0;
                slides.forEach((slide, idx) => {
                    if (slide.getAttribute('src') === href || slide.getAttribute('poster') === href) {
                        targetIndex = idx;
                    }
                });

                modalEl.addEventListener('shown.bs.modal', () => {
                    swiper.slideTo(targetIndex);
                    this.updateActiveThumbnail(targetIndex, thumbnails);
                }, { once: true });
            });
        });

        swiper.on('slideChange', () => {
            this.updateActiveThumbnail(swiper.realIndex, thumbnails);
        });
    }

    updateActiveThumbnail(activeIndex, thumbnails) {
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === activeIndex);
        });
    }

    getSwiper(element) {
        if (element.dataset.swiperInstanceId) {
            return this.swiperInstances.get(element.dataset.swiperInstanceId);
        }
        
        for (const [key, swiper] of this.swiperInstances) {
            if (key.startsWith('.') && element.matches(key)) {
                return swiper;
            }
        }
        
        return null;
    }

    destroyAll() {
        this.swiperInstances.forEach(swiper => swiper.destroy());
        this.responsiveSwipers.forEach(swiper => swiper.destroy());
        this.swiperInstances.clear();
        this.responsiveSwipers.clear();
    }

    // Инициализация нового слайдера
    addSwiper(element, customConfig = {}) {
        if (!element) return null;
        
        if (element.hasAttribute('data-swiper')) {
            return this.initSwiperFromAttributes(element);
        }
        
        const config = { loop: true, ...customConfig };
        const swiper = new Swiper(element, config);
        const instanceId = `dynamic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        this.swiperInstances.set(instanceId, swiper);
        element.dataset.swiperInstanceId = instanceId;
        
        return swiper;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.swiperManager = new SwiperManager();
});

// Глобальные хелперы
window.initSwiper = (element, customConfig = {}) => {
    if (!window.swiperManager) {
        window.swiperManager = new SwiperManager();
    }
    return window.swiperManager.addSwiper(element, customConfig);
};

window.destroyAllSwipers = () => {
    if (window.swiperManager) {
        window.swiperManager.destroyAll();
    }
};

// Переинициализация при аякс
if (typeof BX !== 'undefined') {
    BX.addCustomEvent('onAjaxSuccess', () => {
        if (window.swiperManager) {
            window.swiperManager.destroyAll();
            window.swiperManager = new SwiperManager();
        }
    });
}