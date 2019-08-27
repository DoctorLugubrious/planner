let GetDay = (date:Date) => {
	let day:number = date.getDay();

	let weekday: string[] = [];
	weekday[0] =  "Su";
	weekday[1] = "M";
	weekday[2] = "T";
	weekday[3] = "W";
	weekday[4] = "Th";
	weekday[5] = "F";
	weekday[6] = "S";

	return weekday[day];
};

export default GetDay;