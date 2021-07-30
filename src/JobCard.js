import React, { useState, useEffect, useContext } from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import UserContext from "./UserContext";

function JobCard({ job }) {
	const { id, title, salary, equity, companyName } = job;
	const { appliedToJob, applyToJob } = useContext(UserContext);
	const [applied, setApplied] = useState();

	useEffect(() => {
		setApplied(appliedToJob(id));
	}, [id, appliedToJob]);

	async function handleApply() {
		if (appliedToJob(id)) return;
		applyToJob(id);
		setApplied(true);
	}

	return (
		<Card id={job.id}>
			<CardBody>
				<CardTitle>{title}</CardTitle>
				<CardText>
					<p>{companyName}</p>
					<p>Salary: {salary}</p>
					<p>Equity: {equity | ""}</p>
				</CardText>
				<Button
					id={job.id}
					onClick={handleApply}
					disabled={applied}
				>
					Apply
				</Button>
			</CardBody>
		</Card>
	);
}

export default JobCard;
