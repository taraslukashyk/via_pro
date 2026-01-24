import fs from 'fs';
import * as topojson from 'topojson-client';
import * as d3 from 'd3-geo';

const rawData = fs.readFileSync('./user/Ukraine-regions.json', 'utf-8');
const topology = JSON.parse(rawData);

// Extract the feature collection. The key in objects is 'UKR_adm1' based on file inspection.
const geojson = topojson.feature(topology, topology.objects.UKR_adm1);

// Create a projection fitting the Ukraine geometry to a 800x520 box (approximate ratio)
const width = 800;
const height = 520;

// Reflect key is important if the source data is Y-up or standard GeoJSON sequence
// Standard d3.geoMercator should work.
const projection = d3.geoMercator()
    .fitSize([width, height], geojson);

const pathGenerator = d3.geoPath().projection(projection);

const svgPaths = geojson.features.map(feature => {
    return {
        id: feature.properties.ID_1 || feature.properties.HASC_1,
        name: feature.properties.NAME_1,
        d: pathGenerator(feature)
    };
});

const outputContent = `export const UKRAINE_REGIONS = ${JSON.stringify(svgPaths, null, 2)};`;

fs.writeFileSync('./src/data/mapPaths.ts', outputContent);

console.log(`Successfully generated paths for ${svgPaths.length} regions.`);
