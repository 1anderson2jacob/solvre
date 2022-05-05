import './Header.css';
import Help from './Help/Help'

function Header() {

	return (
		<header>
			<Help></Help>
			<h1 className="title">Solvre</h1>
			<div className="placeholder">{/* placeholder */}</div>
		</header>
	)
}

export default Header;