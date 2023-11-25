var width = 1000;
var height = 800;

// Create Projection
var bosProjection = d3.geoAlbers()
    .scale(200000)
    .rotate([71.057, 0])
    .center([0, 42.313])
    .translate([width / 2 - 100, height / 2]);

// Create GeoPath function
var bosGeoPath = d3.geoPath()
    .projection(bosProjection);

// Select the div and append an SVG
var svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load and handle the data for Boston neighborhoods
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

// Load each layer with initial opacity set to 0
var layers = ['.additionalLayer1', '.additionalLayer2', '.additionalLayer3'];
var layerData = ['data/9inch_flood.geojson', 'data/21inch_flood.geojson', 'data/36inch_flood.geojson'];

layers.forEach((layerClass, index) => {
    d3.json(layerData[index])
        .then(function(data) {
            svg.selectAll(layerClass)
                .data(data.features)
                .enter()
                .append("path")
                .attr("class", layerClass.substring(1))
                .attr("fill", index === 0 ? "#0c52b9" : index === 1 ? "#114993" : "#062d69")
                .attr("stroke", "#333")
                .attr("d", bosGeoPath)
                // .attr("fill-opacity", 0.4)
                .style("opacity", 0)
                .style("display", "none");
        })
        .catch(function(error) {
            console.log(error);
        });
});

// Add descriptions and titles for each layer
var layerDetails = {
    '1': {
        'title': "9-inch Sea Level Rise",
        'description': "The blue layer showcases the potential coastal and riverine flooding in Boston under 9-inches of sea level rise scenarios projected for the 2030s at high tide and in the event of storms with an annual exceedance probability of 10 and 1 percent."
    },
    '2': {
        'title': "21-inch Sea Level Rise",
        'description': "The blue layer showcases the potential coastal and riverine flooding in Boston under 21-inches of sea level rise scenarios projected for the 2050s at high tide and in the event of storms with an annual exceedance probability of 10 and 1 percent."
    },
    '3': {
        'title': "36-inch Sea Level Rise",
        'description': "The blue layer showcases the potential coastal and riverine flooding in Boston under 36-inches of sea level rise scenarios projected for the 2070s at high tide and in the event of storms with an annual exceedance probability of 10 and 1 percent."
    }
};

// Add the event listener for the slider
document.getElementById("layerSlider").addEventListener("input", function(event) {
    var sliderValue = Math.round(event.target.value / 100);
    updateMapLayers(sliderValue);
    updateLayerDetails(sliderValue);
});

function updateMapLayers(value) {
    var transitionDuration = 500;

    // Hide all layers with transition
    svg.selectAll(layers.join(", "))
        .transition()
        .duration(transitionDuration)
        .style("opacity", 0)
        .on("end", function() {
            d3.select(this).style("display", "none");
        });

    // Show the selected layer
    var layerToShow = ".additionalLayer" + value;
    svg.selectAll(layerToShow)
        .style("display", "block")
        .transition()
        .duration(transitionDuration)
        .style("opacity", 1);
}

function updateLayerDetails(value) {
    var details = layerDetails[value];
    document.getElementById("layer-description").textContent = details.description;
    document.getElementById("dynamic-title").textContent = details.title;
}

// Initialize the title for the default layer
updateLayerDetails('1');

/*
TO DOs:
- add source for shapefiles
 */