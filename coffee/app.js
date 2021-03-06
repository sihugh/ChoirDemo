(function() {
  var $choirCanvas, Lineup, LowerAlto, LowerBass, LowerSoprano, Part, UpperAlto, UpperBass, UpperSoprano, refreshParts,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Part = (function() {
    function Part() {
      this.draw = __bind(this.draw, this);
    }

    Part.name;

    Part.colour;

    Part.prototype.draw = function(context, x, y, size) {
      context.fillStyle = this.colour;
      return context.fillRect(x, y, size, size);
    };

    return Part;

  })();

  LowerBass = (function(_super) {
    __extends(LowerBass, _super);

    function LowerBass() {
      this.name = "LowerBass";
      this.colour = "Purple";
    }

    return LowerBass;

  })(Part);

  UpperBass = (function(_super) {
    __extends(UpperBass, _super);

    function UpperBass() {
      this.name = "UpperBass";
      this.colour = "Green";
    }

    return UpperBass;

  })(Part);

  LowerAlto = (function(_super) {
    __extends(LowerAlto, _super);

    function LowerAlto() {
      this.name = "LowerAlto";
      this.colour = "Orange";
    }

    return LowerAlto;

  })(Part);

  UpperAlto = (function(_super) {
    __extends(UpperAlto, _super);

    function UpperAlto() {
      this.name = "UpperAlto";
      this.colour = "Blue";
    }

    return UpperAlto;

  })(Part);

  LowerSoprano = (function(_super) {
    __extends(LowerSoprano, _super);

    function LowerSoprano() {
      this.name = "LowerSoprano";
      this.colour = "Black";
    }

    return LowerSoprano;

  })(Part);

  UpperSoprano = (function(_super) {
    __extends(UpperSoprano, _super);

    function UpperSoprano() {
      this.name = "UpperSoprano";
      this.colour = "Red";
    }

    return UpperSoprano;

  })(Part);

  Lineup = (function() {
    var getRemainder, getRowLength;

    function Lineup(rows, parts) {
      this.rows = rows;
      this.parts = parts;
    }

    getRowLength = function(rows, parts) {
      var rowLength;
      return rowLength = Math.floor(parts.length / rows);
    };

    getRemainder = function(rowLength, parts) {
      return parts.length % rowLength;
    };

    Lineup.prototype.draw = function() {
      var canvas, canvasHeight, canvasWidth, choirSize, context, end, horizontalSize, inputsWidth, part, remainder, remainderUsed, rightColumnSpace, rowFilled, rowLength, size, verticalSize, windowWidth, x, xInitialOffset, xOffset, y, yOffset, _i, _len, _ref, _results;
      choirSize = $('#choirsize');
      choirSize.html("Total: " + this.parts.length);
      canvas = $('#choircanvas')[0];
      windowWidth = $(window).width();
      inputsWidth = $('#inputs').width();
      rightColumnSpace = windowWidth - inputsWidth;
      if (rightColumnSpace > 600) {
        canvasWidth = rightColumnSpace;
      } else {
        canvasWidth = $('#results').width();
      }
      canvasWidth = canvasWidth - 25;
      $('#choircanvas').attr("width", "" + canvasWidth + "px");
      context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      rowLength = getRowLength(this.rows, this.parts);
      remainder = getRemainder(rowLength, this.parts);
      end = Math.floor(remainder / 2);
      if (end !== 0) {
        rowLength += 2;
      }
      horizontalSize = Math.floor(canvas.width / (rowLength + 4));
      verticalSize = Math.floor($(window).height() / (this.rows + 1));
      size = Math.min(horizontalSize, verticalSize);
      canvasHeight = size * (this.rows + 3);
      $('#choircanvas').attr("height", "" + canvasHeight + "px");
      x = 0;
      y = 1;
      xInitialOffset = (canvas.width - (rowLength * size)) / 2;
      yOffset = size;
      xOffset = size;
      _ref = this.parts;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        part.draw(context, xInitialOffset + (x * xOffset), y++ * yOffset, size - 5);
        rowFilled = ((y - 1) % this.rows) === 0;
        remainderUsed = (x === 0) && ((y - 1) === end);
        if (rowFilled || remainderUsed) {
          x++;
          _results.push(y = 1);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Lineup;

  })();

  refreshParts = function() {
    var $lowerAltosInput, $lowerBassesInput, $lowerSopsInput, $rowsInput, $upperAltosInput, $upperBassesInput, $upperSopsInput, allParts, getIntValue, lineup, n, rows, _i, _j, _k, _l, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    $lowerBassesInput = $('#lowerbasses');
    $upperBassesInput = $('#upperbasses');
    $lowerAltosInput = $('#loweraltos');
    $upperAltosInput = $('#upperaltos');
    $lowerSopsInput = $('#lowersops');
    $upperSopsInput = $('#uppersops');
    $rowsInput = $('#rows');
    getIntValue = function($partInput) {
      var value;
      value = $partInput.val();
      return parseInt(value);
    };
    allParts = [];
    for (n = _i = 1, _ref = getIntValue($lowerBassesInput); 1 <= _ref ? _i <= _ref : _i >= _ref; n = 1 <= _ref ? ++_i : --_i) {
      allParts.push(new LowerBass);
    }
    for (n = _j = 1, _ref1 = getIntValue($upperBassesInput); 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; n = 1 <= _ref1 ? ++_j : --_j) {
      allParts.push(new UpperBass);
    }
    for (n = _k = 1, _ref2 = getIntValue($lowerAltosInput); 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; n = 1 <= _ref2 ? ++_k : --_k) {
      allParts.push(new LowerAlto);
    }
    for (n = _l = 1, _ref3 = getIntValue($upperAltosInput); 1 <= _ref3 ? _l <= _ref3 : _l >= _ref3; n = 1 <= _ref3 ? ++_l : --_l) {
      allParts.push(new UpperAlto);
    }
    for (n = _m = 1, _ref4 = getIntValue($lowerSopsInput); 1 <= _ref4 ? _m <= _ref4 : _m >= _ref4; n = 1 <= _ref4 ? ++_m : --_m) {
      allParts.push(new LowerSoprano);
    }
    for (n = _n = 1, _ref5 = getIntValue($upperSopsInput); 1 <= _ref5 ? _n <= _ref5 : _n >= _ref5; n = 1 <= _ref5 ? ++_n : --_n) {
      allParts.push(new UpperSoprano);
    }
    rows = getIntValue($rowsInput);
    lineup = new Lineup(rows, allParts);
    return lineup.draw();
  };

  $choirCanvas = null;

  jQuery(function() {
    var $inputs;
    $inputs = $('input');
    $inputs.on('change', refreshParts);
    return refreshParts();
  });

}).call(this);
