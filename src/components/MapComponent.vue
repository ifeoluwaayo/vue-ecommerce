<script>
import mapboxgl from "mapbox-gl";

export default {
	name: "BaseMap",
	data() {
		return {
			accessToken:
				"pk.eyJ1IjoiaWZlYXlvIiwiYSI6ImNsMjk4NW82ZzBndDAzdG1tZXY0Y2k5M20ifQ.Y5_FrBLlkuRHr91j9DeqWA",
		};
	},
	mounted() {
		mapboxgl.accessToken = this.accessToken;

		new mapboxgl.Map({
			container: "mapContainer",
			style: "mapbox://styles/mapbox/streets-v11",
			center: [103.811279, 1.345399],
			zoom: 12,
			maxBounds: [
				[103.6, 1.1704753],
				[104.1, 1.4754753],
			],
		});

		this.addMarkers();
	},
	render() {
		return <div id="mapContainer" class="basemap"></div>;
	},
};
</script>
