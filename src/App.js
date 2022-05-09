import './App.css';
import { useEffect } from 'react'

import Header from './components/Header/Header';
import Board from './components/Board/Board'


function App() {
	useEffect(() => {
		document.title = "Solvre - a solution to Wordle"
	}, [])
	
  return (
		<>
			<Header></Header>
			<div className="main">
				<Board></Board>
			</div>
		</>
  );
}

export default App;