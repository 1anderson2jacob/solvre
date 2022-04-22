import './Key.css'

function Key(props) {

	return (
		<button 
		onClick={() => props.handleClick(props.letter)}
		className='Key'>{props.letter}</button>
	)
}

export default Key;