const sort = document.querySelectorAll('.nav__item');
const prodItems = document.querySelectorAll('.products__item');

for (let i = 0; i < sort.length; i++) {
	sort[i].addEventListener('click', function() {
		let attrClick = sort[i].getAttribute('data-sort');
		for (let a = 0; a < sort.length; a++) {
			sort[a].classList.remove('nav__item_active');
		}
		sort[i].classList.toggle("nav__item_active");
		for (let a = 0; a < prodItems.length; a++) {
			let attrProd = prodItems[a].getAttribute('data-sort');
			if (attrClick != attrProd) {
				prodItems[a].style.display = 'none';
			}
			if (attrClick == attrProd || attrClick == 'all') {
				prodItems[a].style.display = 'flex';
			}
		}
	});
}

const mobMenu = document.querySelector('.mobMenu'),
			mobClick = document.querySelector('.mobClick'),
			span = document.querySelector('.mobClick > span');
mobClick.addEventListener('click', function() {
	mobMenu.classList.toggle('mobMenu_active');
	span.classList.toggle('span_active');
});
