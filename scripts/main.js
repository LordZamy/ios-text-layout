$(document).ready(function() {
	var canvas = document.getElementById('render');
	var ctx = canvas.getContext('2d');

	addImage('images/ios-background.png');

	addIcon('images/dictionary.jpg', 20, 20, 10);	

	function addImage(url, x, y, scaleX, scaleY) {
		var img = new Image();
		img.src = url;

		img.onload = function() {
			ctx.drawImage(img, x || 0, y || 0, img.width * (scaleX || 0.5), img.height * (scaleY || 0.5));
		}
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