// ========== محصولات ==========
const products = [
    {
        id: 1,

        title: {
            fa: "مفتول گالوانیزه صحافی 1",
            ar: "سلك مجلفن للتجليد 1"
        },

        description: {
            fa: "مفتول گالوانیزه براق مخصوص فنر صحافی",
            ar: "سلك مجلفن لامع مخصص لزنبركات التجليد"
        },

        details: {
            fa: "ضخامت ۱ میلیمتر - بسته ۲۵ کیلویی",
            ar: "سماكة 1 مم - عبوة 25 كجم"
        },

        image: "images/wire1.jpg",

        category: "wire"
    },
    {
        id: 2,
        title: {
            fa: "مفتول گالوانیزه صحافی 1.2",
            ar: "سلك مجلفن للتجليد 1.2"
        },
        description: {
            fa: "مفتول گالوانیزه با براقیت و درخشندگی بالا مخصوص فنرهای صحافی",
            ar: "سلك مجلفن عالي اللمعان مخصص لزنبركات التجليد"
        },
        details: {
            fa: "ضخامت 1.2 میلیمتر - بسته‌بندی ۲۵ کیلوگرمی - گالوانیزه سرد",
            ar: "سماكة 1.2 مم - عبوة 25 كغ - مجلفن على البارد"
        },
        image: "images/wire1.jpg",
        category: "wire"
    },

    {
        id: 3,
        title: {
            fa: "مفتول گالوانیزه صحافی 1.5",
            ar: "سلك مجلفن للتجليد 1.5"
        },
        description: {
            fa: "مفتول گالوانیزه با براقیت و درخشندگی بالا مخصوص فنرهای صحافی",
            ar: "سلك مجلفن عالي اللمعان مخصص لزنبركات التجليد"
        },
        details: {
            fa: "ضخامت 1.5 میلیمتر - بسته‌بندی ۲۵ کیلوگرمی - گالوانیزه سرد",
            ar: "سماكة 1.5 مم - عبوة 25 كغ - مجلفن على البارد"
        },
        image: "images/wire1.jpg",
        category: "wire"
    },

    {
        id: 4,
        title: {
            fa: "مفتول سیاه ساده",
            ar: "سلك أسود عادي"
        },
        description: {
            fa: "مفتول سیاه ساده در سایزهای مختلف قابل استفاده در انواع صنایع",
            ar: "سلك أسود عادي بمقاسات مختلفة مناسب لمختلف الصناعات"
        },
        details: {
            fa: "سایز 2.5 تا 4 میلیمتر در بسته‌بندی‌های مختلف",
            ar: "مقاسات من 2.5 إلى 4 مم مع عبوات متنوعة"
        },
        image: "images/normal_wire.jpg",
        category: "wire"
    },

    {
        id: 5,
        title: {
            fa: "پشم آهن صنعتی",
            ar: "صوف فولاذي صناعي"
        },
        description: {
            fa: "سیم ظرفشویی (پشم آهن) صنعتی مخصوص صنایع لنت‌سازی",
            ar: "صوف فولاذي صناعي مخصص لصناعة بطانات الفرامل"
        },
        details: {
            fa: "بسته‌بندی 0.5 تا 10 کیلوگرمی مطابق سفارش شما",
            ar: "عبوات من 0.5 إلى 10 كغ حسب الطلب"
        },
        image: "images/steel_wool.jpg",
        category: "fastener"
    },

    {
        id: 6,
        title: {
            fa: "مفتول آنیل کششی",
            ar: "سلك مسحوب ومُلدَّن"
        },
        description: {
            fa: "مفتول آنیل شده کششی با بالاترین کیفیت آنیل و کمترین میزان اکسید",
            ar: "سلك مُلدَّن مسحوب بأعلى جودة وأقل نسبة أكسدة"
        },
        details: {
            fa: "سایزهای 1.5 تا 2 میلیمتر در کلاف‌هایی با وزن بیش از 100 کیلوگرم",
            ar: "مقاسات من 1.5 إلى 2 مم في لفائف يزيد وزنها عن 100 كغ"
        },
        image: "images/annealed_wire.jpg",
        category: "fastener"
    }
];

let currentFilter = 'all';
let currentSearch = '';

// ========== زبان سایت ==========
let currentLang = localStorage.getItem('siteLang') || 'fa';
let translations = { fa: {}, ar: {} }; // مقدار پیش‌فرض خالی

