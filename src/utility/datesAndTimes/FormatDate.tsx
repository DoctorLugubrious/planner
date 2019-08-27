import pad from "../numbers/Pad";


let FormatDate = (date: Date) => {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	return year + "-" + pad(month, 2) + "-" + pad(day, 2);
};

export default FormatDate;