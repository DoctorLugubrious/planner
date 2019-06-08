export default function DeepCopy(object) {
	return JSON.parse(JSON.stringify(object));
}
