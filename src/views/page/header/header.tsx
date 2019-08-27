import * as React from "react";

interface headerProps {
	username: string;
}

let Header = (props: headerProps) => {
	return (<div>
		<h1>RUBIDIUM PLANNER</h1>
		<p>Welcome, {props.username}</p>
	</div>)
};

export default Header;