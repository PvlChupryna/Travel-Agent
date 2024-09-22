function mobileNav() {
	// Mobile nav button
	const navBtn = document.querySelector('.mobile-nav-btn');
	const nav = document.querySelector('.mobile-nav');
	const menuIcon = document.querySelector('.nav-icon');
	const menuLinks = document.querySelectorAll('.mobile-nav a');
	const navList = document.querySelector('.mobile-nav__list'); // Элемент списка

	// Функция для закрытия меню
	function closeMenu() {
		nav.classList.remove('mobile-nav--open');
		menuIcon.classList.remove('nav-icon--active');
		document.body.classList.remove('no-scroll');
	}

	// Обработчик для кликов вне списка меню
	function outsideClickHandler(e) {
		if (!navList.contains(e.target) && !navBtn.contains(e.target)) {
			closeMenu();
			document.removeEventListener('click', outsideClickHandler); // Удаляем обработчик после закрытия
		}
	}

	navBtn.onclick = function () {
		nav.classList.toggle('mobile-nav--open');
		menuIcon.classList.toggle('nav-icon--active');
		document.body.classList.toggle('no-scroll');

		// Добавляем обработчик кликов вне меню только при открытии меню
		if (nav.classList.contains('mobile-nav--open')) {
			setTimeout(() => {
				document.addEventListener('click', outsideClickHandler);
			}, 0); // Небольшая задержка, чтобы избежать немедленного закрытия
		}
	};

	// Закрытие меню при клике на пункт меню с задержкой
	menuLinks.forEach(link => {
		link.onclick = function (e) {
			e.stopPropagation(); // Останавливаем всплытие, чтобы не сработал клик на документ
			setTimeout(() => {
				closeMenu();
				document.removeEventListener('click', outsideClickHandler); // Удаляем обработчик при клике на пункт
			}, 500); // Задержка в 0.5 секунд
		};
	});
}

export default mobileNav;