// لود کردن فایل ترجمه
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');

        if (!response.ok) {
            throw new Error('فایل translations.json پیدا نشد');
        }

        translations = await response.json();

        updateStaticTexts(currentLang);

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
    if (contactItems[2]) contactItems[2].textContent = t.contact_factory_address;
    if (contactAddressP[3])
        contactAddressP[3].textContent = t.contact_factory_location;


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
    // دکمه بازگشت به صفحه اصلی
    const backHomeBtn = document.querySelector('.back-to-home');

    if (backHomeBtn) {
        const icon = lang === 'fa'
            ? 'fa-arrow-right'
            : 'fa-arrow-left';

        backHomeBtn.innerHTML =
            `<i class="fas ${icon}"></i> ${t.back_to_home}`;
    }
}

function switchLanguage(lang) {
    currentLang = lang;

    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;

    if (typedTextElement) {
        typedTextElement.textContent = '';
    }

    localStorage.setItem('siteLang', lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = 'rtl';

    document.title =
        lang === 'fa'
            ? 'صنایع مفتولی نور'
            : 'صناعات نور للأسلاك';

    const faBtn = document.getElementById('langFa');
    const arBtn = document.getElementById('langAr');

    if (faBtn) faBtn.classList.toggle('active', lang === 'fa');
    if (arBtn) arBtn.classList.toggle('active', lang === 'ar');

    updateStaticTexts(lang);

    if (document.getElementById('productsGrid')) {
        displayProducts();
    }

    if (document.getElementById('desktopPriceBody')) {
        loadPrices();
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
const phrases = {
    fa: [
        'بالاترین کیفیت محصولات مفتولی',
        'ارسال محصولات به سراسر کشور',
        'تولید کننده مفتولهای صحافی و صنعتی',
        '۱۵ سال افتخار تولید'
    ],
    ar: [
        'أعلى جودة لمنتجات الأسلاك',
        'شحن المنتجات إلى جميع أنحاء البلاد',
        'منتج أسلاك التجليد والأسلاك الصناعية',
        '15 عاماً من الفخر في الإنتاج'
    ]
};
let phraseIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
    if (!typedTextElement) return;
    const currentPhrase = phrases[currentLang][phraseIndex];
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
        const currentPhrases = phrases[currentLang];
phraseIndex = (phraseIndex + 1) % currentPhrases.length;
    }
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// ========== نمایش محصولات ==========
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    let filteredProducts = products.filter(p => (currentFilter === 'all' || p.category === currentFilter) && (!currentSearch || p.title[currentLang].includes(currentSearch) || p.description[currentLang].includes(currentSearch)));
    grid.innerHTML = '';
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `<img src="${product.image}" alt="${product.title[currentLang]}" class="product-image" loading="lazy"><div class="product-info"><h3 class="product-title">${product.title[currentLang]}</h3><p class="product-description">${product.description[currentLang]}</p><div class="product-details">${product.details[currentLang]}</div></div>`;
        card.onclick = () => openModal(product);
        grid.appendChild(card);
    });
}

