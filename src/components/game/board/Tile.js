import './Tile.css'
function Tile({ highlightedPos, rowNum, tileNum, tileObject, handleClick }) {
	const { row, index } = highlightedPos;

	const cName = (row === rowNum && index === tileNum) ? 'Tile highlighted' : 'Tile'
	return (
		<div
			className={cName}
			data-state={tileObject.dataState}
			onClick={() => handleClick(rowNum, tileNum)}>
			{tileObject.letter}
		</div>
	)
}

export default Tile;

// row, index, tile, tileObject, handleClick