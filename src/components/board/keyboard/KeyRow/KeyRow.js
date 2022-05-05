import Key from '../Key/Key'
import './KeyRow.css'

function KeyRow({ letters = [], hasInput,  handleClick }) {
  const keys = letters.map((letter, index) => {
    return (
      <Key 
      letter={letter} 
      key={`key-${index}`} 
      hasInput={hasInput}
      handleClick={handleClick}
      ></Key>
    )
  })
  
  return (
    <div className="Key-Row">
      {keys}
    </div>
  )
}

export default KeyRow;