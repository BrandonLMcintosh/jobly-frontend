import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";

function NavBarUnauth() {
	return (
		<Nav className="ml-auto" navbar>
			<NavItem>
				<NavLink exact to="/login">
					Login
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink exact to="/signup">
					Signup
				</NavLink>
			</NavItem>
		</Nav>
	);
}

export default NavBarUnauth;
