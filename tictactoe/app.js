var combos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

$(function() {

  createBoard();
  $('.square').click(function() {
    var turn = $('#turn').text();

    $inner = $(this).children('.square-inner')
    if($inner.text() == ""){
      $inner.text(turn);
      $('#turn').text(turn == 'O' ? 'X' : 'O');
    }
    checkWinCondition()
    return false;
  });
});

function createBoard() {
  var $ttt = $('#tictactoe').hide();
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
  for(i = 0; i < combos.length; i++){
    var combo = combos[i];
    var initial = getSquare(combo[0]).text();
    for(k = 1; k < combo.length; k++){
      if(getSquare(combo[k]) != initial) continue;
      if(k == combo.length-1) endGame(combo);
    }
  }
}

function getSquare(index) {
  return $('.square:eq(' + index + ')');
}

function endGame(combo) {
  console.log(combo);
}
