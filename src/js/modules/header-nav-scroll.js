
function navigation() {
    const links = document.querySelectorAll('.nav__elem');
    const sections = document.querySelectorAll('.section'); // Учитываем все секции
    const header = document.querySelector('.header');

    // Функция для адаптивного threshold
    function getAdaptiveThreshold() {
        if (window.innerWidth < 550) {
            return 0.1; // Для экранов меньше 550px порог 0.3
        } else if (window.innerWidth < 768) {
            return 0.3; // Для экранов меньше 768px порог 0.5
        } else {
            return 0.4; // Для экранов больше 768px порог 0.7
        }
    }

    // Функция для проверки видимости последней секции
    function isLastSectionInView(entry) {
        const rect = entry.target.getBoundingClientRect();
        return rect.bottom <= window.innerHeight;
    }

    // Callback для IntersectionObserver
    const cb = (entries) => {
        entries.forEach(entry => {
            // Проверяем, что секция видна и пересекает область видимости более чем на заданный порог
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                // Убираем класс is-current у всех пунктов меню
                links.forEach(link => link.classList.remove('is-current'));

                const currentId = entry.target.id;
                const currentLink = document.querySelectorAll(`.nav__elem[href="#${currentId}"]`);

                // Добавляем класс is-current только к пункту, соответствующему видимой секции
                if (currentLink) {
                    //currentLink.classList.add('is-current');
                    currentLink.forEach((link) => {
                        link.classList.add('is-current');
                    })
                }

                // Проверка видимости последней секции
                if (isLastSectionInView(entry)) {
                    console.log("Последняя секция на экране!");
                }
            }
        });
    };

    // Создаем IntersectionObserver с адаптивным threshold
    const sectionObserver = new IntersectionObserver(cb, {
        threshold: getAdaptiveThreshold(), // Используем адаптивный порог видимости
    });

    // Наблюдаем за каждой секцией
    sections.forEach((section) => sectionObserver.observe(section));

    // Добавляем плавный переход по якорям с учетом высоты шапки + 40px
    links.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href').replace('#', '');
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const headerHeight = header ? header.clientHeight : 0;

                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight - 40, // Корректируем прокрутку на высоту шапки + 40px
                    behavior: 'smooth',
                });
            }
        });
    });

    // Обработчик изменения размера экрана для обновления threshold
    window.addEventListener('resize', () => {
        sectionObserver.disconnect(); // Отключаем предыдущий observer
        const newThreshold = getAdaptiveThreshold();
        const newObserver = new IntersectionObserver(cb, { threshold: newThreshold });
        sections.forEach((section) => newObserver.observe(section));
    });
}


export default navigation;
