import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "./Alert";

function FormLogin({ login }) {
	const history = useHistory();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [formErrs, setFormErrs] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();
		let result = await login(formData);
		if (result.success) {
			history.push("/companies");
		} else {
			setFormErrs(result.err);
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
						value={formData.username}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				{formErrs.length ? <Alert messages={[formErrs]} /> : null}
				<Button onClick={handleSubmit}>Login</Button>
			</Form>
		</div>
	);
}

export default FormLogin;
