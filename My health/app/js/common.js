const headerBg = document.querySelector('.header');
const sliderBtn = document.querySelector('.content__sliderBtn');
const sliderToggle = document.querySelectorAll('.toggle');
const content = document.querySelectorAll('.content__wrap');
sliderBtn.addEventListener('click', function() {
	headerBg.classList.toggle('header_active');
	for(let i = 0; i < content.length; i++) {
		content[i].classList.toggle('content__wrap_hidden');
		sliderToggle[i].classList.toggle('toggle_active');
	}
})

const mobBtn = document.querySelector('.mobile__btn');
const spanBtn = document.querySelector('.mobile__btn_x');
const mobMenu = document.querySelector('.menu');

mobBtn.addEventListener('click', function () {
	mobBtn.classList.toggle('mobile__btn_active');
	spanBtn.classList.toggle('mobile__btn_x_active');
	mobMenu.classList.toggle('menu_active');
})