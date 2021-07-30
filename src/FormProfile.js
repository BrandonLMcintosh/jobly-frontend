import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import JoblyApi from "./api";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import Alert from "./Alert";

function FormProfile() {
	const { user, setUser } = useContext(UserContext);

	const [formData, setFormData] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
		password: "",
	});
	const [saved, setSaved] = useState(false);
	const [formErrs, setFormErrs] = useState([]);

	async function handleSubmit(evt) {
		evt.preventDefault();

		let username = formData.username;
		let updatedUser;
		try {
			updatedUser = await JoblyApi.userUpdate(username, formData);
		} catch (err) {
			console.error("cannot create profile", err);
			setFormErrs(err);
			return;
		}

		setFormData((formData) => ({ ...formData, password: "" }));
		setSaved(true);

		setUser(updatedUser);
	}

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((f) => ({ ...formData, [name]: value }));
		setFormErrs([]);
	}

	return (
		<div>
			<h3>Profile</h3>
			<Form>
				<FormGroup>
					<Label for="username">Username</Label>
					<Input
						type="text"
						name="username"
						id="username"
						placeholder="username"
						value={formData.username}
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
				<FormGroup>
					<Label for="password">Password</Label>
					<Input
						type="password"
						name="password"
						id="password"
						placeholder="password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</FormGroup>
				{formErrs.length ? <Alert messages={formErrs} /> : null}
				{saved ? (
					<Alert
						type="success"
						messages={["updated successfully"]}
					/>
				) : null}
				<Button onClick={handleSubmit}>Update</Button>
			</Form>
		</div>
	);
}

export default FormProfile;
