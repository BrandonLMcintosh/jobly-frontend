import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import JoblyApi from "./api";
import Search from "./Search";

function JobList() {
	const [jobs, setJobs] = useState(null);

	useEffect(() => {
		Search();
	}, []);

	async function search(title) {
		let jobs = await JoblyApi.jobsGetAll(title);
		setJobs(jobs);
	}

	return (
		<div>
			<Search searchFor={search} />
			{jobs.length ? (
				jobs.map((job) => <JobCard job={job} key={job.id} />)
			) : (
				<p>Sorry, no results found...</p>
			)}
		</div>
	);
}

export default JobList;
