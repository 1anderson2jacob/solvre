import './App.css';

import Header from './components/header/Header';
import Board from './components/board/Board';
import Keyboard from './components/keyboard/Keyboard';


function App() {
  return (
		<>
			<Header></Header>
			<main>
				<div className="board-container">
					<Board></Board>
				</div>
				<Keyboard></Keyboard>
			</main>
		</>
  );
}

export default App;