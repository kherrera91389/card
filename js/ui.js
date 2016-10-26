$(function() {
  $("#btnSave").click(function() {
    html2canvas($("#card"), {
      onrendered: function(canvas) {
        theCanvas = canvas;
        // document.body.getElementById('img-out')[0].appendChild(canvas);
        // document.body.appendChild(canvas);

        // Convert and download as image 
        // theCanvas.saveAsPNG(canvas);
        $("#img-out").append(canvas);
        // Clean up 
        // document.body.removeChild(canvas);
      }
    });
  });
});

    var app = angular.module("app", []);

    app.controller("Controller", function ($scope) {

        $scope.cardNumber = 'Walmart Gift Card';
        
        $scope.cardHolder = '250$';

        $scope.fileLoaded = function (e) {
            var tgt = e.target || window.event.srcElement,
                files = tgt.files,
                fileReader;

            if (FileReader && files && files.length) {
                fileReader = new FileReader();
                fileReader.onload = function () {

                    $scope.loadedFile = fileReader.result;
                    $scope.$apply();
                }
                fileReader.readAsDataURL(files[0]);
            } else {
                // Not supported
            }
        };
        $scope.cardLogo = function (e) {
            var tgt = e.target || window.event.srcElement,
                files = tgt.files,
                fileReader;

            if (FileReader && files && files.length) {
                fileReader = new FileReader();
                fileReader.onload = function () {

                    $scope.loadedLogo = fileReader.result;
                    $scope.$apply();
                }
                fileReader.readAsDataURL(files[0]);
            } else {
                // Not supported
            }
        };

    });


    var $card = $('.card'),
    $light = $('.light'),
    $layer = $('div[class*="layer-"]');
$(window).on('mousemove', function(e) {
  var w = $(window).width(), //window width
      h = $(window).height(), //window height
      offsetX = 0.5 - e.pageX / w, //cursor position X
      offsetY = 0.5 - e.pageY / h, //cursor position Y
      dy = e.pageY - h / 2, //@h/2 = center of poster
      dx = e.pageX - w / 2, //@w/2 = center of poster
      theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
      angle = theta * 180 / Math.PI - 90, //convert rad in degrees
      offsetPoster = $card.data('offset'),
      transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)'; //poster transform

  //get angle between 0-360
  if (angle < 0) {
    angle = angle + 360;
  }
  //gradient angle and opacity
  $light.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h * .5 + ') 0%,rgba(255,255,255,0) 80%)');
  //poster transform
  $card.css('transform', transformPoster);

  //parallax foreach layer
  $layer.each(function() {
    var $this = $(this),
        offsetLayer = $this.data('offset') || 0,
        transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
    $this.css('transform', transformLayer);
  });

});