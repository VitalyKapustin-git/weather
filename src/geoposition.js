export async function getUserGeo() {
	const rawData = await fetch('https://get.geojs.io/v1/ip/geo.json');
	const jsonData = await rawData.json();

	return jsonData.city;
}