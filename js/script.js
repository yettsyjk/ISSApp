const mymap = L.map('locationMap').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">Map</a> contributors';
const tileURL ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {attribution});
tiles.addTo(mymap);

const SatIcon = L.icon({
    iconUrl: 'https://img.icons8.com/doodle/2x/satellite.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0,0], {icon: SatIcon}).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
let firstTime = true;

async function fetchLocation(){
    const response = await fetch(api_url);
    const data = await response.json();
    const {
        latitude,
        longitude 
    } = data;
    console.log(latitude, longitude);
marker.setLatLng([latitude, longitude]);
if (firstTime){
    mymap.setView([latitude, longitude], 3);
    firstTime = false;
}
    document.getElementById('lat').textContent = latitude.toFixed(5);
    document.getElementById('lon').textContent = longitude.toFixed(5);
}

fetchLocation();
setInterval(fetchLocation, 2000);