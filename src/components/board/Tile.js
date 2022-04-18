import './Tile.css'
function Tile(props) {
	const {row, index} = props.highlighted;

	const cName = (row === props.row && index === props.tile) ? 'Tile highlighted' : 'Tile'
	return (
		<div
			className={cName}
			onClick={() => props.handleClick(props.row, props.tile)}>
			{props.letter}
		</div>
	)
}

export default Tile;