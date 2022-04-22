import { useEffect, useState, useCallback } from 'react'
import Row from './Row'
import Keyboard from './keyboard/Keyboard.js'
import './Board.css';

function Board() {
	const [grid, setGrid] = useState(
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
	let gridRows = [];

	const moveUp = useCallback(() => {
		if(gridPos.row !== 0) {
			 setGridPos(prevState => {
				 return {
					 ...prevState,
					 row: prevState.row - 1
				 }
			 })
		}
	}, [gridPos.row])

	const moveDown = useCallback(() => {
		if(gridPos.row < numRows-1) {
			setGridPos(prevState => {
				return {
					...prevState,
					row: prevState.row + 1
				}
			})
	 }
	}, [gridPos.row])

	const moveLeft = useCallback(() => {
		if (!(gridPos.row === 0 && gridPos.index === 0)) {
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
	}, [gridPos])

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
	
	const addLetter = useCallback((letter) => {
		//pass e.key
		setGrid(prevState => {
			const currentRow = prevState[gridPos.row]
			currentRow[gridPos.index] = letter 
			return ({
				...prevState,
				[gridPos.row]: currentRow
			})
		})

		moveRight();		
	}, [gridPos, moveRight])

	const removeLetter = useCallback((letter) => {
		setGrid(prevState => {
			const value = prevState[gridPos.row]
			value[gridPos.index] = ''
			return ({
				...prevState,
				[gridPos.row]: value
			})
		})
		
		moveLeft();
	}, [gridPos, moveLeft])

	useEffect(() => {
    function handleKeyDown(e) {
			e.preventDefault()
			//a-z
			if ((e.keyCode > 64 && e.keyCode < 91)) {
				addLetter(e.key)	
			} 
			//backspace
			else if (e.keyCode === 8) {
				removeLetter()
			}
			//left arrow
			else if (e.keyCode === 37) {
				moveLeft();
			}
			//up arrow
			else if (e.keyCode === 38) {
				moveUp();
			}
			//right arrow
			else if (e.keyCode === 39) {
				moveRight();
			}
			//down arrow
			else if (e.keyCode === 40) {
				moveDown();
			}
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [addLetter, removeLetter, moveLeft, moveRight, moveUp, moveDown]);

	function handleClick(r, i) {
		setGridPos({
			row: r, 
			index: i
		})
	}
	
	function handleKeyboardClick(letter) {
		if (letter === 'BACKSPACE') {
			removeLetter()
		} else if (letter === 'ENTER') {

		} else {
			addLetter(letter)
		}
	}
	
	for (let i = 0; i < numRows; i++) {
		gridRows.push(
		<Row 
			key={`row-${i}`} 
			letters={grid[i]} 
			row={i} 
			highlighted={gridPos}
			handleClick={handleClick}>
		</Row>)
	}
	
	return (
		<div>
			<div className="board-container">
				<div className="Board">
					{gridRows}
				</div>
			</div>
			<div className="keyboard-container">
				<Keyboard handleClick={handleKeyboardClick}></Keyboard>
			</div>
		</div>
	)
}

export default Board;