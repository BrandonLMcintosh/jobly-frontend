import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron, Container } from "reactstrap";
import UserContext from "./UserContext";

function Landing() {
	const { user } = useContext(UserContext);

	function loggedIn() {
		return (
			<Container fluid>
				<h1>Welcome back, {user.firstName || user.username}!</h1>
			</Container>
		);
	}

	function loggedOut() {
		return (
			<Container>
				<h1>Jobly</h1>
				<p>All jobs in one, convenient place.</p>
				<Button>
					<Link to="/login">Login</Link>
				</Button>
				<Button>
					<Link to="/signup">Signup</Link>
				</Button>
			</Container>
		);
	}

	return (
		<Jumbotron className="Landing">
			{user ? loggedIn() : loggedOut()}
		</Jumbotron>
	);
}

export default Landing;
