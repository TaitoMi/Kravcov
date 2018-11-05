"use strict";
//Фильтр по парамтерам
function newFilter(mansFloor, sex) {
	let selectItem = document.getElementById('roomsCountFilter');
	//кол-во комнат
	let countRooms = selectItem[selectItem.selectedIndex].value;

	//дополнительно
	let checkbox = document.querySelectorAll('.filter > .checkbox');
	let extra = [];
	let j = 0;
	for(let i = 0; i < checkbox.length;i++)	{
		if(checkbox[i].checked) {
			extra[j++] = checkbox[i].value;
		}
	}
	//выбраный этаж
	let floor = document.getElementById('floorFilter').value;
	let extraFilter = true, floorFilter = true, countRoomsFilter = true;
	
	if(extra.length == 0)
		extraFilter = false;
	if(floor == "")
		floorFilter = false;
	if(countRooms == 'Выбрать')
		countRoomsFilter = false;


	var filtred = [];
	for(let i = 0; i < mansFloor.length; i++)	{
		filtred.push(mansFloor[i].rooms.filter(function(man) {
			let comparer = 0;
			for(let k = 0; k < extra.length;k++) {
				for(let o = 0; o < man.extra.length;o++) {
					if(extra[k] == man.extra[o]) {
						comparer++;
						break;
					}
				}
			}			
			let result = true;
			if(extraFilter)
				result = result && comparer == extra.length;
			if(floorFilter)
				result = result && man.floor == floor;
			if(countRoomsFilter)
				result = result && man.countRooms == countRooms;

			return man.sex == sex && result;
		}));
	}
	for(let i = 0; i < filtred.length;i++) {
		let imgs  = document.querySelectorAll('.home__floor' + [i + 1] + ' > .home__floor_window > img');
		for(let j = 0; j < imgs.length;j++){
			imgs[j].classList.add('d-none');
		}
		for(let j = 0; j < filtred[i].length; j++) {
			let man = filtred[i][j];
			imgs[man.indexRoom].classList.remove('d-none');
		}
	}
}

function initFilter() {
	let reset = document.getElementById('resetFilter');
	reset.addEventListener('click', function() {
	let imgs = document.querySelectorAll('.home__floor_window > img');

	for(let i = 0; i < imgs.length;i++)	{
		imgs[i].classList.remove('d-none');
	}	
})

	let name = document.getElementById("name");
	let spanName = document.getElementById('nameError');
	name.addEventListener('keyup', function() {
		if(!name.value.match(/^[A-Za-zА-ЯЁа-яё]+$/)) {
			name.classList.add('input__error');
			spanName.classList.add('span__input-error');
		} else {
			name.classList.remove('input__error');
			spanName.classList.remove('span__input-error');
		}
	})
	let floorInput = document.getElementById("floor");
	let spanFloor = document.getElementById('floorError');
	floorInput.addEventListener('keyup', function() {
		if(floorInput.value > 5 || floorInput.value < 1 
			|| floorInput.value == '' || floorInput.value.match(/^[A-Za-zА-ЯЁа-яё]+$/))	{
			floorInput.classList.add('input__error');
			spanFloor.classList.add('span__input-error');
		}
		else {
			floorInput.classList.remove('input__error');
			spanFloor.classList.remove('span__input-error');
		}
	})
	let roomsInput = document.getElementById("roomsCount");
	let spanRooms = document.getElementById('roomsError');
	roomsInput.addEventListener('change', function() {
		if(roomsInput.value == 'Выбрать')	{
			roomsInput.classList.add('input__error');
			spanRooms.classList.add('span__input-error');
		}
		else {
			roomsInput.classList.remove('input__error');
			spanRooms.classList.remove('span__input-error');
		}
	})

	let mansInput = document.getElementById("mansCount");
	let spanMans = document.getElementById('peopleError');
	mansInput.addEventListener('change', function() {
		if(mansInput.value == 'Выбрать') {
			mansInput.classList.add('input__error');
			spanMans.classList.add('span__input-error');
		}
		else {
			mansInput.classList.remove('input__error');
			spanMans.classList.remove('span__input-error');
		}
	})
}

function Man(name,floor,sex,extra,countRooms,people,indexRoom) {
	return {
		name: name,
		floor: floor,
		sex: sex,
		extra: extra,
		countRooms: countRooms,
		people: people,
		indexRoom: indexRoom
	}
};

function floor() {
	return {
		rooms : []
	}
}

function addLodger(mansFloor) {
	let name = document.getElementById("name").value;
	if(!name.match(/^[A-Za-zА-ЯЁа-яё]+$/)) {
		return;
	}
	let sex = document.getElementById('sexCheck').checked ? ('female') : ('male');
	let idFloor = document.getElementById("floor").value;
	if(idFloor > 5 || idFloor < 1 || idFloor == '')	{
		return;
	}	
	let selectItem = document.getElementById('roomsCount');
	let countRooms = selectItem[selectItem.selectedIndex].value;
	if(countRooms == 'Выбрать')	{
		return;
	}
	let checkbox = document.querySelectorAll('.new-man > .checkbox');
	let extra = [];
	let j = 0;
	for(let i = 0; i < checkbox.length;i++)	{
		if(checkbox[i].checked) {
			extra[j++] = checkbox[i].value;
		}
	}
	selectItem = document.getElementById('mansCount');
	let people = selectItem[selectItem.selectedIndex].value;
	if(people == 'Выбрать')	{
		return;
	}
	let floor = mansFloor[5 - idFloor];
		let index = floor.rooms.length;
		if(index == 3) {
			alert("Этаж ЗАНЯТ!");
			return;
		}		
		let floorDivs = document.querySelectorAll('.home__floor'+[6 - idFloor] + '> .home__floor_window');
		let img = document.createElement('img');
		img.setAttribute('src','img/' + sex + '.png');
		img.setAttribute('data-sex', sex);
		floorDivs[index].appendChild(img);

		floor.rooms[index] = Man(name,idFloor,sex,extra,countRooms,people,index);
		return mansFloor;
}

