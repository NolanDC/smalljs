/*	NOTES
	I've adopted twitter's no-semicolon policy for this project. No particular reason why, but does make
	the code look a bit cleaner
*/

var mouse = {x: 0, y: 0, down: false}


var grid = {
	tile_size: 30,
	width: function() {
		return Math.ceil((window.innerWidth - 100)/this.tile_size)
	},
	height: function() {
		return Math.ceil(window.innerHeight/this.tile_size)
	}
}


var game = {
	paused: true,
	fps: 5,
	tiles: [],

	setup: function() {
		for(var i = 0; i < grid.width() * grid.height(); i++) {
			$('#grid').append('<div class="tile" rel="0"><div class="tile_inner"></div></div>')
		}
		$('#grid').css({width: grid.tile_size * grid.width()})
		$('.tile').css({width: grid.tile_size + 'px', height: grid.tile_size + 'px'})
		this.tiles = $('.tile')		
	},

	run: function() {	
		if(this.paused == false)	{
			this.calculate()
			this.set_status()					
		}
			
		setTimeout(function() { game.run() }, 1000/this.fps)
	},

	calculate: function() {
		var tiles = this.tiles
		for(var i = 0; i < tiles.length; i++) {
			var $tile = $(tiles[i])
			var tile_index = i
			var width = grid.width()
				, height = grid.height()
			$tile.attr('data-index', i)

			var alive_neighbors = lib.array.select(
				[
					tiles[tile_index - 1],
					tiles[tile_index + 1],
					tiles[tile_index - width],
					tiles[tile_index + width],
					tiles[tile_index-width-1],
					tiles[tile_index-width+1],
					tiles[tile_index+width-1],
					tiles[tile_index+width+1]
				], 
				function(t) {
					return $(t).hasClass('alive')
				}
			).length
				
			$tile.attr('rel', alive_neighbors)
			//$tile.children('.tile_inner').text(alive_neighbors)
		}		
	},

	set_status: function() {
		var tiles = this.tiles
		for(var i = 0; i < tiles.length; i++) {
			var $tile = $(tiles[i])
			var alive_neighbors = $tile.attr('rel')
			if($tile.hasClass('alive') && (alive_neighbors < 2 || alive_neighbors > 3))
				$tile.removeClass('alive')				
			if(!$tile.hasClass('alive') && alive_neighbors == 3)
				$tile.addClass('alive')
		}
	},

	clear: function() {
		$('.alive').removeClass('alive')
	},

	toggle: function() {
		this.paused = !this.paused
	},

	resurrect: function(tile) {
		$(tile).addClass('alive')
	}
}


var lib = {
	array: {
		select: function(array, truth_function) {
			var temp = new Array()
			for(var i = 0; i < array.length; i++) {
				if(truth_function(array[i]))
					temp.push(array[i])
			}
			return temp
		},
		apply: function(array, application_function) {
			for(var i = 0; i < array.length; i++) {
				application_function(array[i])
			}
		}		
	}
}