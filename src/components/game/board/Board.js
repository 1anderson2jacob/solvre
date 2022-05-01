import { useCallback, useEffect } from 'react'
import Row from './Row'
import Keyboard from './keyboard/Keyboard.js'
import './Board.css';
import useGrid from './hooks/useGrid'
import useFetch from './hooks/useFetch'
import usePackData from './hooks/usePackData'

function Board() {
	const { grid, gridPos, setGridPos, 
					moveUp, moveDown, moveLeft, 
					moveRight, addLetter, removeLetter,
					cycleDataState, numRows, numColumns } = useGrid({ numRows: 6, numColumns: 5 });
	const { data, loading, error, fetchCallback } = useFetch('http://localhost:8080/')
	const { data: packedData } = usePackData(grid, numColumns)

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

	const handleFetch = useCallback(async (e) => {
		e.preventDefault();

		const options = {
			method: 'post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(packedData)
		}
		await fetchCallback(options).then(res => {
			console.log(res)
		})
	}, [packedData, fetchCallback])

	for (let i = 0; i < numRows; i++) {
		gridRows.push(
		<Row 
			key={`row-${i}`} 
			tileObjects={grid[i]} 
			row={i} 
			highlighted={gridPos}
			numColumns={numColumns}
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
			<div className="submit-btn-container">
				<button onClick={handleFetch}className="submit-btn">Submit</button>
			</div>

			{ loading && <p>{loading}</p> }
			{ data && <ul>{data.map((obj) => {
				return <li key={obj.id}>{obj.word}</li>
			})}</ul> }
			{ error && <p>{error}</p>}

		</div>
	)
}

export default Board;

/* while loading, button animation left to right, the colors of the grids (gray, yellow, green) on repeat. 

*/