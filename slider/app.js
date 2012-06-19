$(function() {
  $('#modal').css({'margin-left': -$('#modal').width()/2});
  $('#next').live('click', function() {
    $('#modal').animate({'left': '-50%'}, function() {
      $(this).css({'left': '150%'});
      changeLinkStyles($(this).children('a'));
      $(this).animate({'left': '50%'});
    });
  });
})

function changeLinkStyles($e) {
  $e.toggleClass('alternate');
}
