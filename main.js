// This function is responsible for creating the Leaflet map
function createMap(){
    // Here, we create a new map object using Leaflet's 'L.map()' function. We pass in the id of the HTML element ('map')
    // where the map will be displayed, and an options object where we set the initial geographical center of the map
    // and the initial zoom level.
    map = L.map('map', {
        center: [43.074722, -89.384167], // setting the initial geographical center of the map
        zoom: 2 // setting the initial zoom level
    });

    // Further refining the view of the map by setting the geographical center and the zoom level.
    // In this case, it's overriding the initial center and zoom level.
    map.setView([43.05, -89.384167], 7);

    // Adding a tile layer to our map. A tile layer is a set of web-accessible tiles that reside on a server.
    // The tiles are accessed by a direct URL request from the browser and are displayed on the map.
    // This specific tile layer is from OpenStreetMap.
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    // After the map is set up, we proceed to load the data.
    getData();
};

// This function attaches pop-ups to each mapped feature
function onEachFeature(feature, layer) {
    // Creating an HTML string with all properties to be shown in the popup
    var popupContent = "Air Fields";

    // If the feature has properties, we will loop over them and add each one to our HTML string
    if (feature.properties) {
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        // After creating the HTML string with all the properties, we bind it to the layer as a popup
        layer.bindPopup(popupContent);
    };
};

// This function retrieves the data and adds it to the map
function getData(){
    // Fetching the GeoJSON data from the specified URL
    fetch("data/Airport_Reference_Points_table.geojson")
        .then(function(response){
            // Once the data is fetched, we parse it as JSON
            return response.json();
        })
        .then(function(json){
            // Defining the marker options for our GeoJSON layer
            var geojsonMarkerOptions = {
                radius: 5,
                fillColor: "#1db8f5",
                color: "#021a24",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.3
            };

            // Creating a GeoJSON layer with the parsed data, our marker options, and our function to attach the popups.
            // We then add this layer to the map
            L.geoJson(json, {
                pointToLayer: function (feature, latlng){
                    return L.circleMarker(latlng, geojsonMarkerOptions);
                },
                onEachFeature: onEachFeature
            }).addTo(map);
        });
};

// Adding an event listener that calls 'createMap' once the content of the document is fully loaded.
// This ensures that the map is created as soon as the webpage is loaded.
document.addEventListener('DOMContentLoaded',createMap)
