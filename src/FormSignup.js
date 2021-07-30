import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "./Alert";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

function FormSignup({ signup }) {
	const history = useHistory();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
		email: "",
	});
	const [formErrs, setFormErrs] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		let res = await signup(formData);
		if (res.success) {
			history.push("/companies");
		} else {
			setFormErrs(res.err);
		}
	}

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	}

	return (
		<div>
			<Form>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input
						type="text"
						name="username"
						id="username"
						placeholder="Username"
						value={formData.username}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="firstName">First Name</Label>
					<Input
						type="text"
						name="firstName"
						id="firstName"
						placeholder="First Name"
						value={formData.firstName}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="lastName">Last Name</Label>
					<Input
						type="text"
						name="lastName"
						id="lastName"
						placeholder="Last Name"
						value={formData.lastName}
						onChange={handleChange}
					/>
				</FormGroup>
				<FormGroup>
					<Label for="email">Email</Label>
					<Input
						type="text"
						name="email"
						id="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
					/>
				</FormGroup>
				{formErrs.length ? <Alert messages={formErrs} /> : null}
				<Button onClick={handleSubmit}>Signup</Button>
			</Form>
		</div>
	);
}

export default FormSignup;
