import React from "react";

function Alert({ type = "danger", messages = [] }) {
	return (
		<div className="Alert" role="alert">
			{messages.map((error) => (
				<p className="error" key={error}>
					{error}
				</p>
			))}
		</div>
	);
}

export default Alert;
