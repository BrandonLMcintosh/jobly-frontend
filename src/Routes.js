import { Switch, Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import Landing from "./Landing";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import FormSignup from "./FormSignup";
import FormLogin from "./FormLogin";
import FormProfile from "./FormProfile";
import UserContext from "./UserContext";

function AuthRoute({ exact, path, children }) {
	const { user } = useContext(UserContext);

	if (!user) {
		return <Redirect to="/login" />;
	}

	return (
		<Route exact={exact} path={path}>
			{children}
		</Route>
	);
}

function Routes({ signup, login }) {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					<Landing />
				</Route>

				<Route path="/login">
					<FormLogin login={login} />
				</Route>

				<Route path="/signup">
					<FormSignup signup={signup} />
				</Route>

				<AuthRoute exact path="/companies">
					<CompanyList />
				</AuthRoute>

				<AuthRoute path="/companies/:handle">
					<CompanyDetail />
				</AuthRoute>

				<AuthRoute path="/jobs">
					<JobList />
				</AuthRoute>

				<AuthRoute path="/profile">
					<FormProfile />
				</AuthRoute>

				<Redirect to="/" />
			</Switch>
		</div>
	);
}

export default Routes;
