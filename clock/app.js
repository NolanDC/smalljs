var consts = { COLUMN_HEIGHT: 360 }
var max = { h: 12, m: 60, s: 60 }

$(function() {
  createClock();
});

function createClock() {
  var $clock = $('#clock').hide();
  addColumns($clock);
  $('#wrapper').append($clock.fadeIn(1000));
  setTimeout(updateColumns, 100);
}

function addColumns($clock) {
  var times = getTimes();
  var pct = (100.0/times.length);

  for(i = 0; i < times.length; i++) {
    var time = times[i];
    var $column = $('<div style="width:' + pct + '%" class="column" id="'+time.name+'"></div>');
    var $blocks = $('<div class="blocks"/>');

    $column.append('<div class="column-inner"><div class="text">' + time.name + '</div></div>');
    $column.children('.column-inner').prepend($blocks);

    for(k = 0; k < max[time.name]; k++){
      var height = consts.COLUMN_HEIGHT/max[time.name];
      $blocks.prepend('<div class="block" style="height:' + height + 'px" rel="'+k+'"></div>');
    }

    $clock.append($column);
  }
}

function updateColumns() {
  times = getTimes();
  for(i = 0; i < times.length; i++) {
    var time = times[i];
    var value = time.value;
    var cutoff = (max[time.name]-(value));
    var $inner_column = $('#' + time.name).children('.column-inner');

    $inner_column.children('.text').text(value);
    $inner_column.find('.block:gt(' + cutoff +'), .block:eq(' + cutoff + ')').css({'opacity': 0.5});
    if(value == 0) $inner_column.find('.block').css({'opacity': 1});
  }
  setTimeout(updateColumns,100);
}

function getTimes() {
  var date = new Date();
  return [
    {name: 'h', value: (date.getHours() % 12 == 0 ? 12 : date.getHours() % 12)},
    {name: 'm', value: date.getMinutes()},
    {name: 's', value: date.getSeconds()}
  ]
}
