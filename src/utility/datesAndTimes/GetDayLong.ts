let GetDayLong = (date:Date) => {
	let day:number = date.getDay();

	let weekday: string[] = [];
	weekday[0] =  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	return weekday[day];
};

export default GetDayLong;
