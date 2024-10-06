$(window).load(function(){
  console.log('F successfully!');
  var body = $("body"),
      universe = $("#universe"),
      solarsys = $("#solar-system");

  var init = function(parameter) {
    console.log('Parameter:', parameter);
    fetchPlanetPositions();
    body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
      $(this).removeClass('hide-UI').addClass("set-speed");
      $(this).dequeue();
    });
  };

  var setView = function(view) { universe.removeClass().addClass(view); };

  $("#toggle-data").click(function(e) {
    body.toggleClass("data-open data-close");
    e.preventDefault();
  });

  $("#toggle-controls").click(function(e) {
    body.toggleClass("controls-open controls-close");
    e.preventDefault();
  });

  $("#data a").click(function(e) {
    var ref = $(this).attr("class");
    solarsys.removeClass().addClass(ref);
    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });

  $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
  $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
  $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
  $(".set-size").click(function() { setView("scale-s set-size"); });
  $(".set-distance").click(function() { setView("scale-d set-distance"); });

  init(parameter);

  // Function to update planetary positions based on static Keplerian data
  var updatePlanetPositionsUsingKepler = function() {
    var keplerianData = {
      mercury: { angle: 48.3313, distance: 0.39 },
      venus: { angle: 76.6807, distance: 0.72 },
      earth: { angle: 0.0000, distance: 1.00 },
      mars: { angle: 49.57854, distance: 1.52 },
      jupiter: { angle: 100.464, distance: 5.20 },
      saturn: { angle: 113.665, distance: 9.58 },
      uranus: { angle: 74.006, distance: 19.22 },
      neptune: { angle: 131.784, distance: 30.05 }
    };

    for (var planet in keplerianData) {
      if (keplerianData.hasOwnProperty(planet)) {
        $('#' + planet).css({
          'transform': 'rotate(' + keplerianData[planet].angle + 'deg) translateX(' + keplerianData[planet].distance + 'em)'
        });
      }
    }
  };

  updatePlanetPositionsUsingKepler();

});