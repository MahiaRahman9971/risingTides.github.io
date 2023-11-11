// bosNeighborhoods = d3.json('https://gist.githubusercontent.com/jdev42092/5c285c4a3608eb9f9864f5da27db4e49/raw/a1c33b1432ca2948f14f656cc14c7c7335f78d95/boston_neighborhoods.json')
//
// {
// // Create SVG
//     let svg = d3.select( "body" )
//         .append( "svg" )
//         .attr( "width", width )
//         .attr( "height", height );
//
// // Append empty placeholder g element to the SVG
// // g will contain geometry elements
//     let g = svg.append( "g" );
//
//     return svg.node();
// }
//
// bosProjection = d3.geoAlbers()
//     .scale( 190000 )
//     .rotate( [71.057,0] )
//     .center( [0, 42.313] )
//     .translate( [width/2,height/2] );