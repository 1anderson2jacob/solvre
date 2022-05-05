import Row from './Row'
import './Keyboard.css'

function Keyboard({ handleClick, hasInput }) {
	
	const row1 = ['Q','W','E','R','T','Y','U','I','O','P']
	const row2 = ['','A','S','D','F','G','H','J','K','L','']
	const row3 = ['SUBMIT','Z','X','C','V','B','N','M', 'BACK']

	return (
		<div className="Keyboard">
			<Row key={row1} letters={row1} hasInput={hasInput} andleClick={handleClick}></Row>
			<Row key={row2} letters={row2} hasInput={hasInput} handleClick={handleClick}></Row>
			<Row key={row3} letters={row3} hasInput={hasInput} handleClick={handleClick}></Row>
		</div>
	)
}

export default Keyboard;