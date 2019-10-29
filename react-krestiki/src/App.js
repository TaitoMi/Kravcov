import React from 'react';
import './App.css';
import Item from './Item';
import classNames from 'classnames'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playfield: ['', '', '',
									'', '', '',
									'', '', ''],
			playerFirst: true,
			winner: null,
		};
	}

	playfieldChange = (idx) => () => {
		const { playfield, playerFirst } = this.state;
		if (playfield[idx] !== '') {
			alert('Тут уже занято');
			return;
		}
		const newField = playfield;
		const curStep = playerFirst ? 'X' : 'O'
		newField[idx] = curStep;
		this.setState({playField: newField, playerFirst: !playerFirst}, () => this.winCondition(curStep));
	}

	closeModal = (e) => {
		e.preventDefault();
		const { winner } = this.state;
		this.setState({ winner: null});
	}

	clearPlayfield = (e) => {
		e.preventDefault();
		const { playField } = this.state;
		const newArr = playField.map((el) => '');
		this.setState({ playfield: newArr, winner: null, playerFirst: true });
	}

	winCondition = (item) => {
		const { playField, playerFirst } = this.state;
		if ( (playField[0] === item && playField[1] === item && playField[2] === item) ||
				 (playField[3] === item && playField[4] === item && playField[5] === item) ||
				 (playField[6] === item && playField[7] === item && playField[8] === item) ||
				 (playField[0] === item && playField[4] === item && playField[8] === item) ||
				 (playField[6] === item && playField[4] === item && playField[2] === item) ||
				 (playField[0] === item && playField[3] === item && playField[6] === item) ||
				 (playField[1] === item && playField[4] === item && playField[7] === item) ||
				 (playField[2] === item && playField[5] === item && playField[8] === item)
		) {
			const player = !playerFirst ? 'Первый' : 'Второй';
			this.setState({ winner: player});
			return;
		} 
		const check = playField.filter((el) => el === '');
		if (check.length < 1) {			
			this.setState({ winner: 'Ничья'});
		}
	}

	render() {
		const { playfield, playerFirst, winner } = this.state;
		const modalClass = classNames({
			modal: true,
			'modal-active': winner,
		});
		let resultWinner = '';
		if (winner === 'Ничья') {
			resultWinner = <h1>Ничья ! ! !</h1>;
		} else {
			resultWinner =<h1>Победил {winner} ! ! !</h1>; 
		}
		const modal = (
			<div className={modalClass}>
				<a href='#' onClick={this.closeModal} className='modal__close'>Close</a>
				{resultWinner}
				<a href='#' onClick={this.clearPlayfield}>Сыграть еще раз</a>
			</div>
		)
		return(
			<>
				{winner ? modal : null}
				<h1 className='game__title'>Ходит {playerFirst ? 'Первый' : 'Второй'} игрок</h1>
				<div className="game">
					{playfield.map((item, i) => <Item key={i} curIdx={i} toClick={this.playfieldChange} currentBox={item} />)}
				</div>
			</>
		); 
	}
}
