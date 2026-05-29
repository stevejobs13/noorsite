// ========== محصولات ==========
const products = [
    { id: 1, title: "مفتول گالوانیره صحافی 1",   description: "مفتول گالوانیزه بابراقیت و درخشنگی بالا مخصوص فنر های صحافی ", details: "ضخامت‌های ۱  میلیمتر - بسته‌بندی ۲۵ کیلوگرمی - گالوانیزه سرد",   image: "images/wire1.jpg", category: "wire" },
    { id: 2, title: "مفتول گالوانیره صحافی 1.2",   description: "مفتول گالوانیزه بابراقیت و درخشنگی بالا مخصوص فنر های صحافی ", details: "ضخامت‌های 1.2  میلیمتر - بسته‌بندی ۲۵ کیلوگرمی - گالوانیزه سرد", image: "images/wire1.jpg", category: "wire" },
    { id: 3, title: "مفتول گالوانیره صحافی 1.5",   description: "مفتول گالوانیزه بابراقیت و درخشنگی بالا مخصوص فنر های صحافی ", details: "ضخامت‌های 1.5  میلیمتر - بسته‌بندی ۲۵ کیلوگرمی - گالوانیزه سرد", image: "images/wire1.jpg", category: "wire" },
    { id: 4, title: "مفتول سیاه ساده", description: "مفتول سیاه ساده در سایز های مختلف قابل استفاده در انواع صنایع", details: "سایز 2.5 تا 4 میلیمتر در بسته بندی های مختلف ", image: "images/normal_wire.jpg", category: "wire" },
    { id: 5, title: "پشم آهن صنعتی", description: "سیم ظرفشویی(پشم آهن)صنعتی مخصوص صنایع لنت سازی", details: "بسته‌بندی 0/5 تا 10 کیلوگرمی مطابق سفارش شما", image: "images/steel_wool.jpg", category: "fastener" },
    { id: 6, title: "مفتول آنیل کششی", description: "مفتول آنیل شده کششی با بالاترین کیفیت آنیل و کمترین میزان اکسید ", details: "سایزهای 1.5 تا 2 میلیمتر در کلاف هایی با وزن بیش از 100 کیلو گرم ", image: "images/annealed_wire.jpg", category: "fastener" },
   // { id: 7, title: "سیم خاردار تیغ دار", description: "سیم خاردار با تیغ‌های تیز و استحکام بالا برای امنیت", details: "سیم ۱۴ میلیمتر - تیغ فاصله ۱۰ سانتی - بسته ۵۰ متری", image: "images/wire3.jpg", category: "wire" },
   // { id: 8, title: "توری حصاری صنعتی", description: "توری حصاری سنگین با چشمه‌های ریز و استحکام بالا", details: "ارتفاع ۲ متر - چشمه ۳×۳ - مناسب کارخانه‌جات", image: "images/mesh3.jpg", category: "mesh" }
];

let currentFilter = 'all';
let currentSearch = '';

// ========== زبان سایت ==========
let currentLang = localStorage.getItem('siteLang') || 'fa';
let translations = { fa: {}, ar: {} }; // مقدار پیش‌فرض خالی

// لود کردن فایل ترجمه
async function loadTranslations() {
    try {
        const response = await fetch('translations.js');
        if (!response.ok) throw new Error('فایل translations.js پیدا نشد');
        const scriptText = await response.text();

        // استخراج آبجکت translations از محتوای فایل
        const match = scriptText.match(/const translations = ({[\s\S]*?});/);
        if (match) {
            translations = eval('(' + match[1] + ')');
        }

        // اعمال ترجمه اولیه
        updateStaticTexts(currentLang);

        // راه‌اندازی دکمه‌های زبان بعد از لود ترجمه
        initLanguageButtons();
    } catch (error) {
        console.error('خطا در لود ترجمه:', error);
    }
}