// ========== مودال ==========
function openModal(product) {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.title[currentLang];
    document.getElementById('modalDescription').textContent = product.description[currentLang];
    document.getElementById('modalDetails').textContent = product.details[currentLang];
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
        if (dateElem) {
            dateElem.innerHTML =
                `<i class="fas fa-calendar-check"></i> ${translations[currentLang].price_last_update}: ${lastUpdate}`;
        }

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

    const priceProducts = [

        {
            row: 1,
            category: {
                fa: "سیم مفتول سیاه",
                ar: "سلك حديد أسود"
            },
            name: {
                fa: "سیم مفتول سیاه",
                ar: "سلك حديد أسود"
            },
            type: {
                fa: "ضخامت ۲ میلی‌متر",
                ar: "سماكة 2 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "wire_2mm"
        },

        {
            row: 2,
            name: {
                fa: "سیم مفتول سیاه",
                ar: "سلك حديد أسود"
            },
            type: {
                fa: "ضخامت ۳ میلی‌متر",
                ar: "سماكة 3 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "wire_3mm"
        },

        {
            row: 3,
            name: {
                fa: "سیم مفتول سیاه",
                ar: "سلك حديد أسود"
            },
            type: {
                fa: "ضخامت ۴ میلی‌متر",
                ar: "سماكة 4 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "wire_4mm"
        },

        {
            row: 4,
            category: {
                fa: "مفتول گالوانیزه فنر صحافی",
                ar: "سلك مجلفن لزنبرك التجليد"
            },
            name: {
                fa: "مفتول گالوانیزه فنر صحافی",
                ar: "سلك مجلفن لزنبرك التجليد"
            },
            type: {
                fa: "ضخامت 0.9 میلی‌متر",
                ar: "سماكة 0.9 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "galvanized_0.9mm"
        },

        {
            row: 5,
            name: {
                fa: "مفتول گالوانیزه فنر صحافی",
                ar: "سلك مجلفن لزنبرك التجليد"
            },
            type: {
                fa: "ضخامت 1.0 میلی‌متر",
                ar: "سماكة 1.0 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "galvanized_1mm"
        },

        {
            row: 6,
            name: {
                fa: "مفتول گالوانیزه فنر صحافی",
                ar: "سلك مجلفن لزنبرك التجليد"
            },
            type: {
                fa: "ضخامت 1.2 میلی‌متر",
                ar: "سماكة 1.2 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "galvanized_1.2mm"
        },

        {
            row: 7,
            name: {
                fa: "مفتول گالوانیزه فنر صحافی",
                ar: "سلك مجلفن لزنبرك التجليد"
            },
            type: {
                fa: "ضخامت 1.5 میلی‌متر",
                ar: "سماكة 1.5 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "galvanized_1.5mm"
        },

        {
            row: 8,
            category: {
                fa: "مفتول آنیل شده",
                ar: "سلك مُلدَّن"
            },
            name: {
                fa: "مفتول آنیل شده",
                ar: "سلك مُلدَّن"
            },
            type: {
                fa: "ضخامت 1.5 میلی‌متر",
                ar: "سماكة 1.5 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "annealed_1.5mm"
        },

        {
            row: 9,
            name: {
                fa: "مفتول آنیل شده",
                ar: "سلك مُلدَّن"
            },
            type: {
                fa: "ضخامت 1.8 میلی‌متر",
                ar: "سماكة 1.8 مم"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "annealed_1.8mm"
        },

        {
            row: 10,
            category: {
                fa: "پشم آهن (سیم ظرفشویی) صنعتی",
                ar: "صوف الحديد الصناعي"
            },
            name: {
                fa: "پشم آهن (سیم ظرفشویی) صنعتی",
                ar: "صوف الحديد الصناعي"
            },
            type: {
                fa: "بسته 500 گرمی",
                ar: "عبوة 500 غرام"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "wool_500g"
        },

        {
            row: 11,
            name: {
                fa: "پشم آهن (سیم ظرفشویی) صنعتی",
                ar: "صوف الحديد الصناعي"
            },
            type: {
                fa: "بسته 1 کیلوگرمی",
                ar: "عبوة 1 كيلوغرام"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "wool_1kg"
        },

        {
            row: 12,
            name: {
                fa: "پشم آهن (سیم ظرفشویی) صنعتی",
                ar: "صوف الحديد الصناعي"
            },
            type: {
                fa: "بسته 10 کیلوگرمی",
                ar: "عبوة 10 كيلوغرام"
            },
            unit: {
                fa: "کیلوگرم",
                ar: "كيلوغرام"
            },
            priceKey: "wool_10kg"
        }

    ];

    let html = '';
    let lastCategory = '';

    priceProducts.forEach(product => {

        if (product.category) {

            const categoryTitle = product.category[currentLang];

            if (categoryTitle !== lastCategory) {

                html += `
                <tr class="category-row">
                    <td colspan="6">
                        <strong>${categoryTitle}</strong>
                    </td>
                </tr>
                `;

                lastCategory = categoryTitle;
            }
        }

        const price = prices[product.priceKey] || 0;

        html += `
        <tr>
            <td>${product.row}</td>
            <td>${product.name[currentLang]}</td>
            <td>${product.type[currentLang]}</td>
            <td>${product.unit[currentLang]}</td>
            <td class="price">${price.toLocaleString()}</td>
            <td>
                <a href="index.html#contact" class="price-order">
                    ${t.price_request}
                </a>
            </td>
        </tr>
        `;
    });

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
document.addEventListener('DOMContentLoaded', async () => {

    await loadTranslations();
    switchLanguage(currentLang);

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
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateNumbers();
                        observer.disconnect();
                    }
                });
            });

            observer.observe(statsSection);
        }
    }

    if (isPricePage) {
        initPriceTheme();
        initMobileMenu();
        await loadPrices();
    }

});