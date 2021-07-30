import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function Landing() {
	return (
		<div>
			<Button>
				<Link to="/login">Login</Link>
			</Button>
			<Button>
				<Link to="/signup">Signup</Link>
			</Button>
		</div>
	);
}

export default Landing;
