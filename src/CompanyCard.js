import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function CompanyCard({ company, getDetails }) {
	return (
		<Card onClick={async () => getDetails()}>
			<CardBody>
				<CardTitle tag="h5">{company.name}</CardTitle>
				<img src={company.logoUrl} alt={company.name}></img>
				<CardText>{company.description}</CardText>
			</CardBody>
		</Card>
	);
}

export default CompanyCard;
