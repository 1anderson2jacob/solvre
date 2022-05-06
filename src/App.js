import './App.css';

import Header from './components/Header/Header';
import Board from './components/Board/Board'


function App() {
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