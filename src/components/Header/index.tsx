import { FC } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const Header: FC = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Navbar.Brand as={Link} to="/">Cat Browser</Navbar.Brand>
		</Navbar>
	)
}

export default Header;