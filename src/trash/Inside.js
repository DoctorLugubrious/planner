let inside = (x1, y1, w, h, x2, y2) => {
	//LOOSEN BOUNDS
	const looser = 70;
	x1 -= looser;
	y1 -= looser;
	w += looser * 2;
	h += looser * 2;
	return (
		(x2 > x1)
		&& (y2 > y1)
		&& (x2 < x1 + w)
		&& (y2 < y1 + h)
	);
};

export default inside;