function updateStaticTexts(lang) {
    const t = translations[lang];
    if (!t) return;

    // Header Menu
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length >= 6) {
        navLinks[0].textContent = t.nav_home;
        navLinks[1].textContent = t.nav_products;
        navLinks[2].textContent = t.nav_price;
        navLinks[3].textContent = t.nav_stats;
        navLinks[4].textContent = t.nav_about;
        navLinks[5].textContent = t.nav_contact;
    }

    // Hero Section
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.textContent = t.hero_badge;
    const heroDesc = document.querySelector('.hero-description p');
    if (heroDesc) heroDesc.textContent = t.hero_desc;
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    if (heroBtns[0]) heroBtns[0].innerHTML = `<i class="fas fa-arrow-down"></i> ${t.hero_btn_products}`;
    if (heroBtns[1]) heroBtns[1].innerHTML = `<i class="fas fa-headset"></i> ${t.hero_btn_contact}`;
    if (heroBtns[2]) heroBtns[2].innerHTML = `<i class="fas fa-tag"></i> ${t.hero_btn_price}`;

    // Search & Filters
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t.search_placeholder;
    const filterTags = document.querySelectorAll('.filter-tag');
    if (filterTags[0]) filterTags[0].textContent = t.filter_all;
    if (filterTags[1]) filterTags[1].textContent = t.filter_wire;
    if (filterTags[2]) filterTags[2].textContent = t.filter_mesh;
    if (filterTags[3]) filterTags[3].textContent = t.filter_fastener;

    // Products Section
    const sectionTitle = document.querySelector('.section-title h2');
    const sectionSub = document.querySelector('.section-title p');
    if (sectionTitle) sectionTitle.innerHTML = `${t.section_products_title} <span class="highlight">ما</span>`;
    if (sectionSub) sectionSub.textContent = t.section_products_sub;

    // Price Banner
    const priceBannerTitle = document.querySelector('.price-banner-content h3');
    const priceBannerDesc = document.querySelector('.price-banner-content p');
    const priceBannerBtn = document.querySelector('.price-banner-content .btn');
    if (priceBannerTitle) priceBannerTitle.textContent = t.price_banner_title;
    if (priceBannerDesc) priceBannerDesc.textContent = t.price_banner_desc;
    if (priceBannerBtn) priceBannerBtn.innerHTML = `<i class="fas fa-tag"></i> ${t.price_banner_btn}`;

    // Stats
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels[0]) statLabels[0].textContent = t.stats_experience;
    if (statLabels[1]) statLabels[1].textContent = t.stats_customers;
    if (statLabels[2]) statLabels[2].textContent = t.stats_products;
    if (statLabels[3]) statLabels[3].textContent = t.stats_cities;

    // About Section
    const aboutBadge = document.querySelector('.section-title-left .badge');
    const aboutTitle = document.querySelector('.section-title-left h2');
    const aboutTexts = document.querySelectorAll('.about-text p');
    const aboutFeaturesTitle = document.querySelectorAll('.about-feature h4');
    const aboutFeaturesDesc = document.querySelectorAll('.about-feature p');
    if (aboutBadge) aboutBadge.textContent = t.about_badge;
    if (aboutTitle) aboutTitle.innerHTML = t.about_title;
    if (aboutTexts[0]) aboutTexts[0].textContent = t.about_text1;
    if (aboutTexts[1]) aboutTexts[1].textContent = t.about_text2;
    if (aboutFeaturesTitle[0]) aboutFeaturesTitle[0].textContent = t.about_feature1_title;
    if (aboutFeaturesDesc[0]) aboutFeaturesDesc[0].textContent = t.about_feature1_desc;
    if (aboutFeaturesTitle[1]) aboutFeaturesTitle[1].textContent = t.about_feature2_title;
    if (aboutFeaturesDesc[1]) aboutFeaturesDesc[1].textContent = t.about_feature2_desc;
    if (aboutFeaturesTitle[2]) aboutFeaturesTitle[2].textContent = t.about_feature3_title;
    if (aboutFeaturesDesc[2]) aboutFeaturesDesc[2].textContent = t.about_feature3_desc;

    // Contact Section
    const contactTitle = document.querySelector('.contact-info-glass h3');
    const contactItems = document.querySelectorAll('.contact-item strong');
    const contactAddressP = document.querySelectorAll('.contact-item p');
    if (contactTitle) contactTitle.innerHTML = `${t.contact_title} <span class="highlight">تماس</span>`;
    if (contactItems[0]) contactItems[0].textContent = t.contact_phone;
    if (contactItems[1]) contactItems[1].textContent = t.contact_email;
    if (contactItems[2]) contactItems[2].textContent = t.contact_address_title;
    if (contactAddressP[2]) contactAddressP[2].textContent = t.contact_address;

    // Footer
    const footerText = document.querySelector('footer .container p:first-child');
    const footerSmall = document.querySelector('.footer-small');
    if (footerText) footerText.textContent = t.footer_copyright;
    if (footerSmall) footerSmall.innerHTML = `${t.footer_design} <i class="fas fa-heart"></i>`;

    // Price Page (اگر در آن هستیم)
    const pricePageTitle = document.querySelector('.price-hero h1');
    const pricePageDesc = document.querySelector('.price-hero p');
    const priceNote = document.querySelector('.price-note-warning');
    const priceFooterTitles = document.querySelectorAll('.price-note-box strong');
    const priceFooterDescs = document.querySelectorAll('.price-note-box p');
    if (pricePageTitle) pricePageTitle.innerHTML = `${t.price_page_title} <span style="color: #ffd700;">مفتولی</span>`;
    if (pricePageDesc) pricePageDesc.textContent = t.price_page_desc;
    if (priceNote) priceNote.innerHTML = `<i class="fas fa-info-circle"></i> <strong>نکته مهم:</strong> ${t.price_note}`;
    if (priceFooterTitles[0]) priceFooterTitles[0].textContent = t.price_footer_ship_title;
    if (priceFooterDescs[0]) priceFooterDescs[0].textContent = t.price_footer_ship_desc;
    if (priceFooterTitles[1]) priceFooterTitles[1].textContent = t.price_footer_offer_title;
    if (priceFooterDescs[1]) priceFooterDescs[1].textContent = t.price_footer_offer_desc;
    if (priceFooterTitles[2]) priceFooterTitles[2].textContent = t.price_footer_direct_title;
    if (priceFooterDescs[2]) priceFooterDescs[2].textContent = t.price_footer_direct_desc;
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLang', lang);

    const faBtn = document.getElementById('langFa');
    const arBtn = document.getElementById('langAr');
    if (faBtn) faBtn.classList.toggle('active', lang === 'fa');
    if (arBtn) arBtn.classList.toggle('active', lang === 'ar');

    updateStaticTexts(lang);

    // اگر در صفحه قیمت هستیم، جدول را دوباره بساز (برای ترجمه دکمه درخواست قیمت)
    if (document.getElementById('desktopPriceBody')) {
        loadPrices(); // دوباره قیمت‌ها را لود کن (تابع داخلش از translations استفاده می‌کند)
    }
}

