import KeyRow from './KeyRow/KeyRow'
import './Keyboard.css'

function Keyboard({ handleClick, hasInput }) {
	
	const row1 = ['Q','W','E','R','T','Y','U','I','O','P']
	const row2 = ['','A','S','D','F','G','H','J','K','L','']
	const row3 = ['SUBMIT','Z','X','C','V','B','N','M', 'BACK']

	return (
		<div className="keyboard-container">
			<div className="Keyboard">
				<KeyRow key={row1} letters={row1} hasInput={hasInput} handleClick={handleClick}></KeyRow>
				<KeyRow key={row2} letters={row2} hasInput={hasInput} handleClick={handleClick}></KeyRow>
				<KeyRow key={row3} letters={row3} hasInput={hasInput} handleClick={handleClick}></KeyRow>
			</div>
		</div>
	)
}

export default Keyboard;