import Key from './Key'
import './Row.css'

function Row(props) {
  const keys = props.letters.map((letter, index) => {
    return (
      <Key letter={letter} key={`key-${index}`} handleClick={props.handleClick}></Key>
    )
  })
  
  return (
    <div className="Key-Row">
      {keys}
    </div>
  )
}

export default Row;