function initLanguageButtons() {
    const faBtn = document.getElementById('langFa');
    const arBtn = document.getElementById('langAr');

    if (faBtn) {
        faBtn.addEventListener('click', () => switchLanguage('fa'));
        faBtn.classList.toggle('active', currentLang === 'fa');
    }
    if (arBtn) {
        arBtn.addEventListener('click', () => switchLanguage('ar'));
        arBtn.classList.toggle('active', currentLang === 'ar');
    }
}

// ========== تایپینگ افکت ==========
const typedTextElement = document.getElementById('typed-text');
const phrases = ['بالاترین کیفیت محصولات مفتولی ','ارسال محصولات به سراسر کشور ' ,'تولید کننده مفتولهای صحافی و صنعتی','۱۵ سال افتخار تولید'];
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    if (!typedTextElement) return;
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// ========== نمایش محصولات ==========
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    let filteredProducts = products.filter(p => (currentFilter === 'all' || p.category === currentFilter) && (!currentSearch || p.title.includes(currentSearch) || p.description.includes(currentSearch)));
    grid.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<img src="${product.image}" alt="${product.title}" class="product-image" loading="lazy"><div class="product-info"><h3 class="product-title">${product.title}</h3><p class="product-description">${product.description}</p><div class="product-details">${product.details}</div></div>`;
        card.onclick = () => openModal(product);
        grid.appendChild(card);
    });
}

// ========== مودال ==========
function openModal(product) {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalDetails').textContent = product.details;
    modal.style.display = 'flex';
}

// ========== شمارنده آمار ==========
function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 100;
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else stat.textContent = target;
        };
        updateNumber();
    });
}

// ========== تم روشن/تاریک با افکت بنر (برای صفحه اصلی) ==========
function initTheme() {
    const themeSwitch = document.querySelector('.theme-switch');
    const bgLight = document.getElementById('heroBgLight');
    const bgDark = document.getElementById('heroBgDark');
    const savedTheme = localStorage.getItem('theme');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            if (themeSwitch) themeSwitch.classList.add('active');
            localStorage.setItem('theme', 'dark');
            if (bgLight && bgDark) {
                bgLight.classList.add('hidden');
                bgLight.classList.remove('active');
                bgDark.classList.remove('hidden');
                bgDark.classList.add('active');
            }
        } else {
            document.body.removeAttribute('data-theme');
            if (themeSwitch) themeSwitch.classList.remove('active');
            localStorage.setItem('theme', 'light');
            if (bgLight && bgDark) {
                bgDark.classList.add('hidden');
                bgDark.classList.remove('active');
                bgLight.classList.remove('hidden');
                bgLight.classList.add('active');
            }
        }
    }

    if (savedTheme === 'dark') setTheme('dark');
    else setTheme('light');

    if (themeSwitch) {
        themeSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            setTheme(document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        });
    }
}

// ========== فیلتر و جستجو ==========
function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            if (clearBtn) clearBtn.style.display = currentSearch ? 'block' : 'none';
            displayProducts();
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearch = '';
            clearBtn.style.display = 'none';
            displayProducts();
        });
    }
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentFilter = tag.dataset.filter;
            displayProducts();
        });
    });
}

// ========== منوی موبایل ==========
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => nav.classList.toggle('active'));
    }
    document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('active')));
}

// ========== مودال ==========
function initModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
}

// ========== قیمت‌ها (برای صفحه price.html) ==========
async function loadPrices() {
    try {
        const response = await fetch('prices.json');
        if (!response.ok) throw new Error('فایل prices.json پیدا نشد');
        const data = await response.json();

        const lastUpdate = data.lastUpdate || new Date().toLocaleDateString('fa-IR');
        const dateElem = document.getElementById('priceUpdateDate');
        if (dateElem) dateElem.innerHTML = `<i class="fas fa-calendar-check"></i> آخرین به‌روزرسانی: ${lastUpdate}`;

        const prices = data.prices;
        buildDesktopTable(prices);
        buildMobileCards(prices);
    } catch (error) {
        console.error('خطا:', error);
        const desktopBody = document.getElementById('desktopPriceBody');
        const mobileCards = document.getElementById('mobilePriceCards');
        if (desktopBody) desktopBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:red">خطا در بارگذاری قیمت‌ها</td></tr>';
        if (mobileCards) mobileCards.innerHTML = '<div class="product-price-card" style="color:red">خطا در بارگذاری قیمت‌ها</div>';
    }
}

function buildDesktopTable(prices) {
    const desktopBody = document.getElementById('desktopPriceBody');
    if (!desktopBody) return;

    const t = translations[currentLang];

    const productsList = [
        //{ row:1, name:"سیم مفتول سیاه", type:"ضخامت ۱/۵ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_15mm" },
        { row:1, name:"سیم مفتول سیاه", type:"ضخامت ۲ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_2mm" },
        { row:2, name:"سیم مفتول سیاه", type:"ضخامت ۳ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_3mm" },
        { row:3, name:"سیم مفتول سیاه", type:"ضخامت ۴ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_4mm" },
        { row:4, name:"مفتول گالوانیزه فنر صحافی", type:"ضخامت 0.9 میلی‌متر", unit:"کیلوگرم", priceKey:"galvanized_0.9mm" },
        { row:5, name:"مفتول گالوانیزه فنر صحافی", type:"ضخامت 1.0 میلی‌متر", unit:"کیلوگرم", priceKey:"galvanized_1mm" },
        { row:6, name:"مفتول گالوانیزه فنر صحافی", type:"ضخامت 1.2 میلی‌متر", unit:"کیلوگرم", priceKey:"galvanized_1.2mm" },
        { row:7, name:"مفتول گالوانیزه فنر صحافی", type:"ضخامت 1.5 میلی‌متر", unit:"کیلوگرم", priceKey:"galvanized_1.5mm" },
        { row:8, name:"مفتول آنیل شده ", type:"ضخامت 1.5 میلی متر", unit:" کیلوگرمی", priceKey:"annealed_1.5mm" },
        { row:9, name:"مفتول آنیل شده", type:"ضخامت 1.8 میلی متر", unit:" کیلو گرمی", priceKey:"annealed_1.8mm" },
      //  { row:11, name:"توری جوشی", type:"مش ۱۰×۱۰ - مفتول ۴ میلی", unit:"ورق ۲×۲ متر", priceKey:"welded_10x10" },
       // { row:12, name:"توری جوشی", type:"مش ۱۵×۱۵ - مفتول ۵ میلی", unit:"ورق ۲×۲ متر", priceKey:"welded_15x15" },
        { row:10, name:"پشم آهن (سیم ظرفشویی)صنعتی", type:"بسته 500 گرمی", unit:"کیلو گرم", priceKey:"wool_500g" },
        { row:11, name:"پشم آهن (سیم ظرفشویی)صنعتی", type:"بسته 1 کیلوگرمی", unit:"کیلو گرم ", priceKey:"wool_1kg" },
        { row:12, name:"پشم آهن (سیم ظرفشویی)صنعتی", type:"بسته 10 کیلوگرمی", unit:"کیلو گرم", priceKey:"wool_10kg" }
    ];

    let html = '';
    let lastCat = '';

    for (let p of productsList) {
        let cat = '';
        if (p.row === 1) cat = ' سیم مفتول سیاه';
        else if (p.row === 4) cat = ' مفتول گالوانیزه';
        else if (p.row === 8) cat = 'مفتول آنیل شده';
        else if (p.row === 10) cat = ' پشم آهن(سیم ظرفشویی)';

        if (cat && cat !== lastCat) {
            html += `<tr class="category-row"><td colspan="6"><strong>${cat}</strong></td></tr>`;
            lastCat = cat;
        }

        const price = prices[p.priceKey] || 0;
        html += `<tr>
                    <td>${p.row}</td>
                    <td>${p.name}</td>
                    <td>${p.type}</td>
                    <td>${p.unit}</td>
                    <td class="price">${price.toLocaleString()}</td>
                    <td><a href="index.html#contact" class="price-order">${t.price_request}</a></td>
                </tr>`;
    }
    desktopBody.innerHTML = html;
}

function buildMobileCards(prices) {
    const mobileContainer = document.getElementById('mobilePriceCards');
    if (!mobileContainer) return;

    const t = translations[currentLang];

    const productsList = [
        { name:"سیم مفتول سیاه", type:"ضخامت ۱/۵ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_15mm", cat:"wire" },
        { name:"سیم مفتول سیاه", type:"ضخامت ۲ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_2mm", cat:"wire" },
        { name:"سیم مفتول سیاه", type:"ضخامت ۳ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_3mm", cat:"wire" },
        { name:"سیم مفتول سیاه", type:"ضخامت ۴ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_4mm", cat:"wire" },
        { name:"سیم مفتول سیاه", type:"ضخامت ۵ میلی‌متر", unit:"کیلوگرم", priceKey:"wire_5mm", cat:"wire" },
        { name:"مفتول گالوانیزه", type:"ضخامت ۲ میلی‌متر", unit:"کیلوگرم", priceKey:"galvanized_2mm", cat:"gal" },
        { name:"مفتول گالوانیزه", type:"ضخامت ۳ میلی‌متر", unit:"کیلوگرم", priceKey:"galvanized_3mm", cat:"gal" },
        { name:"مفتول گالوانیزه", type:"ضخامت ۴ میلی‌متر", unit:"کیلوگرم", priceKey:"galvanized_4mm", cat:"gal" },
        { name:"توری مرغی", type:"چشمه ۵×۵ سانتی", unit:"رول ۵۰ متری", priceKey:"poultry_5x5", cat:"mesh" },
        { name:"توری مرغی", type:"چشمه ۷×۷ سانتی", unit:"رول ۵۰ متری", priceKey:"poultry_7x7", cat:"mesh" },
        { name:"توری جوشی", type:"مش ۱۰×۱۰ - مفتول ۴ میلی", unit:"ورق ۲×۲ متر", priceKey:"welded_10x10", cat:"mesh" },
        { name:"توری جوشی", type:"مش ۱۵×۱۵ - مفتول ۵ میلی", unit:"ورق ۲×۲ متر", priceKey:"welded_15x15", cat:"mesh" },
        { name:"سیم خاردار ساده", type:"تیغ فاصله ۱۵ سانتی", unit:"رول ۵۰ متری", priceKey:"barbed_simple", cat:"barb" },
        { name:"سیم خاردار تیغ دار", type:"تیغ فاصله ۱۰ سانتی", unit:"رول ۵۰ متری", priceKey:"barbed_razor", cat:"barb" },
        { name:"سیم خاردار سنگین", type:"تیغ فاصله ۷ سانتی", unit:"رول ۵۰ متری", priceKey:"barbed_heavy", cat:"barb" }
    ];

    let html = '';
    let lastCat = '';

    for (let p of productsList) {
        let catTitle = '';
        if (p.cat === 'wire') catTitle = '🔩 سیم مفتول سیاه';
        else if (p.cat === 'gal') catTitle = '✨ مفتول گالوانیزه';
        else if (p.cat === 'mesh') catTitle = '🔗 توری‌های صنعتی';
        else if (p.cat === 'barb') catTitle = '⚡ سیم خاردار';

        if (catTitle && catTitle !== lastCat) {
            html += `<div class="category-title">${catTitle}</div>`;
            lastCat = catTitle;
        }

        const price = prices[p.priceKey] || 0;
        html += `<div class="product-price-card">
                    <div class="card-row"><span class="product-name">${p.name}</span><span class="card-label">${p.type}</span></div>
                    <div class="card-row"><span class="card-label">${t.price_unit}</span><span class="card-value">${p.unit}</span></div>
                    <div class="card-row"><span class="card-label">${t.price_table_price.split(' ')[0]}</span><span class="price-value">${price.toLocaleString()} تومان</span></div>
                    <div class="card-row"><a href="index.html#contact" class="order-btn">📞 ${t.price_request}</a></div>
                </div>`;
    }
    mobileContainer.innerHTML = html;
}

// ========== تم برای صفحه قیمت (بدون افکت بنر) ==========
function initPriceTheme() {
    const themeSwitch = document.querySelector('.theme-switch');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        if (themeSwitch) themeSwitch.classList.add('active');
    } else {
        document.body.removeAttribute('data-theme');
        if (themeSwitch) themeSwitch.classList.remove('active');
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            const isDark = document.body.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeSwitch.classList.remove('active');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeSwitch.classList.add('active');
            }
        });
    }
}

// ========== اجرای اولیه ==========
document.addEventListener('DOMContentLoaded', () => {
    const isPricePage = document.getElementById('desktopPriceBody') !== null;
    const isHomePage = document.getElementById('productsGrid') !== null;

    if (isHomePage) {
        typeEffect();
        displayProducts();
        initTheme();
        initFilters();
        initMobileMenu();
        initModal();

        const statsSection = document.getElementById('stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) { animateNumbers(); observer.disconnect(); } });
            });
            observer.observe(statsSection);
        }
    }

    if (isPricePage) {
        initPriceTheme();
        initMobileMenu();
        loadPrices();
    }

    // لود کردن ترجمه‌ها (بعد از راه‌اندازی اولیه)
    loadTranslations();
});