import "./ResultsList.css"
import { forwardRef } from 'react'

const  ResultsList = forwardRef((props, ref) => {
  const { data, loading, error } = props 

  return (
    <div className="ResultsList" ref={ref}>
      { loading && <p>{loading}</p> }
			{ data &&
				<ul>{data.map(obj => {
				return <li key={obj.id}>{obj.word}</li>
			  })}</ul> 
      }
			{ error && <p>{error}</p>}
    </div>
  )
})

export default ResultsList