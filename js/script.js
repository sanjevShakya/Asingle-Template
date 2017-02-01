; function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 50,
          center: uluru
        });
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

