import Tile from '../Tile/Tile';
import './Row.css';

function Row({ numColumns = 0, rowNum = 0, tileObjects = [], handleClick, 
	highlightedPos = { row: null, index: null } }) {
	let tiles = [];
	
	for (let i = 0; i < numColumns; i++) {
		tiles.push(
		<Tile 
			key={`tile-${i}`} 
			tileObject={tileObjects[i]}
			handleClick={handleClick}
			highlightedPos={highlightedPos}
			rowNum={rowNum}
			tileNum={i}>
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