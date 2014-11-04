$(document).ready(function() {
	var canvas = document.getElementById('render');
	var ctx = canvas.getContext('2d');

	var wordArr = [];
	var iconObj;

	/* hard coded values for 320px width layout */
	// top and left margins
	var startX = 16;
	var startY = 20;
	// spacing between icons
	var spaceX = 76;
	var spaceY = 90;

	// load data.json
	$.getJSON('data.json', function(data) {
		iconObj = data;
	}).fail(function() {
		alert('There was a problem loading/reading JSON.');
	});

	$("#form-submit").click(function() {
		wordArr = [];
		$("#render-form :input").each(function() {
			var input = $(this);
			if (input.val() !== "") {
				wordArr.push(input.val().toUpperCase().replace(/[0-9_\W]/g, '').split(""));
			}
		});
		renderLayout();
	});

	function renderLayout() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var backgroundImage = addImage('images/ios-background.png');
		$(backgroundImage).on('imgload', function() {
			for(var i = 0; i < wordArr.length; i++) {
				for(var j = 0; j < wordArr[i].length; j++) {
					// get random icon
					var icon = iconObj[wordArr[i][j]][Math.floor(Math.random() * iconObj[wordArr[i][j]].length)];
					addIcon('images/' + icon + '.jpg', startX + spaceX * j, startY + spaceY * i);
				}
			}
			$(backgroundImage).off();
		});

	}

	function addImage(url, x, y, scaleX, scaleY) {
		var img = new Image();
		img.src = url;

		img.onload = function() {
			ctx.drawImage(img, x || 0, y || 0, img.width * (scaleX || 0.5), img.height * (scaleY || 0.5));
			$(img).trigger('imgload');
		}

		return img;
	}

	function addIcon(url, x, y, radius, scaleX, scaleY) {
		var img = new Image();
		img.src = url;

		img.onload = function() {
			ctx.save();
			// hardcoded default values for 320px width
			roundedImage(x, y, img.width * (scaleX || 0.4), img.height * (scaleY || 0.4), radius || 10.5);
			ctx.clip();
			ctx.drawImage(img, x, y, img.width * (scaleX || 0.4), img.height * (scaleY || 0.4));
			ctx.restore();
		}
	}

	// code taken from http://stackoverflow.com/a/19593950/1593122
	function roundedImage(x, y, width, height, radius) {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	}
});
