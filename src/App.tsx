import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import TicTacToeGame from './components/TicTacToe/TicTacToe';

export default function App() {
	return (
		<Router>
			<div className="App">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/ticTacToeGame">TicTacToeGame</Link>
					</li>
				</ul>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/ticTacToeGame" element={<TicTacToeGame />}></Route>
				</Routes>
			</div>
		</Router>
	);
}
