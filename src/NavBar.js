import React, { useContext } from "react";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import UserContext from "./UserContext";

function NavBar({ logout }) {
	const { user } = useContext(UserContext);

	function loggedIn() {
		return (
			<Nav>
				<NavItem>
					<NavLink to="/companies">Companies</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/jobs">Jobs</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/profile">Profile</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/" onClick={logout}>
						Logout {user.firstName || user.username}
					</NavLink>
				</NavItem>
			</Nav>
		);
	}

	function loggedOut() {
		return (
			<Nav>
				<NavItem>
					<NavLink to="/login">Login</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to="/signup">Signup</NavLink>
				</NavItem>
			</Nav>
		);
	}

	return (
		<div>
			<Navbar>
				<NavbarBrand>
					<Link to="/">Jobly</Link>
				</NavbarBrand>
				{user ? loggedIn() : loggedOut()}
			</Navbar>
		</div>
	);
}

export default NavBar;
