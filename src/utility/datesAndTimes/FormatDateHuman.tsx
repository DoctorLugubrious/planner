import GetDayLong from "./GetDayLong";


let FormatDateHuman = (date: Date) => {
	date = new Date(date);

	let dayOfWeek = GetDayLong(date);

	let year = date.getFullYear();
	const month = date.toLocaleString('default', { month: 'long' });
	let day = date.getDate();

	return dayOfWeek + " " + month + " " + day + ", " + year;
};

export default FormatDateHuman;
