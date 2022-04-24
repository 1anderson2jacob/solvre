import { useEffect } from 'react'
import Row from './Row'
import Keyboard from './keyboard/Keyboard.js'
import './Board.css';
import useGrid from './hooks/useGrid'

function Board() {
	const { grid, gridPos, setGridPos, 
					moveUp, moveDown, moveLeft, 
					moveRight, addLetter, removeLetter,
					cycleDataState, numRows } = useGrid();

	let gridRows = [];

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
		if (gridPos.row === r && gridPos.index === i) {
			cycleDataState()
		} else {
			setGridPos({
				row: r, 
				index: i
			})
		}
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
			tileObjects={grid[i]} 
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