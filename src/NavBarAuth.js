import React, { useContext } from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import Context from "./Context";

function NavBarAuth() {
	let { user } = useContext(Context);

	function logout() {
		user = null;
	}

	return (
		<Nav className="ml-auto" navbar>
			<NavItem>
				<NavLink exact to="/companies">
					Companies
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink exact to="/jobs">
					Jobs
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink exact to="/profile">
					Profile
				</NavLink>
			</NavItem>
			<NavItem>
				<button onClick={logout}>{`Logout ${user.name}`}</button>
			</NavItem>
		</Nav>
	);
}

export default NavBarAuth;
