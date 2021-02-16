mapboxgl.accessToken = 'pk.eyJ1IjoibGF6ZmlzaGluZyIsImEiOiJja2wzY2xoODgxaWoyMnJwbHdraXkzdjRhIn0.0dz4Ra_uLwB7SM1LAIDebw';

var options = {
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-74, 40.75],
  zoom: 10.5
}

var map = new mapboxgl.Map(options);

map.scrollZoom.disable();

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

$.getJSON('./data/shelters.json',function(shelterRows){
  console.log(shelterRows)

  shelterRows.forEach(function(shelterRow){
    console.log(shelterRow.name,shelterRow.type)

    var html = `
      <div>
        <div><i>${shelterRow.type}</i></div>
        <h3>${shelterRow.name}</h3>
        <div><i>${shelterRow.description}</i></div><br>
        <div><b>Eligibility: </b>${shelterRow.eligibility}</div>
        <div><b>Address: </b>${shelterRow.address}</div>
      </div>
    `

    var color = 'green'

    if (shelterRow.type === 'Shelter'){
      color='purple'
    }

    if (shelterRow.type === 'Drop-In Center'){
      color='orange'
    }

    new mapboxgl.Marker({
      color:color
    })
      .setLngLat([shelterRow.lng,shelterRow.lat])
      .setPopup(new mapboxgl.Popup().setHTML(html)) // add popup
      .addTo(map);
})
})
