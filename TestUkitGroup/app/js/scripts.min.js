const link = document.querySelector('.mob-link');
const menu = document.querySelector('.header-content__menu');

link.addEventListener('click', function(){
	link.classList.toggle('mob-link_active');
	menu.classList.toggle('header-content__menu_active');
})