var combos = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6] ]

$(function() {

  createBoard();
  $('.square').live('click', function() {
    var turn = $('#turn').text();

    $inner = $(this).children('.square-inner')
    if($inner.text() == ""){
      $inner.text(turn);
      $('#turn').text(turn == 'O' ? 'X' : 'O');
      checkWinCondition();
    }
    return false;
  });

  $('#reset').live('click', function() {
    console.log('hi');
    createBoard();
    $(this).remove();
  });
});

function createBoard() {
  var $ttt = $('#tictactoe').html('').hide();
  $('#turn').text('O').hide();

  addSquares($ttt);
  $('#wrapper').append($ttt.fadeIn(1000));
  $('#turn').fadeIn(1000);
}

function addSquares($ttt) {
  for(i = 0; i < 9; i++) {
    $ttt.append('<a href="#" class="square"><div class="square-inner"></div</a>');
  }
  $('.square:lt(3)').css('border-bottom', '1px dashed #999');
  $('.square:gt(5)').css('border-top', '1px dashed #999');
  $.each([0,3,6], function(index, item) { getSquare(item).css('border-right', '1px dashed #999')});
  $.each([2,5,8], function(index, item) { getSquare(item).css('border-left', '1px dashed #999')});
}

function checkWinCondition() {
  var combo, initial;

  for(i = 0; i < combos.length; i++){
    combo = combos[i];
    initial = getText(combo[0]);
    if(initial=="") continue;
    for(k = 1; k < combo.length; k++){
      if(getText(combo[k]) != initial) break;
      if(k == combo.length-1) {
        endGame(combo);
        return;
      }
    }
  }
}

function getSquare(index) {
  return $('.square:eq(' + index + ')');
}

function getText(index) {
  return getSquare(index).children('.square-inner').text();
}

function endGame(combo) {
  for(i = 0; i < combo.length; i++){
    getSquare(combo[i]).css('background-color', 'white');
  }
  $('#turn').text('');
  $('#wrapper').prepend('<a href="#" id="reset">reset</a>');
}
