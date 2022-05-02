import Key from './Key'
import './Row.css'

function Row({ letters = [], handleClick }) {
  const keys = letters.map((letter, index) => {
    return (
      <Key letter={letter} key={`key-${index}`} handleClick={handleClick}></Key>
    )
  })
  
  return (
    <div className="Key-Row">
      {keys}
    </div>
  )
}

export default Row;