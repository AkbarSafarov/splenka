# Splenka

Верстка на Gulp + SCSS + Bootstrap 5.

---

## Стек технологий

| Слой | Инструменты |
|------|-------------|
| Сборка | Gulp 5, Babel 7, BrowserSync |
| Стили | SCSS (Dart Sass), Bootstrap 5.3 (из исходников), Autoprefixer |
| JavaScript | Vanilla JS (ES6+), jQuery |
| UI-компоненты | Swiper.js, Lightgallery, Bootstrap Icons |
| Пакетный менеджер | npm |

---

## Запуск

```bash
npm install

# Режим разработки (live-reload, build/)
npm run dev

# Продакшн-сборка (минификация, dist/)
npm run build
```

---

## Страницы

| Файл | Страница |
|------|----------|
| `index.html` | Главная |
| `catalog.html` | Список товаров |
| `card.html` | Карточка товара |
| `card-no.html` | Карточка товара — Уже продано |
| `card-states.html` | Карточка товара — Состояния элементов |
| `cart.html` | Корзина |
| `checkout.html` | Оформление заказа |
| `order.html` | Заказ принят |
| `account.html` | Мой кабинет |
| `client-service.html` | Клиентская служба |
| `contacts.html` | Контакты |
| `comparison.html` | Сравнение |
| `404.html` | Ошибка 404 |

---

## Структура проекта

```
splenka/
├── gulpfile.mjs                        # Gulp-задачи (dev / build)
├── package.json
│
└── src/
    ├── files/                          # Изображения (баннеры, товары)
    │
    ├── fonts/                          # Локальные шрифты Forma DJR Cyrillic
    │
    ├── html/
    │   ├── blocks/                     # Переиспользуемые блоки (@@include)
    │   │   ├── head.html               # <head>: мета, шрифты, CSS
    │   │   ├── header.html
    │   │   ├── footer.html
    │   │   ├── path.html               # Хлебные крошки
    │   │   ├── slider-main.html        # Главный баннер-слайдер
    │   │   ├── banner-section.html     # Промо-баннеры (варианты 1–7)
    │   │   ├── new.html                # Секция «Новинки»
    │   │   ├── hit.html                # Секция «Хиты»
    │   │   ├── like.html               # Секция «Вам понравится»
    │   │   ├── similar.html            # Секция «Похожие товары»
    │   │   ├── category.html           # Сетка категорий
    │   │   ├── collection.html         # Блок коллекций
    │   │   ├── about-block.html        # О компании
    │   │   ├── bottom-block.html       # Нижний информационный блок
    │   │   ├── preim-block.html        # Блок преимуществ
    │   │   ├── filter-block.html       # Фильтр каталога
    │   │   ├── arrows.html             # Стрелки навигации слайдера
    │   │   ├── product.html            # Карточка товара (вариант 1 — default)
    │   │   ├── product2.html           # Карточка товара (вариант 2 — со скидкой)
    │   │   ├── product3.html           # Карточка товара (вариант 3 — в корзине)
    │   │   └── product4.html           # Карточка товара (вариант 4 — популярный)
    │   │
    │   └── pages/                      # Страницы (см. таблицу выше)
    │
    ├── js/
    │   ├── main.js                     # Общий: accordion, фильтры, галерея, UI-компоненты
    │   ├── header.js                   # Шапка: каталог-меню, поиск, корзина, аккаунт
    │   ├── sliders-config.js           # Конфигурация Swiper-слайдеров
    │   ├── feature.js                  # Общие UI-фичи
    │   ├── cart.js                     # Логика корзины
    │   ├── catalog.js                  # Каталог: вид, сортировка, мобильный фильтр
    │   ├── card.js                     # Карточка: табы, степпер кол-ва, sticky CTA
    │   ├── card-no.js                  # Карточка (продано): форма уведомления
    │   ├── checkout.js                 # Оформление заказа: доставка, промокод, валидация
    │   ├── account.js                  # Кабинет: навигация, раскрытие заказов
    │   ├── comparison.js               # Сравнение: удаление колонки, только различия
    │   └── contacts.js                 # Контакты: форма, вкладки магазинов
    │
    ├── styles/
    │   ├── style.scss                  # Точка входа — импортирует все модули
    │   │
    │   ├── components/                 # Глобальные UI-примитивы
    │   │   ├── _colors.scss            # CSS custom properties: цвета, полутона, состояния
    │   │   ├── _fonts.scss             # @font-face (Forma DJR) + CSS-переменные шрифтов
    │   │   ├── _buttons.scss           # Стили кнопок
    │   │   └── _forms.scss             # Стили форм и полей ввода
    │   │
    │   ├── blocks/                     # Стили переиспользуемых блоков
    │   │   ├── _header.scss
    │   │   ├── _footer.scss
    │   │   ├── _main-slider.scss
    │   │   ├── _icons.scss
    │   │   ├── about-block.scss
    │   │   ├── banner-section.scss
    │   │   ├── bottom-block.scss
    │   │   ├── category.scss
    │   │   ├── collection.scss
    │   │   ├── filter.scss
    │   │   ├── hit.scss
    │   │   └── product-item.scss
    │   │
    │   ├── vendor/
    │   │   ├── _bootstrap-config.scss  # Bootstrap 5 SCSS + переопределение переменных проекта
    │   │   └── _inner-style.scss       # Сторонние vendor-стили
    │   │
    │   └── segments/                   # Стили страниц (один файл = одна страница)
    │       ├── _main.scss
    │       ├── _catalog-menu.scss
    │       ├── _card.scss
    │       ├── _card-states.scss
    │       ├── _cart.scss
    │       ├── _checkout.scss
    │       ├── _order-page.scss
    │       ├── _account.scss
    │       ├── _client-service.scss
    │       ├── _contacts.scss
    │       ├── _comparison.scss
    │       └── _404-page.scss
    │
    ├── img/                            # Дополнительные изображения
    ├── svg/                            # SVG-спрайты
    └── libs/                           # Bootstrap dist, Swiper, Lightgallery
```

