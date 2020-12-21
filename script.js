  // TODO: Replace the following with your app's Firebase project configuration
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  var firebaseConfig = {
    apiKey: "AIzaSyDhiTv-AiBuOey2y4Z3UgMINXNA_kPQKS0",
    authDomain: "peoplebase-99d15.firebaseapp.com",
    databaseURL: "https://peoplebase-99d15.firebaseio.com",
    projectId: "peoplebase-99d15",
    storageBucket: "peoplebase-99d15.appspot.com",
    messagingSenderId: "761268600339",
    appId: "1:761268600339:web:2e8a5b46174b487a1c89e6",
    measurementId: "G-1S98273L40"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  let mess = db.collection('messages');
  let coords;



  mapboxgl.accessToken = 'pk.eyJ1Ijoid3Rvc2Jvcm5lMDMiLCJhIjoiY2tna3F6ODF2MDdsMTJzbG4yNWs3dWJxaiJ9.902DiSI6jaX-O_f_seKSiQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
zoom: 22
});



  navigator.geolocation.getCurrentPosition(function(pos) {
    coords = pos.coords;
  });
  var youmarker = new mapboxgl.Marker()
	.setLngLat([30.5, 50.5])
	.addTo(map);


  navigator.geolocation.watchPosition(function(pos) {
  console.log(pos);
    map.easeTo({center: [pos.coords.longitude, pos.coords.latitude]});
    coords = pos.coords;
	youmarker.setLngLat([coords.longitude, coord.latitude]);
  });

  function refresh() {
    const query = mess.near({
      center: new firebase.firestore.GeoPoint(coords.longitude, coords.latitude),
      radius: 10000000000
    });
    query.get().then((value) => {
      // All GeoDocument returned by GeoQuery, like the GeoDocument added above
      console.log(value.docs);
    });
  }
  setInterval(refresh(), 1000);

