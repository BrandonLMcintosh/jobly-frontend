import { useState, useEffect } from "react";

function useToken() {
	const val = localStorage.getItem("token") || null;

	const [token, setToken] = useState(val);

	useEffect(() => {
		function setToken() {
			if (!token) {
				localStorage.removeItem("token");
			} else {
				localStorage.setItem("token", token);
			}
		}
		setToken();
	}, [token]);

	return [token, setToken];
}

export default useToken;
