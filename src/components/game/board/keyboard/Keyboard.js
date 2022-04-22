import Row from './Row'
import './Keyboard.css'

function Keyboard(props) {
// maybe no Row component, and row is just a container for css purposes
	const row1 = ['Q','W','E','R','T','Y','U','I','O','P']
	const row2 = ['A','S','D','F','G','H','J','K','L']
	const row3 = ['ENTER','Z','X','C','V','B','N','M', 'BACKSPACE']

	// function handleClick(letter) {
	// 	console.log(letter)
	// }

	return (
		<div className="keyboard">
			<Row key={row1} letters={row1} handleClick={props.handleClick}></Row>
			<Row key={row2} letters={row2} handleClick={props.handleClick}></Row>
			<Row key={row3} letters={row3} handleClick={props.handleClick}></Row>
		</div>
	)
}

export default Keyboard;