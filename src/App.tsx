import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import TicTacToeGame from './components/TicTacToe/TicTacToe';
import Jotai from './components/Jotai/Jotai';

const routes = {
	home: '/',
	ticTacToeGame: '/ticTacToeGame',
	jotai: '/jotai',
};

export default function App() {
	return (
		<Router>
			<div className="App">
				<ul>
					<li>
						<Link to={routes.home}>Home</Link>
					</li>
					<li>
						<Link to={routes.ticTacToeGame}>TicTacToeGame</Link>
					</li>
					<li>
						<Link to={routes.jotai}>Jotai example</Link>
					</li>
				</ul>
				<Routes>
					<Route path={routes.home} element={<Home />}></Route>
					<Route path={routes.ticTacToeGame} element={<TicTacToeGame />}></Route>
					<Route path={routes.jotai} element={<Jotai />}></Route>
				</Routes>
			</div>
		</Router>
	);
}
