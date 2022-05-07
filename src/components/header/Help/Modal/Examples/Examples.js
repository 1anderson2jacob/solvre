import Row from '../../../../Board/Row/Row'
import './Examples.css'

function Examples() {
  const tileObjectsArr = [
    { letter: 'w', dataState: 'absent' }, 
    { letter: 'o', dataState: 'correct' }, 
    { letter: 'r', dataState: 'present' },
    { letter: 'm', dataState: 'present' },
    { letter: 'y', dataState: 'absent' }
  ]

  let tileRow = 
      <Row 
        key='row-0' 
        tileObjects={tileObjectsArr} 
        rowNum={0} 
        highlightedPos={{ row: 0, index: 4}}
        numColumns={5}
        handleClick={() => null}>
      </Row>

  return (
    <div className="Examples">
      <h1>Example</h1>
      {tileRow}
      <ul>
        <li><div data-state="absent">W</div> & <div data-state="absent">Y</div> show the letters are <em>incorrect</em> and have been clicked 0 times</li>
        <li><div data-state="correct">O</div> shows the letter is <em>correct</em>, is in the <em>correct</em> position, and has been clicked 2 times</li>
        <li><div data-state="present">R</div> & <div data-state="present">M</div> show the letters are <em>correct</em>, are in the <em>incorrect</em> position, and have been clicked 1 time</li>
      </ul>
    </div>
  )
}

export default Examples