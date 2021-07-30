import { useState } from "react";

function useUser() {
	const [user, setUser] = useState(null);
	setUser(localStorage.getItem("user"));
	return [user, setUser];
}

export default useUser;
