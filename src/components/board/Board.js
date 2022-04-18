import { useEffect, useState, useRef } from 'react'
import Row from './Row'
import './Board.css';

function Board() {
	const [row, setRow] = useState(
	{
		0: ['','','','',''],
		1: ['','','','',''],
		2: ['','','','',''],
		3: ['','','','',''],
		4: ['','','','',''],
		5: ['','','','',''],
	});
	const [gridPos, setGridPos] = useState({ row: 0, index: 0})
	let posRef = useRef({ row: 0, index: 0})

	const numRows = 6;
	const arrSize = 5;
	
	function atBeginning() {
		if (posRef.current.row === 0 && posRef.current.index === 0){
			return true
		} else {
			return false
		}
	}

	function moveLeft() {
		if (!atBeginning()) {
			if (posRef.current.index > 0) {
				posRef.current.index--;
			} else {
				posRef.current.row--;
				posRef.current.index = arrSize-1;
			}					
		}
	}

	function moveRight() {
		if (posRef.current.index < arrSize-1) {
			posRef.current.index++;
		} else if (posRef.current.row < numRows-1){ 
			posRef.current.row++;
			posRef.current.index = 0;
		}
	}
	
	useEffect(() => {
    function handleKeyDown(e) {
			e.preventDefault()
			//a-z
			if ((e.keyCode > 64 && e.keyCode < 91)) {
				
				// if (row[0][0] !== '') {
				// 	moveRight();
				// }

				setRow(rows => {
					const value = rows[posRef.current.row]
					value[posRef.current.index] = e.key
					return ({
						...rows,
						[posRef.current.row]: value
					})
				})

				moveRight();
				
			} 
			//backspace
			else if (e.keyCode === 8) {
				
				setRow(rows => {
					const value = rows[posRef.current.row]
					value[posRef.current.index] = ''
					return ({
						...rows,
						[posRef.current.row]: value
					})
				})
				
				moveLeft();
			}
			//left arrow
			else if (e.keyCode === 37) {
				console.log('left arrow')
				moveLeft();
			}
			//right arrow
			else if (e.keyCode === 39) {
				console.log('right arrow')
				moveRight();
			}
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [row]);

	function handleClick(r, t) {
		console.log('row: ', r)
		console.log('tile: ', t)
		posRef.current = {
			row: r,
			index: t,
		}
	}
	
	let rows = [];
	
	for (let i = 0; i < 6; i++) {
		rows.push(<Row 
			key={`row-${i}`} 
			letters={row[i]} 
			row={i} 
			highlighted={posRef.current}
			handleClick={handleClick}>
		</Row>)
	}
	
	return (
		<div className="Board">
			{rows}
		</div>
	)
}

export default Board;


/*
todo 
	1) switch posRef to useState object, so that the highlighted shows
		immediately
*/
