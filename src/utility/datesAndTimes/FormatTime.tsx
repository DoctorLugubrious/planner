import pad from "../numbers/Pad";

function FormatDateFromNumbers(hours: number, minutes: number, printSuffix: boolean) {
	let suffix: string = "";
	if (printSuffix) {
		if (hours == 12) {
			suffix = "pm";
		}
		else if (hours > 12) {
			suffix = "pm";
			hours -= 12;
		}
		else {
			suffix = "am";
		}
	}

	minutes -= minutes % 5;
	return pad(hours, 2) + ":" + pad(minutes, 2) + suffix;
}

let FormatTimeFromString = (date: string, printSuffix: boolean) => {
	let dateSplit = date.split(":");
	let hour: number = parseInt(dateSplit[0]);
	let minute: number = parseInt(dateSplit[1]);

	return FormatDateFromNumbers(hour, minute, printSuffix);
};

let Time12to24 = (time: string) => {

	if (time === "") {
		return "";
	}
	let dateSplit = time.split(":");

	let lastHalf = dateSplit[1];
	let hour = parseInt(dateSplit[0]);

	let minute = lastHalf.substr(0, 2);
	let meridian = lastHalf.substr(2, 2);
	if (meridian == "pm" && hour != 12) {
		hour += 12;
	}

	return pad(hour, 2) + ":" + minute;
};

let FormatTime = (date: Date, printSuffix: boolean) => {
	let minutes = date.getMinutes();
	let hours = date.getHours();

	return FormatDateFromNumbers(hours, minutes, printSuffix);
};

export {FormatTime, FormatTimeFromString, Time12to24}
