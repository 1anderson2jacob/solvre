import { useEffect, useState, useCallback } from 'react'
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

	const numRows = 6;
	const arrSize = 5;
	
	const atBeginning = useCallback(() => {
		if (gridPos.row === 0 && gridPos.index === 0){
			return true
		} else {
			return false
		}
	}, [gridPos])

	const moveLeft = useCallback(() => {
		if (!atBeginning()) {
			if (gridPos.index > 0) {
				setGridPos(prevState => {
					return {
						...prevState,
						index: prevState.index - 1
					}
				});
			} else {
				setGridPos(prevState => {
					return {
						row: prevState.row - 1,
						index: arrSize-1,
					}
				})
			}					
		}
	}, [atBeginning, gridPos.index])

	const moveRight = useCallback(() => {
		if (gridPos.index < arrSize-1) {
			setGridPos(prevState => {
				return { 
					...prevState,
					index: prevState.index + 1
				}
			})
		} else if (gridPos.row < numRows-1) { 
			setGridPos(prevState => {
				return {
					row: prevState.row + 1,
					index: 0
				}
			})
		}
	}, [gridPos])
	
	useEffect(() => {
    function handleKeyDown(e) {
			e.preventDefault()
			//a-z
			if ((e.keyCode > 64 && e.keyCode < 91)) {

				setRow(prevState => {
					const currentRow = prevState[gridPos.row]
					currentRow[gridPos.index] = e.key
					return ({
						...prevState,
						[gridPos.row]: currentRow
					})
				})

				moveRight();
				
			} 
			//backspace
			else if (e.keyCode === 8) {
				
				setRow(prevState => {
					const value = prevState[gridPos.row]
					value[gridPos.index] = ''
					return ({
						...prevState,
						[gridPos.row]: value
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
  }, [row, gridPos, moveLeft, moveRight]);

	function handleClick(r, t) {
		console.log('row: ', r)
		console.log('tile: ', t)
		setGridPos(prevState => {
			return {
				row: r,
				index: t,
			}
		})
	}
	
	let rows = [];
	
	for (let i = 0; i < numRows; i++) {
		rows.push(<Row 
			key={`row-${i}`} 
			letters={row[i]} 
			row={i} 
			highlighted={gridPos}
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