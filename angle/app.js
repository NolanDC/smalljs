var canvas, context, swidth, sheight;
var mouse = {x: 0, y: 0};

$(function() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');

  swidth = document.width;
  sheight = document.height-20;

  center = {x: swidth/2, y:sheight/2};

  canvas.width = swidth;
  canvas.height = sheight;

  render();

  $(document).on('mousemove', function(e) {
    mouseMove(e);
  })
});

function mouseMove(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;

  render();
}

function render() {
  var radius = 100;
  context.clearRect(0,0,swidth,sheight);

  context.beginPath();
  //context.arc(swidth/2, sheight/2, 2, 2*Math.PI, false);
  context.fill();

  var angle = Math.atan2(mouse.y - sheight/2, mouse.x-swidth/2);
  arcend = {x: Math.cos(angle)*radius+center.x, y: Math.sin(angle)*radius+center.y}
  //console.log(angle);
  /*context.beginPath();
    
    //context.moveTo(center.x, center.y);
    //context.lineTo(mouse.x, mouse.y);
    
    context.moveTo(center.x, center.y);
    context.lineTo(arcend.x, arcend.y);

    context.moveTo(center.x+radius,center.y);
    context.lineTo(center.x, center.y)

    context.stroke();
  context.closePath();*/

  context.beginPath();
    context.fillStyle="#e5fbff";
    context.moveTo(center.x, center.y);
    context.arc(center.x, center.y, radius, 0, angle, false);
    context.fill();
    context.strokeStyle = "black";
    context.stroke();
  context.closePath();

}