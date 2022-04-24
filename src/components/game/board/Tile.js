import './Tile.css'
function Tile(props) {
	const { row, index } = props.highlighted;

	const cName = (row === props.row && index === props.tile) ? 'Tile highlighted' : 'Tile'
	return (
		<div
			className={cName}
			data-state={props.tileObject.dataState}
			onClick={() => props.handleClick(props.row, props.tile)}>
			{props.tileObject.letter}
		</div>
	)
}

export default Tile;