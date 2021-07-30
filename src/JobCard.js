import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import useApply from "./hooks/useApply";

function JobCard({ job }) {
	const setId = useApply();
	return (
		<Card>
			<CardBody>
				<CardTitle>{job.title}</CardTitle>
				<CardText>
					<p>Salary: {job.salary}</p>
					<p>Equity: {job.equity | ""}</p>
				</CardText>
				<Button id={job.id} onClick={() => setId(job.id)}>
					Apply
				</Button>
			</CardBody>
		</Card>
	);
}

export default JobCard;
