let items = document.querySelectorAll('.item'),
		player = document.getElementById('player');
console.log( items );
let odd = 0;
var win = [
	'', '', '',
	'', '', '',
	'', '', '',
];
for (let i = 0; i < items.length; i++){
		items[i].onclick = function (){
			if (odd != 1) {
					if (win[i]=='X' || win[i]=='O'){
						console.log('Тут уже тыкнуто');
					}
					else {
						player.innerHTML = 'Ходит второй игрок';
						items[i].innerHTML = 'X';
						odd++;
						win[i] = 'X';
					}					
				}			
			else {
				player.innerHTML = 'Ходит первый игрок';
				items[i].innerHTML = 'O';
				odd--;
				win[i] = 'O';
			}	
			if ((win[0]==='X' && win[1]==='X' && win[2]==='X')
			|| (win[3]==='X' && win[4]==='X' && win[5]==='X') 
			|| (win[6]==='X' && win[7]==='X' && win[8]==='X') 
			|| (win[0]==='X' && win[3]==='X' && win[6]==='X')
			|| (win[1]==='X' && win[4]==='X' && win[7]==='X') 
			|| (win[2]==='X' && win[5]==='X' && win[8]==='X') 
			|| (win[0]==='X' && win[4]==='X' && win[8]==='X')
			|| (win[2]==='X' && win[4]==='X' && win[6]==='X')) 
			{						
				win = [
					'', '', '',
					'', '', '',
					'', '', '',
				];		
				for (let i = 0; i<items.length; i++){
					items[i].innerHTML = '';
				}
				player.innerHTML = 'Победил первый игрок';
			}	
			if ((win[0]==='O' && win[1]==='O' && win[2]==='O')
			|| (win[3]==='O' && win[4]==='O' && win[5]==='O') 
			|| (win[6]==='O' && win[7]==='O' && win[8]==='O') 
			|| (win[0]==='O' && win[3]==='O' && win[6]==='O')
			|| (win[1]==='O' && win[4]==='O' && win[7]==='O') 
			|| (win[2]==='O' && win[5]==='O' && win[8]==='O') 
			|| (win[0]==='O' && win[4]==='O' && win[8]==='O')
			|| (win[2]==='O' && win[4]==='O' && win[6]==='O')) 
			{						
				win = [
					'', '', '',
					'', '', '',
					'', '', '',
				];
				for (let i = 0; i<items.length; i++){
					items[i].innerHTML = '';
				}
				player.innerHTML = 'Победил второй игрок';
			}
		}
}
document.getElementById('reset').onclick = function (){
	for (let i = 0; i<items.length; i++){
		items[i].innerHTML = '';
		win = [
			'', '', '',
			'', '', '',
			'', '', '',
		];
	}	
	player.innerHTML = 'Ходит первый игрок';
	console.log(win);
}
