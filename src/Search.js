import React, { useState } from "react";
import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

function Search({ searchFor }) {
	const [query, setQuery] = useState("");

	function handleSubmit(evt) {
		evt.preventDefault();
		searchFor(query.trim() || undefined);
		setQuery(query.trim());
	}

	function handleChange(evt) {
		setQuery(evt.target.value);
	}

	return (
		<div>
			<InputGroup>
				<InputGroupAddon addonType="append">
					<Button onClick={handleSubmit}>Search</Button>
				</InputGroupAddon>
				<Input
					placeholder="search"
					value={query}
					onChange={handleChange}
				/>
			</InputGroup>
		</div>
	);
}

export default Search;
