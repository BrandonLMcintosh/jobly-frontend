import { useEffect, useState } from "react";
import JoblyApi from "../api";
import useUser from "./useUser";

function useApply(initialId = null) {
	const [id, setId] = useState(initialId);
	const [user, setUser] = useUser();

	useEffect(() => {
		async function apply() {
			if (id) {
				try {
					await JoblyApi.userApplyJob(user.username, id);
					user.applications.push(id);
					setUser(user);
				} catch (err) {
					console.log(err);
				}
			}
		}

		apply();
	}, [id, user, setUser]);

	return setId;
}

export default useApply;
