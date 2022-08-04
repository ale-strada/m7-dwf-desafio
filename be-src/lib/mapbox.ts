import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const mapboxClient: any = (mapboxgl.accessToken = MAPBOX_TOKEN);

export { mapboxClient, mapboxgl };
