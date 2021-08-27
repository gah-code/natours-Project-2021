export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2lsYmVydDk0IiwiYSI6ImNrczU2a25rYzE0ZW8ydW10aHJtMTBhaTMifQ.kkal20q4d3Xm2IKTVhi-sA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/gilbert94/cks56xovq3sil17p5wg97cbti',
    scrollZoom: false,

    // center: [-121.6543901, 37.1305012],
    // interactive: false,
    // zoom: 10,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Add Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend the map bounds to include current locaton
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
