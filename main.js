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
    fetch("data/cy21allenplane.geojson")
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


//Step 2: Import GeoJSON data
function getData2(){
    //load the data
    fetch("data/MegaCities.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //call function to create proportional symbols
            createPropSymbols(json);
        })
};
//Step 3: Add circle markers for point features to the map
function createPropSymbols(data){
    //create marker options
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

}; 
//Add sliderbar here; Go to ArcGIS Pro
        //Example 2.2 line 8
      onAdd: function () {
            // create the control container div with a particular class name
            var container = L.DomUtil.create('div', 'sequence-control-container');

            //create range input element (slider)
            container.insertAdjacentHTML('beforeend', '<input class="range-slider" type="range">')

            return container;
        }      
        
    //CODE FROM updatePropSymbols() FUNCTION
    //build new popup content string
  /* var popupContent = "<p><b>City:</b> " + props.City + "</p>";

    //add formatted attribute to panel content string
    var year = attribute.split("_")[1];
    popupContent += "<p><b>Population in " + year + ":</b> " + props[attribute] + " million</p>";

    //update popup with new content    
    popup = layer.getPopup();    
    popup.setContent(popupContent).update();*/

//function to convert markers to circle markers
/*function pointToLayer(feature, latlng){
    //Determine which attribute to visualize with proportional symbols
    var attribute = "CY 21 Enplanements";

    //create marker options
    var options = {
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);*/
    
// Adding an event listener that calls 'createMap' once the content of the document is fully loaded.
// This ensures that the map is created as soon as the webpage is loaded.
document.addEventListener('DOMContentLoaded',createMap)
