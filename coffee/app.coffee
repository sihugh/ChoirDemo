class Part
	@name
	@colour

	draw : (context, x, y, size) =>
		context.fillStyle = @colour
		context.fillRect x, y, size, size


class LowerBass extends Part
	constructor : () ->
		@name = "LowerBass"
		@colour = "Purple"

class UpperBass extends Part
	constructor : () ->
		@name = "UpperBass"
		@colour = "Green"

class LowerAlto extends Part
	constructor : () ->
		@name = "LowerAlto"
		@colour = "Orange"

class UpperAlto extends Part
	constructor : () ->
		@name = "UpperAlto"
		@colour = "Blue"

class LowerSoprano extends Part
	constructor : () ->
		@name = "LowerSoprano"
		@colour = "Black"

class UpperSoprano extends Part
	constructor : () ->
		@name = "UpperSoprano"
		@colour = "Red"

class Lineup
	constructor : (rows, parts) ->
		@rows = rows
		@parts = parts

	getRowLength = (rows, parts) ->
		rowLength = (Math.floor (parts.length / rows))

	getRemainder = (rowLength, parts) ->
		parts.length % rowLength

	draw : () ->
		choirSize = $('#choirsize')
		choirSize.html("Total: #{@parts.length}")

		canvas = $('#choircanvas')[0]

		windowWidth = $(window).width()
		inputsWidth = $('#inputs').width()
		rightColumnSpace = windowWidth - inputsWidth
		if (rightColumnSpace > 600)
			canvasWidth = rightColumnSpace
		else
			canvasWidth = $('#results').width()

		canvasWidth = (canvasWidth) - 25

		$('#choircanvas').attr("width", "#{canvasWidth}px")

		context = canvas.getContext '2d'

		context.clearRect 0, 0, canvas.width, canvas.height

		rowLength = getRowLength @rows, @parts 
		
		remainder = getRemainder rowLength, @parts
		
		end = Math.floor(remainder / 2)

		rowLength += 2 unless end == 0
		
		horizontalSize = Math.floor(canvas.width / (rowLength + 4)) 
		verticalSize = Math.floor($(window).height() / (@rows + 1))
		size = Math.min(horizontalSize, verticalSize)

		canvasHeight = size * (@rows + 3)
		$('#choircanvas').attr("height", "#{canvasHeight}px")

		x = 0
		y = 1
		xInitialOffset = ((canvas.width - (rowLength * size)) / 2)
		yOffset = size
		xOffset = size
		
		for part in @parts
			part.draw(context, (xInitialOffset + (x * xOffset)) , (y++ * yOffset), (size - 5))

			rowFilled = ((y - 1) % @rows) == 0
			remainderUsed = (x == 0) and ((y - 1) == end)

			if rowFilled or remainderUsed 
				x++
				y = 1

			

refreshParts = () ->
	$lowerBassesInput = $('#lowerbasses')
	$upperBassesInput = $('#upperbasses')
	$lowerAltosInput = $('#loweraltos')
	$upperAltosInput = $('#upperaltos')
	$lowerSopsInput = $('#lowersops')
	$upperSopsInput = $('#uppersops')
	$rowsInput = $('#rows')
	
	getIntValue = ($partInput) ->
		value = $partInput.val()
		parseInt(value)

	allParts = []
	for n in [1..(getIntValue $lowerBassesInput)]
		allParts.push new LowerBass
	for n in [1..(getIntValue $upperBassesInput)]
		allParts.push new UpperBass
	for n in [1..(getIntValue $lowerAltosInput)]
		allParts.push new LowerAlto
	for n in [1..(getIntValue $upperAltosInput)]
		allParts.push new UpperAlto
	for n in [1..(getIntValue $lowerSopsInput)]
		allParts.push new LowerSoprano
	for n in [1..(getIntValue $upperSopsInput)]
		allParts.push new UpperSoprano

	rows = getIntValue $rowsInput
	lineup = new Lineup rows, allParts
	lineup.draw()

$choirCanvas = null

jQuery ->
	$inputs = $('input')	
	$inputs.on('change', refreshParts)
	
	refreshParts()
