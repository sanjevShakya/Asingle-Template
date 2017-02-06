;function initMap() {
  var uluru = {lat: 27.7172, lng: 85.3240};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru
  });
  map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
}

;(function () {
	var hamburger = document.getElementsByClassName('btn-hamburger')[0];
	var navBar = document.getElementsByClassName('nav-bar')[0];
	
  document.onclick = function(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains("fa-bars")) {
      navBar.classList.toggle("show");
    }else {
      navBar.classList.remove("show");
    }
  }
	
})();

