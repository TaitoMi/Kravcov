const options = document.querySelector('.year__options');

for(let i = 1960; i <= 2015; i++) {
	let li = document.createElement('li');
	li.innerText = i;
	li.setAttribute('data-year', i);
	options.appendChild(li);
}

const optionsBtn = document.querySelector('.year__btn');

optionsBtn.addEventListener('click', () => {
	document.querySelector('.year__options').classList.toggle('year__options-active');	
})
const year = document.querySelectorAll('.year__options > li');
for(let i = 0; i < year.length; i++) {
	year[i].addEventListener('click', () => {
		let dataYear = year[i].getAttribute('data-year');
		document.querySelector('.year > span').innerText = dataYear;
		document.querySelector('.year').setAttribute('data-value', dataYear);
		document.querySelector('.year__options').classList.toggle('year__options-active');	
	})
}

const label = document.querySelectorAll('label'),
			check = document.querySelectorAll('label > input');
for (let i = 0; i < label.length; i++) {
	label[i].addEventListener('click', () => {
		if (check[i].checked == true) {
			label[i].classList.add('active');
		}	else {
			label[i].classList.remove('active');
		}
	})
	if (check[i].checked == true)	label[i].classList.add('active');
	
}

function range() {
	let val = document.querySelector('.js__range').value;
	console.log(val);
	document.querySelector('.js__range').style.background = '-webkit-linear-gradient(left, #ccb1f1 0%, #44408f '+val+'%, #FFF '+val+'%, #fff 100%)';
}

const header = document.querySelector('.header');
const mobBtn = document.querySelector('.header__mobBtn');
const lines = document.querySelector('.header__lines');
const overlay = document.querySelector('.overlay');

mobBtn.addEventListener('click', () => {
	header.classList.toggle('header-active');
	lines.classList.toggle('header__lines-active');
	overlay.classList.toggle('overlay-active');
})
overlay.addEventListener('click', () => {
	header.classList.toggle('header-active');
	lines.classList.toggle('header__lines-active');
	overlay.classList.toggle('overlay-active');
})