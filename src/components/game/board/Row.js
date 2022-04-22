import Tile from './Tile';
import './Row.css';

function Row(props) {
	let tiles = [];
	
	for (let i = 0; i < 5; i++) {
		tiles.push(
		<Tile 
			key={`tile-${i}`} 
			letter={props.letters[i]} 
			handleClick={props.handleClick} 
			highlighted={props.highlighted}
			row={props.row} 
			tile={i}>
		</Tile>)
	}
	
	return (
		<div className="Row">
			{tiles}
		</div>
	)
}

export default Row;