import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import JoblyApi from "./api";
import useToken from "./hooks/useToken";
import "./App.css";
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";
import Loading from "./Loading";
import NavBar from "./NavBar";

function App() {
	const [loaded, setLoaded] = useState(false);
	const [applications, setApplications] = useState(new Set([]));
	const [user, setUser] = useState(null);
	const [token, setToken] = useToken();

	useEffect(() => {
		async function getUser() {
			if (token) {
				try {
					let { username } = jwt.decode(token);
					let user = await JoblyApi.userGet(username);
					setUser(user);
					setApplications(new Set([user.applications]));
				} catch (err) {
					console.error("Issues loading user");
					setUser(null);
				}
			}
			setLoaded(true);
		}

		setLoaded(false);
		getUser();
	}, [token]);

	async function signup(data) {
		try {
			const token = await JoblyApi.authSignup(data);
			setToken(token);
			return { success: true };
		} catch (err) {
			console.error("failed signup", err);
			return { success: false, err };
		}
	}

	async function login(data) {
		try {
			let token = await JoblyApi.authLogin(data);
			setToken(token);
			return { success: true };
		} catch (err) {
			console.error("failed login", err);
			return { success: false, err };
		}
	}

	function logout() {
		setUser(null);
		setToken(null);
	}

	function appliedToJob(id) {
		return applications.has(id);
	}

	function applyToJob(id) {
		if (appliedToJob(id)) return;
		JoblyApi.userApplyJob(user.username, id);
		setApplications(new Set([...applications, id]));
	}

	if (!loaded) return <Loading />;

	return (
		<BrowserRouter>
			<UserContext.Provider
				value={{ user, setUser, appliedToJob, applyToJob }}
			>
				<div className="App">
					<NavBar logout={logout} />
					<Routes login={login} signup={signup} />
				</div>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
