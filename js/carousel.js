var getStyle = function (element, style) {
  return parseFloat(window.getComputedStyle(element).getPropertyValue(style));
};

var Carousel = function (className, delay, transitionDelay) {
  //Init
  if(className === undefined) className = "carousel-wrapper";
  if(delay === undefined) delay = 1000;
  if(transitionDelay === undefined) transitionDelay = 50;

  this.className = className;
  this.delay = delay;
  this.transitionDelay = transitionDelay;

  //Get Elements
  var carouselWrapper = document.getElementsByClassName(this.className)[0];
  var carouselElement = carouselWrapper.getElementsByClassName('carousel')[0];
  var carouselList = carouselElement.getElementsByClassName("carousel-list")[0];
  var carouselImageArray = carouselList.getElementsByTagName("div");
  var carouselImageCount = carouselImageArray.length;

  var carouselWidth = getStyle(carouselElement, "width");

  carouselElement.style.overflow = "hidden";
  carouselElement.style.position = "relative";

  //Position Images Vertically
  for(var i = 0; i < carouselImageCount; i++){
    carouselImageArray[i].style.left = (i * carouselWidth) + "px";
  }

  //Arrow Elements
  var arrowLeft = document.createElement("div");
  arrowLeft.setAttribute("class", "arrow-left");
  carouselWrapper.appendChild(arrowLeft);

  arrowLeft.onclick = function () {
    timeCounter = 0;
    clearTimeout(sliderInterval);
    var nextIndex = currentIndex - 1;
    if(nextIndex < 0) nextIndex = carouselImageCount - 1;
    animate(nextIndex);
    sliderIndex = nextIndex;
    //initSliderTransition();
  };

  var arrowRight = document.createElement("div");
  arrowRight.setAttribute("class", "arrow-right");
  carouselWrapper.appendChild(arrowRight);

  arrowRight.onclick = function () {
    timeCounter = 0;
    clearTimeout(sliderInterval);
    var nextIndex = currentIndex + 1;
    if(nextIndex > (carouselImageCount - 1)) nextIndex = 0;
    animate(nextIndex);
    sliderIndex = nextIndex;
    //initSliderTransition();
  };

  //Navigation Dots
  var dotElement = document.createElement("div");
  dotElement.setAttribute("class", "dotElement");
  var dotArray = [];
  for (var ind = 0; ind < carouselImageCount; ind++){
    var dotItem = document.createElement("span");
    //dotItem.setAttribute("class", "dot-item");
    dotItem.innerHTML = "&nbsp;";
    dotItem.onclick = (function (index) {
      return function(){
        timeCounter = 0;
        clearTimeout(sliderInterval);
        animate(index);
        sliderIndex = index;
      }
    })(ind);
    dotArray.push(dotItem);
    dotElement.appendChild(dotItem);
  }
  console.log(dotArray);
  carouselWrapper.appendChild(dotElement);

  var setCurrentDot = function(){
    for(var dotIndex = 0; dotIndex<dotArray.length; dotIndex++){
      if(dotIndex === sliderIndex) dotArray[dotIndex].setAttribute("class","active");
      else dotArray[dotIndex].setAttribute("class","");
    }
  }

  //Slider Timing
  var timeCounter = 0;
  var sliderIndex = 0;
  var nextIndex = 0;
  var currentIndex = 0;
  var sliderDelay = this.delay;
  var flag = 1;
  var sliderInterval;
  var transitionTime = this.transitionDelay;

  if(carouselImageCount == 1) return;

  var initSliderTransition = function () {
    setCurrentDot();
    sliderInterval = setTimeout(function () {
      timeCounter = 0;

      if(sliderIndex > (carouselImageCount - 1)) sliderIndex = 0;

      if(sliderIndex === 0) flag = 1;
      if(sliderIndex == (carouselImageCount - 1)) flag = -1;

      nextIndex = sliderIndex + flag;

      animate(nextIndex);

      sliderIndex += flag;

    }, sliderDelay);
  };

  var animate = function (index) {
    timeCounter = 0;
    var currentMargin = getStyle(carouselList, "margin-left");
    var targetMargin = -index * carouselWidth;
    var marginChange = (targetMargin - currentMargin)/transitionTime;
    //console.log(sliderIndex, index, currentMargin, targetMargin, marginChange);
    var transitionInterval = setInterval(function () {
      var currentMargin = getStyle(carouselList, "margin-left");
      if(timeCounter > (transitionTime - 2)) {
        clearInterval(transitionInterval);
        clearTimeout(sliderInterval);
        currentIndex = index;

        initSliderTransition();
      }
      timeCounter++;
      carouselList.style.marginLeft = (currentMargin + marginChange) + "px";
    }, 10);
  };

  initSliderTransition();

};
var slideshow1 = new Carousel("carousel-wrapper-1",2000);
var slideshow2 = new Carousel("carousel-wrapper-2",2000);
var slideshow3 = new Carousel("carousel-wrapper-3",2000);