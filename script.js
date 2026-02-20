document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка формы подписки
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input');
            const email = emailInput.value.trim();

            // Простая валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }

            // Имитация успешной отправки
            emailInput.value = '';
            alert(`Спасибо! Подписка на email ${email} оформлена успешно. Вы будете получать наши новости и советы по уходу за растениями.`);
        });
    }

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Наблюдаем за карточками постов и секциями
    document.querySelectorAll('.post-card, .section-title, .hero').forEach(el => {
        observer.observe(el);
    });

    // Мобильное меню (для адаптивности)
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.addEventListener('click', () => {
        document.querySelector('.main-nav ul').classList.toggle('active');
    });

    // Добавляем кнопку мобильного меню, если экран маленький
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.site-header .container');
        header.appendChild(mobileMenuToggle);
    }
});
