$(document).ready(function() {
    var canvas = document.getElementById('render');
    var ctx = canvas.getContext('2d');

    // scratchCanvas hack for clip() fix in Chrome/Chromium
    var scratchCanvas = document.createElement('canvas');
    scratchCanvas.width = 100;
    scratchCanvas.height = 100;
    var scratchCtx = scratchCanvas.getContext('2d');

    var wordArr = [];
    var iconObj;

    /* hard coded values for 320px width layout */
    // top and left margins
    var startX = 16;
    var startY = 20;
    // spacing between icons
    var spaceX = 76;
    var spaceY = 90;
    //spacing between tray and icons
    var iconTrayOffset = (canvas.height - startY - spaceY * 5 - 60) / 2;

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
            for (var i = 0; i < wordArr.length; i++) {
                for (var j = 0; j < wordArr[i].length; j++) {
                    // get random icon
                    var icon = iconObj[wordArr[i][j]][Math.floor(Math.random() * iconObj[wordArr[i][j]].length)];
                    addIcon('images/' + icon + '.jpg', startX + spaceX * j, startY + spaceY * i);
                }
            }
            renderTray();
            $(backgroundImage).off();
        });

    }

    // function assumes clearing canvas is not needed
    function renderTray() {
        // draw a rectangle for the tray
        ctx.globalAlpha = 0.2;  // change alpha to make tray translucent
        ctx.beginPath();
        ctx.rect(0, startY + spaceY * 5, canvas.width, canvas.height - startY - spaceY * 5);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
        ctx.globalAlpha = 1;    // set alpha back to 1

        for(var i = 0; i < 4; i++) {
            var icon = iconObj.MISC[Math.floor(Math.random() * iconObj.MISC.length)];
            addIcon('images/' + icon + '.png', startX + spaceX * i, startY + spaceY * 5 + iconTrayOffset, 10.5, 0.51, 0.51);
        }
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

            // code taken from http://stackoverflow.com/a/13854185/1593122
            // hack for fixing clip() issue in Chrome/Chromium

            scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
            scratchCtx.globalCompositeOperation = 'source-over';

            scratchCtx.drawImage(img, 0, 0, img.width * (scaleX || 0.4), img.height * (scaleY || 0.4));

            scratchCtx.fillStyle = '#fff';
            scratchCtx.globalCompositeOperation = 'destination-in';
            roundedImage(scratchCtx, 0, 0, img.width * (scaleX || 0.4), img.height * (scaleY || 0.4), radius || 10.5);
            scratchCtx.fill();

            ctx.drawImage(scratchCanvas, x, y);

            ctx.restore();
        }
    }

    // code taken from http://stackoverflow.com/a/19593950/1593122
    function roundedImage(ctx, x, y, width, height, radius) {
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