let mansFloor = [];
initFilter();

let floors = document.getElementsByClassName('home__floor');
let modal = document.getElementById('modal');

for (let i = 0; i < floors.length; i++) {
	mansFloor[i] = floor();

	let rooms = document.querySelectorAll('.home__floor' + [i + 1] + ' > .home__floor_window');
	
	for(let j = 0; j < rooms.length;j++) {
		rooms[j].addEventListener('click', function() {	
			if(mansFloor[i].rooms.length == 0) {
				alert("Этот этаж пуст");
				return;
			}

			if(mansFloor[i].rooms[j] == undefined) {
				alert("Эта комната пуста");
				return;
			}

			modal.classList.add("modal_active");
			let modalSex = document.getElementById('modalSex'),
					modalFloor = document.getElementById('modalFloor'),
					modalRooms = document.getElementById('modalRooms'),
					modalExtra = document.getElementById('modalExtra'),
					modalPeople = document.getElementById('modalPeople'),
					modalName = document.getElementById('modalName');
			
			
			let man = mansFloor[i].rooms[j];
			modalSex.innerHTML = man.sex == 'male' ? ('Мужской') : ("Женский");
			document.getElementById('imgSex').setAttribute('src','img/' + man.sex + '.png');
			modalFloor.innerHTML = man.floor;
			modalRooms.innerHTML = man.countRooms;
			modalExtra.innerHTML = man.extra;
			modalPeople.innerHTML = man.people;
			modalName.innerHTML = man.name;
		})
	}
}
let closeButton = document.getElementsByClassName('modal__close');
	closeButton[0].addEventListener('click', function() {
		modal.classList.remove('modal_active');
	})

let sex = 'male';
let sexChoice = document.querySelectorAll(".sex__choice");
for (let i = 0; i < sexChoice.length; i++) {
	sexChoice[i].addEventListener('click', function() {
		sex = sexChoice[i].getAttribute('data-sex');
	})
}

let sexChoices = document.getElementById('sexFilter');
sexChoices.addEventListener('click', function () {
sex = sexChoices.checked ? ('female') : ('male');
newFilter(mansFloor, sex);
});
let selectItems = document.getElementById('roomsCountFilter');
selectItems.addEventListener('change', function(){
	newFilter(mansFloor, sex);
});

let checkboxs = document.querySelectorAll('.filter > .checkbox');
for(let i = 0; i < checkboxs.length; i++) {
checkboxs[i].addEventListener('click', function(){
	newFilter(mansFloor, sex);
});
}

document.getElementById('floorFilter').addEventListener('keyup', function(){
	newFilter(mansFloor, sex);
});

let button = document.getElementById("addMan");
button.addEventListener('click', function() {
	mansFloor = addLodger(mansFloor);
})

/// Tabs
let tabsLink = document.querySelectorAll('.tabs > li'),
		tabsContent = document.querySelectorAll('.tabs-content');
for (let i = 0; i < tabsLink.length; i++) {
	(function (i) {
		let link = tabsLink[i];
		
		link.addEventListener('click', function() {
			if (tabsLink[0].classList.contains('tabs__btn_active')) {
				tabsLink[0].classList.remove('tabs__btn_active');
				tabsLink[i].classList.add('tabs__btn_active');
			}
			if (tabsLink[1].classList.contains('tabs__btn_active')) {
				tabsLink[1].classList.remove('tabs__btn_active');
				tabsLink[i].classList.add('tabs__btn_active');
			}
			for (let j = 0; j < tabsContent.length; j++) {
				if (tabsContent[j].classList.contains('tabs-content_active'))	{
					tabsContent[j].classList.remove('tabs-content_active');
				}			
			}
			tabsContent[i].classList.add('tabs-content_active');
		});
	}) (i);
}
	
// Day/Night switch
let daySwitcher = document.getElementById('togSwitcher'),
		home = document.getElementById('home');
daySwitcher.addEventListener('click', function() {
	if (home.classList.contains('night')) {		
		home.classList.remove('night')
	}
	else {
		home.classList.add('night');
	}
})

window.addEventListener('load', function() {
	var lodgers = localStorage.getItem('lodgers');
	mansFloor = JSON.parse(lodgers);
	if(mansFloor == null)	{
		mansFloor =[];
		for(let i = 0; i < 5;i++)		{
			mansFloor[i] = floor();
		}
		return;
	}
	for(let i = mansFloor.length - 1; i >= 0; i--) {
		let floorDivs = document.querySelectorAll('.home__floor'+[1 + i] + '> .home__floor_window');
		for(let j = 0; j < mansFloor[i].rooms.length;j++)	{
			let sex = mansFloor[i].rooms[j].sex;
			let img = document.createElement('img');
			img.setAttribute('src','img/' + sex + '.png');
			img.setAttribute('data-sex', sex);
			floorDivs[j].appendChild(img);
		}
	}
})

window.addEventListener('unload', function() {
	var value = JSON.stringify(mansFloor);
	this.localStorage.setItem('lodgers', value);
})
