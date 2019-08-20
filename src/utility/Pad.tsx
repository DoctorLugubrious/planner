let pad = (num: number, digits: number) => {
	let extras :string = "";
	for (let i = 0; i < digits; ++i) {
		extras += "0";
	}
	return (extras + num).slice(-digits);
};

export default pad;