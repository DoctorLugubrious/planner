import * as React from "react";

interface headerProps {
	username: string;
	mainPage: () => void;
}

let Header = (props: headerProps) => {
	return (<div className="header">
		<h1 className="title" onClick={props.mainPage}>Rubidium</h1>
		<p className="user">{props.username}</p>
	</div>)
};

export default Header;
