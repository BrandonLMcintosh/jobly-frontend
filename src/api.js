import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${JoblyApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers }))
				.data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	/** Get details on a company by handle. */

	static async companiesGetAll() {
		let res = await this.request(`companies/`);
		return res.companies;
	}

	static async companiesGetOne(handle) {
		let res = await this.request(`companies/${handle}`);
		return res.company;
	}

	static async jobsGetAll() {
		let res = await this.request(`jobs/`);
		return res.jobs;
	}

	static async jobsGetOne(id) {
		let res = await this.request(`jobs/${id}`);
		return res.job;
	}

	static async authLogin(username, password) {
		let res = await this.request(
			`auth/token`,
			{ username, password },
			"post"
		);
		this.updateToken(res.token);
		let userRes = await this.userGet(username);
		return userRes.user;
	}

	static async authSignup(data) {
		const { username, password } = data;
		let res = await this.request(`auth/register`, data, "post");
		this.updateToken(res.token);
		const userRes = await this.authLogin(username, password);
		return userRes.user;
	}

	static authLogout() {
		sessionStorage.clear();
		localStorage.clear();
	}

	static async userGet(username) {
		let res = await this.request(`user/${username}`);
		return res.user;
	}
	static async userUpdate(data) {
		let res = await this.request(`user/`, data, "patch");
		return res.user;
	}

	static async userApplyJob(username, id) {
		let res = await this.request(`users/${username}/jobs/${id}`);
		return res.applied;
	}

	static async userDelete(username) {
		let res = await this.request(`users/${username}`, {}, "delete");
		return res.deleted;
	}

	static updateToken(token = null) {
		if (token) {
			sessionStorage.setItem("token", token);
		}
		this.token = sessionStorage.getItem("token");
	}
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
	sessionStorage.getItem("token") |
	("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
		"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
		"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc");

export default JoblyApi;
