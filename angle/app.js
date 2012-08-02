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
  var radius = 300;
  var inner_radius = 100;
  context.clearRect(0,0,swidth,sheight);

  context.beginPath();
  //context.arc(swidth/2, sheight/2, 2, 2*Math.PI, false);
  context.fill();

  var angle = Math.atan2(mouse.y - sheight/2, mouse.x-swidth/2);
  arcend = {x: Math.cos(angle)*radius+center.x, y: Math.sin(angle)*radius+center.y}
  context.lineWidth= 2;
  context.beginPath();
    context.fillStyle="#e5fbff";
    context.moveTo(center.x, center.y);
    context.arc(center.x, center.y, radius, Math.PI, angle, false);
    context.fill();
    context.strokeStyle = "black";
    context.moveTo(center.x, center.y);
    context.lineTo(arcend.x, arcend.y);
    context.stroke();
  context.closePath();

  context.fillStyle="#333";
  context.moveTo(center.x, center.y);
  context.beginPath();
    context.arc(center.x, center.y, inner_radius, 0, Math.PI*2, false);
    context.fill();
    context.stroke();
  context.closePath();

  context.textAlign = "center";
  context.fillStyle = "#eee";
  context.font = "50px helvetica";


  var deg = rad2deg(angle)+180
  context.fillText(parseInt(deg), center.x, center.y+20);

}

function rad2deg(radians) {
  return radians / Math.PI * 180;
}

function deg2rad(degrees) {
  return degrees / 180 * Math.PI;
}