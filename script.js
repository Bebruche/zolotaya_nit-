// Бургер-меню
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navOverlay = document.getElementById('navOverlay');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMobile.classList.toggle('active');
        navOverlay.classList.toggle('active');
    });
}

// Закрытие меню при клике на ссылку
navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        navOverlay.classList.remove('active');
    });
});

// Закрытие меню при клике на фон
navOverlay.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMobile.classList.remove('active');
    navOverlay.classList.remove('active');
});

// Smooth scroll для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Подсветка активного пункта меню при скролле
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200) {
            current = section.getAttribute('id');
        }
    });

    // Проверка на футер/низ страницы
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        current = sections[sections.length - 1].getAttribute('id');
    }

    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
        if (current) {
            a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
        } else {
            a.classList.remove('active');
        }
    });

    // Показываем кнопку "вернуться наверх"
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
});

// Клик на кнопку "вернуться наверх"
document.getElementById('scroll-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer для анимации появления элементов
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .portfolio-item').forEach(el => {
    observer.observe(el);
});