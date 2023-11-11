var width = 700;
var height = 580;

// Create Projection
var bosProjection = d3.geoAlbers()
    .scale(190000)
    .rotate([71.057, 0])
    .center([0, 42.313])
    .translate([width / 2, height / 2]);

// Create GeoPath function
var bosGeoPath = d3.geoPath()
    .projection(bosProjection);

// Select the div and append an SVG
var svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load and handle the data
d3.json('https://gist.githubusercontent.com/jdev42092/5c285c4a3608eb9f9864f5da27db4e49/raw/a1c33b1432ca2948f14f656cc14c7c7335f78d95/boston_neighborhoods.json')
    .then(function(data) {
        svg.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("fill", "#ccc")
            .attr("stroke", "#333")
            .attr("d", bosGeoPath);
    })
    .catch(function(error) {
        console.log(error);
    });
