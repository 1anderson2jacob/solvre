import './Key.css'

function Key({ letter = '', hasInput, handleClick }) {
	let cName = 'Key'
	switch (letter) {
		case '' :
			cName += ' half'
			break
		case 'SUBMIT':
			cName += ' one-and-a-half'
			if (hasInput()) {
				cName += ' animated-submit'
			}
			break
		case 'BACK':
			cName += ' one-and-a-half backspace'
			break
		default : break
	}
	
	return (
		<button 
		onClick={(e) => handleClick(e, letter)}
		className={cName}>
			{letter}
		</button>
	)
}

export default Key;