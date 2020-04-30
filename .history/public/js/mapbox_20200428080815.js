
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiemFjLTA5IiwiYSI6ImNrOTJhMmZodDAwZXEzbm51cW5nM3FrNnAifQ.MUZBtaSdtj13L7LuaFfF-A';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/zac-09/ck92bagi2205s1ioa2lxawy5u',
    scrollZoom: false
    //   center: [-118.113491, 34.111745],
    //   zoom: 5
  });
  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(loc => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';
    //add marker
    console.log(loc.coordinates);

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    //add popup
    // new mapboxgl.Popup({ offset: 10 })
    //   .setLngLat(loc.coordinates)
    //   .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    //   .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds),
    {
      padding: { top: 200, bottom: 150, left: 200, right: 200 }
    };
};
