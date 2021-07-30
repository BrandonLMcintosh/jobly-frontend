import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";

function CompanyCard({ name, description, logoUrl, handle }) {
	return (
		<Link to={`/companies/${handle}`}>
			<Card>
				<CardBody>
					<CardTitle tag="h5">{name}</CardTitle>
					<img src={logoUrl} alt={name}></img>
					<CardText>{description}</CardText>
				</CardBody>
			</Card>
		</Link>
	);
}

export default CompanyCard;
