import './Key.css'

function Key({ letter = '', handleClick }) {
	return (
		<button 
		onClick={() => handleClick(letter)}
		className='Key'>{letter}</button>
	)
}

export default Key;