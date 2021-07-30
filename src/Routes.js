import { Switch, Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";

import Landing from "./Landing";
import JobList from "./JobList";
import CompanyDetail from "./CompanyDetail";
import CompanyList from "./CompanyList";
import Form from "./Form";
import Context from "./Context";

function Routes() {
	const { auth } = useContext(Context);
	return (
		<Switch>
			<Route exact path="/">
				<Landing />
			</Route>
			<Route exact path="/companies">
				<CompanyList />
			</Route>
			<Route path="/companies/:handle">
				<CompanyDetail />
			</Route>
			<Route exact path="/jobs">
				<JobList />
			</Route>
			<Route exact path="/profile">
				<Form
					initialFormState={auth.init.update}
					action={auth.update}
				/>
			</Route>
			<Route exact path="/login">
				<Form
					initialFormState={auth.init.login}
					action={auth.login}
				/>
			</Route>
			<Route exact path="/signup">
				<Form
					initialFormState={auth.init.signup}
					action={auth.signup}
				/>
			</Route>
			<Redirect to="/" />
		</Switch>
	);
}

export default Routes;
