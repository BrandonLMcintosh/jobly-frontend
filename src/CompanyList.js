import { React, useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import Search from "./Search";

function CompanyList() {
	const [companies, setCompanies] = useState(null);

	useEffect(() => {
		search();
	});

	async function search(name) {
		let companies = await JoblyApi.getCompanies(name);
		setCompanies(companies);
	}

	return (
		<div>
			<Search searchFor={search} />
			{companies.length ? (
				companies.map((company) => (
					<CompanyCard company={company} key={company.handle} />
				))
			) : (
				<p>Sorry, no results found...</p>
			)}
		</div>
	);
}

export default CompanyList;
