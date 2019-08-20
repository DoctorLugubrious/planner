import pad from "./Pad";

let FormatTime = (date: Date, printSuffix: boolean) => {
	let suffix: string = "";
	let minutes = date.getMinutes();
	let hours = date.getHours();

	if (printSuffix) {
		if (hours > 12) {
			suffix = "pm";
			hours -= 12;
		}
		else {
			suffix = "am";
		}
	}

	minutes -= minutes % 5;

	return pad(hours, 2) + ":" + pad(minutes, 2) + suffix;
};

export default FormatTime;