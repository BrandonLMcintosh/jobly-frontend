import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";

import NavBarUnauth from "./NavBarUnauth";
import NavBarAuth from "./NavBarAuth";

function NavBar() {
	const user = localStorage.getItem("user");
	return (
		<div>
			<Navbar>
				<NavbarBrand href="/">Jobly</NavbarBrand>
				{user ? <NavBarAuth user={user} /> : <NavBarUnauth />}
			</Navbar>
		</div>
	);
}

export default NavBar;
