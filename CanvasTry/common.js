const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const coords = [];
let color = 'black';
let colorPicked = 'black';
const colorChoice = document.querySelectorAll('.colorpick > span');
for ( let i = 0; i < colorChoice.length; i++) {
	colorChoice[i].addEventListener('click', function() {
		colorPicked = colorChoice[i].getAttribute('data-color');
		ctx.beginPath();
		color = colorPicked;
		document.querySelector('.current > span').style.backgroundColor = colorPicked;
	})
}
canvas.addEventListener('click', function(e) {
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	if (coords.length == 0) {
		ctx.moveTo(e.offsetX, e.offsetY);
	} 
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	coords.push([e.offsetX, e.offsetY]);
	moveTo(coords[coords.length - 2][0], coords[coords.length - 2][1]);	
	if (coords.length > 2) {
		ctx.moveTo(coords[coords.length - 3][0], coords[coords.length - 3][1]);
		ctx.lineTo(e.offsetX, e.offsetY);
		ctx.stroke();
	}	
})