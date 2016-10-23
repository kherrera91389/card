$(function() {
  $("#btnSave").click(function() {
    html2canvas($("#card"), {
      onrendered: function(canvas) {
        theCanvas = canvas;
        document.body.appendChild(canvas);

        // Convert and download as image 
        Canvas2Image.saveAsPNG(canvas);
        $("#img-out").append(canvas);
        // Clean up 
        //document.body.removeChild(canvas);
      }
    });
  });
});


// window.takeScreenShot = function() {
//     html2canvas(document.getElementById("widget"), {
//         onrendered: function (canvas) {
//             document.body.appendChild(canvas);
//         },
//         width:320,
//         height:220
//     });
// }