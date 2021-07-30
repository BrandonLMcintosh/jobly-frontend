import React from "react";
import { BrowserRouter } from "react-router-dom";

import NavBar from "./NavBar";
import Body from "./Body";

import JoblyApi from "./api";
import Context from "./Context";
import useUser from "./hooks/useUser";
import { useHistory } from "react-router-dom";

import "./App.css";

function App() {
	const [user, setUser] = useUser(null);
	const history = useHistory();

	async function login(data) {
		const { username, password } = data;
		try {
			const user = await JoblyApi.authLogin(username, password);
			setUser(user);
			history.push("/jobs");
		} catch (err) {
			console.log(err);
		}
	}

	async function signup(data) {
		try {
			const res = await JoblyApi.authSignup(data);
			sessionStorage.setItem("token", res.token);
			await login(data.username, data.password);
			history.push("/jobs");
		} catch (err) {
			console.log(err);
		}
	}

	async function update(data) {
		try {
			const res = await JoblyApi.userUpdate(data);
			setUser(res.user);
			history.push("/jobs");
		} catch (err) {
			console.log(err);
		}
	}

	const init = {
		login: { username: "", password: "" },
		signup: {
			username: "",
			password: "",
			firstName: "",
			lastName: "",
			email: "",
		},
		update: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: "",
		},
	};

	const auth = { login, signup, update, init };
	return (
		<BrowserRouter>
			<Context.Provider value={auth}>
				<div className="App">
					<NavBar />
					<Body />
				</div>
			</Context.Provider>
		</BrowserRouter>
	);
}

export default App;
