$(document).ready(function() {
	var canvas = document.getElementById('render');
	var ctx = canvas.getContext('2d');

	addImage('images/ios-background.png');

	function addImage(url, x, y, scaleX, scaleY) {
		var img = new Image();
		img.src = url;

		img.onload = function() {
			ctx.drawImage(img, x || 0, y || 0, img.width * (scaleX || 0.5), img.height * (scaleY || 0.5));
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