---

## Цвета и шрифты

### Палитра (`_colors.scss`)

| Переменная | Значение | Назначение |
|------------|----------|------------|
| `--brand-gold` | `#99851f` | Основной акцент |
| `--brand-black` | `#1a332d` | Основной текст, тёмный фон |
| `--brand-ice` | `#f0f0f3` | Светлая поверхность |
| `--brand-light` | `#f9f9fa` | Фон страницы |
| `--brand-white` | `#fff` | Белый |

Также доступны прозрачные серии `--t-black-*`, `--t-white-*`, `--t-gold-*` (от 5% до 90%), набор полутонов и переменные состояний (`--state-error`, `--state-success` и др.).

### Шрифты (`_fonts.scss`)

| Переменная | Шрифт | Назначение |
|------------|-------|------------|
| `--font-family` | Nunito Sans | Основной |
| `--second-family` | Onest | Заголовки |
| `--third-family` | Comfortaa | Акцентный |
| `--font3` | Roboto | Вспомогательный |
| `--font4` | Manrope | Вспомогательный |
| `--font5` | Open Sans | Вспомогательный |

Загружаются через Google Fonts. Forma DJR Cyrillic подключён локально через `@font-face`.

---

## Bootstrap 5 — кастомизация

Все переопределения Bootstrap-переменных находятся в одном файле:

```
src/styles/vendor/_bootstrap-config.scss
```

Bootstrap компилируется из SCSS-исходников (пакет `bootstrap` в `node_modules`), итоговый CSS попадает в `style.css`. Подключать `bootstrap.css` из `libs/` не нужно.

Чтобы изменить цвет кнопки, отступы, радиус и т.д. — редактируй только этот файл.
