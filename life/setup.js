$(function() {
	$(document).mousemove(function(e){
		mouse.x = e.pageX
		mouse.y = e.pageY
	})

	$(document).mousedown(function(e) {
		mouse.down = true
	})
	.mouseup(function(e) {
		mouse.down = false
	})

	$('#grid').on('click', '.tile', function() {
		game.resurrect(this);
	})
	.on('mousemove', '.tile', function() {
		if(!mouse.down) return;
		game.resurrect(this)
	})

	$('#overlay').on('click', function() {
		$(this).fadeOut();
	})

	$('#pause_play').click(handlers.click_pause_play_button)
	$('#clear').click(handlers.click_clear_button)
	Mousetrap.bind('space', handlers.click_pause_play_button)

	game.setup()
	game.run()

});

handlers = {
	click_pause_play_button: function() {
		game.toggle()
		if(game.paused) {
			$('#pause_play').text('run')
		}	else {
			$('#pause_play').text('pause')
		}		
	},
	click_clear_button: function() {
		game.clear()
	}
}

