import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import JobList from "./JobList";
import Loading from "./Loading";

function CompanyDetail() {
	const { handle } = useParams();
	const [company, setCompany] = useState(null);

	useEffect(() => {
		async function getDetails() {
			try {
				const company = await JoblyApi.companiesGetOne(handle);
				setCompany(company);
			} catch (err) {
				console.error(err);
			}
		}
		getDetails();
	}, [handle]);

	if (!company) return <Loading />;

	return (
		<div>
			<h2>{company.name}</h2>
			<p>{company.description}</p>
			<JobList jobs={company.jobs} />
		</div>
	);
}

export default CompanyDetail;
