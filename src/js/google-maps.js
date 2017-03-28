google.maps.event.addDomListener(window, 'load', g_init);

const markericon = {
    url: "./dist/img/marker.svg",
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(25, 25)
}

const options = {
    zoom: 15,
    center: { lat: 23.350599, lng: 85.295696 },
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "invert_lightness": true }, { "saturation": 20 }, { "lightness": 50 }, { "gamma": 0.4 }, { "hue": "#00ffee" }] }, { "featureType": "all", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative", "elementType": "all", "stylers": [{ "color": "#ffffff" }, { "visibility": "simplified" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#405769" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#232f3a" }] }]
};

function g_init() {
    var map = new google.maps.Map(document.getElementById('maps'), options);

    var marker = new google.maps.Marker({
        position: { lat: 23.350599, lng: 85.295696 },
        map: map,
        draggable: false,
        icon: markericon,
        optimized: false
    });
}