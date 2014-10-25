$(document).ready(function() {
	var canvas = document.getElementById('render');
	var ctx = canvas.getContext('2d');

	var wordArr = []; 

	var backgroundImage = addImage('images/ios-background.png');

	$(backgroundImage).on('imgload', function() {
		// test hard-coded image positioning for 320px width
		addIcon('images/dictionary.jpg', 16, 20);
		addIcon('images/engadget.jpg', 92, 20);
		addIcon('images/eventbrite.jpg', 168, 20);
		addIcon('images/facebook.jpg', 244, 20);

		addIcon('images/dictionary.jpg', 16, 110);
		addIcon('images/engadget.jpg', 92, 110);
		addIcon('images/eventbrite.jpg', 168, 110);
		addIcon('images/facebook.jpg', 244, 110);

		addIcon('images/dictionary.jpg', 16, 200);
		addIcon('images/engadget.jpg', 92, 200);
		addIcon('images/eventbrite.jpg', 168, 200);
		addIcon('images/facebook.jpg', 244, 200);
	
		addIcon('images/dictionary.jpg', 16, 290);
		addIcon('images/engadget.jpg', 92, 290);
		addIcon('images/eventbrite.jpg', 168, 290);
		addIcon('images/facebook.jpg', 244, 290);
	
		addIcon('images/dictionary.jpg', 16, 380);
		addIcon('images/engadget.jpg', 92, 380);
		addIcon('images/eventbrite.jpg', 168, 380);
		addIcon('images/facebook.jpg', 244, 380);
	});

	$("#form-submit").click(function() {
		wordArr = [];
		$("#render-form :input").each(function() {
			var input = $(this);
			if(input.val() !== "") {
				wordArr.push(input.val().toUpperCase().split(""));
			}
		});
	});

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
			roundedImage(x, y, img.width * (scaleX || 0.4), img.height * (scaleY || 0.4), radius || 10);
			ctx.clip();
			ctx.drawImage(img, x, y, img.width * (scaleX || 0.4), img.height * (scaleY || 0.4));
			ctx.restore();
		}
	}

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