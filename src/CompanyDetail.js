import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobCard from "./JobCard";

function CompanyDetail() {
	const { handle } = useParams();
	const [company, setCompany] = useState(null);

	useEffect(() => {
		async function getDetails(handle) {
			try {
				const res = await JoblyApi.companiesGetOne(handle);
				setCompany(res.company);
			} catch (err) {
				console.error(err);
			}
		}
		getDetails(handle);
	}, [handle]);

	return (
		<div>
			<h2>{company.name}</h2>
			<p>{company.description}</p>
			{company.jobs.map((job) => (
				<JobCard job={job} key={job.id} />
			))}
		</div>
	);
}

export default CompanyDetail;
