import Tile from './Tile';
import './Row.css';

function Row(props) {
	let tiles = [];
	
	for (let i = 0; i < props.numColumns; i++) {
		tiles.push(
		<Tile 
			key={`tile-${i}`} 
			tileObject={props.tileObjects[i]}
			handleClick={props.handleClick} 
			highlighted={props.highlighted}
			row={props.row}
			tile={i}>
		</Tile>)
	}
	
	return (
		<div>
			<div className="Row">
				{tiles}
			</div>
		</div>
	)
}

export default Row;