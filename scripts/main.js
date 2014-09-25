$(document).ready(function() {
	var canvas = document.getElementById('render');
	var ctx = canvas.getContext('2d');

	addImage('images/ios-background.png');

	function addImage(url) {
		var img = new Image();
		img.src = url;

		img.onload = function() {
			ctx.drawImage(img, 0, 0, img.width / 2, img.height / 2);
		}
		console.log(img);
	}
});