import React from 'react';
import classNames from 'classnames'

export default class Item extends React.Component {
	render() {
		const { curIdx, currentBox, toClick } = this.props;
		let classes = classNames({
			'game__item': true,
			'game__item-cross': currentBox === 'X',
			'game__item-circle':  currentBox === 'O',
		});
		return(
			<div className={classes} onClick={toClick(curIdx)}></div>
		);
	}
}