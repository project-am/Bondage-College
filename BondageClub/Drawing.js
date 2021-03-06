// The main game canvas where everything will be drawn
var MainCanvas;
var TempCanvas;
var ColorCanvas;

// A bank of all the chached images
var DrawCacheImage = {};
var DrawCacheLoadedImages = 0;
var DrawCacheTotalImages = 0;
var DrawScreenWidth = -1;
var DrawScreenHeight = -1;

// Convert a hex color string to a RGB color
function DrawHexToRGB(color) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    color = color.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {
        r: 0,
        g: 0,
        b: 0
    };
}

// Returns the hex value of a RGB data
function DrawRGBToHex(rgb){
	var rgb = rgb[2] | (rgb[1] << 8) | (rgb[0] << 16);
    return '#' + (0x1000000 + rgb).toString(16).slice(1);
};

// Loads the drawing objects
function DrawLoad() {
	
	// Creates the objects used in the game
	MainCanvas = document.getElementById("MainCanvas").getContext("2d");
	TempCanvas = document.createElement("canvas").getContext("2d");
	ColorCanvas = document.createElement("canvas");
	document.getElementById("MainCanvas").addEventListener("keypress", KeyDown);
	document.getElementById("MainCanvas").tabIndex = 1000;	

	// Font is fixed for now, color can be set
	MainCanvas.font = "36px Arial";
	MainCanvas.textAlign = "center";
	MainCanvas.textBaseline = "middle";
	
}

// Returns the image file or build it from the source
function DrawGetImage(Source) {

    // Search in the cache to find the image
    if (!DrawCacheImage[Source]) {
        var img = new Image;
        img.src = Source;
        DrawCacheImage[Source] = img;
		
		// Reloads all character canvas once everything is loaded
		if (Source.indexOf("Assets") >= 0) {
			DrawCacheTotalImages++;
			img.onload = function () {			
				DrawCacheLoadedImages++;
				if (DrawCacheLoadedImages == DrawCacheTotalImages)
					CharacterLoadCanvasAll();				
			}			
		}
    }

    // returns the final image
    return DrawCacheImage[Source];
}

// Refreshes the character if not all images are loaded and draw the character canvas on the main game screen
function DrawCharacter(C, X, Y, Zoom) {

	// The file name changes if the player is gagged or blinks at specified intervals
	var seconds = new Date().getTime();
	var Canvas = (Math.round(seconds / 400) % C.BlinkFactor == 0) ? C.CanvasBlink : C.Canvas;
	if ((Zoom == undefined) || (Zoom == 1))
		DrawCanvas(Canvas, X, Y - C.HeightModifier);
    else
		DrawCanvasZoom(Canvas, X, Y - (C.HeightModifier * Zoom), Zoom);

	// Draws the character focus zones if we need too
	if ((C.FocusGroup != null) && (C.FocusGroup.Zone != null))
		for(var Z = 0; Z < C.FocusGroup.Zone.length; Z++)
			DrawEmptyRect(C.FocusGroup.Zone[Z][0] + X, C.FocusGroup.Zone[Z][1] + Y - C.HeightModifier, C.FocusGroup.Zone[Z][2], C.FocusGroup.Zone[Z][3], "cyan");
	
	// Draw the character name below herself
	if (C.Name != "") DrawText(C.Name, X + 255, Y + 980, "White", "Black");
	
}
		
// Draw a zoomed image from a source to a specific canvas
function DrawImageZoomCanvas(Source, Canvas, SX, SY, SWidth, SHeight, X, Y, Width, Height) {
	Canvas.drawImage(DrawGetImage(Source), SX, SY, Math.round(SWidth), Math.round(SHeight), X, Y, Width, Height);
}

function DrawImageResize(Source, X, Y, Width, Height) {
	var img = DrawGetImage(Source);
	MainCanvas.drawImage(img, 0, 0, img.width, img.height, X, Y, Width, Height);
}

// Draw a zoomed image from a source to a specific canvas
function DrawImageCanvas(Source, Canvas, X, Y) {
	Canvas.drawImage(DrawGetImage(Source), X, Y);
}

// Draw a specific canvas on the main canvas
function DrawCanvas(Canvas, X, Y) {
	MainCanvas.drawImage(Canvas, X, Y);
}

// Draw a specific canvas with a zoom on the main canvas
function DrawCanvasZoom(Canvas, X, Y, Zoom) {
	MainCanvas.drawImage(Canvas, 0, 0, Canvas.width, Canvas.height, X, Y, Canvas.width * Zoom, Canvas.height * Zoom);
}

// Draw a zoomed image from a source to the canvas and mirrors it from left to right
function DrawImageZoomMirror(Source, SX, SY, SWidth, SHeight, X, Y, Width, Height) {
	MainCanvas.save();
    MainCanvas.scale(-1, 1);
	MainCanvas.drawImage(DrawGetImage(Source), X * -1, Y, Width * -1, Height);
    MainCanvas.restore();
}

// Draw an image from a source to the canvas
function DrawImage(Source, X, Y) {
	MainCanvas.drawImage(DrawGetImage(Source), X, Y);
}

// Draw an image from a source to the canvas
function DrawImageCanvasColorize(Source, Canvas, X, Y, Zoom, HexColor, FullAlpha) {

	// Make sure that the starting image is loaded
	var Img = new Image();
	Img.src = DrawGetImage(Source).src;
	if ((Img != null) && (Img.width > 0)) {

		// Prepares a canvas to draw the colorized image
		ColorCanvas.width = Img.width;
		ColorCanvas.height = Img.height;
		var ctx = ColorCanvas.getContext("2d");
		ctx.drawImage(Img,0,0);
		var imageData = ctx.getImageData(0,0,ColorCanvas.width,ColorCanvas.height);
		var data = imageData.data;

		// Get the RGB color used to transform
		var rgbColor = DrawHexToRGB(HexColor);
		var trans;

		// We transform each non transparent pixel based on the RGG value
		if (FullAlpha) {
			for(var p = 0, len = data.length; p < len; p+=4) {
				if (data[p+3] == 0)
				   continue;
				trans = ((data[p] + data[p + 1] + data[p + 2]) / 383);
				data[p + 0] = rgbColor.r * trans;
				data[p + 1] = rgbColor.g * trans;
				data[p + 2] = rgbColor.b * trans;
			}		
		} else {
			for(var p = 0, len = data.length; p < len; p+=4) {
				trans = ((data[p] + data[p + 1] + data[p + 2]) / 383);
				if ((data[p+3] == 0) || (trans < 0.8) || (trans > 1.2))
				   continue;
				data[p + 0] = rgbColor.r * trans;
				data[p + 1] = rgbColor.g * trans;
				data[p + 2] = rgbColor.b * trans;
			}
		}

		// Replace the source image with the modified canvas
		ctx.putImageData(imageData, 0, 0);
		Canvas.drawImage(ctx.canvas, 0, 0, Img.width, Img.height, X, Y, Img.width * Zoom, Img.height * Zoom);
	
	}
	
}

// Draw an image from a source to the canvas
function DrawImageMirror(Source, X, Y) {
	MainCanvas.save();
    MainCanvas.scale(-1, 1);
	MainCanvas.drawImage(DrawGetImage(Source), X * -1, Y);
    MainCanvas.restore();
}

// Draw a word wrapped text in a rectangle
function DrawTextWrap(Text, X, Y, Width, Height, ForeColor, BackColor) {

	// Draw the rectangle if we need too
	if (BackColor != null) {
		MainCanvas.beginPath();
		MainCanvas.rect(X, Y, Width, Height);
		MainCanvas.fillStyle = BackColor; 
		MainCanvas.fillRect(X, Y, Width, Height);
		MainCanvas.fill();	
		MainCanvas.lineWidth = '2';
		MainCanvas.strokeStyle = ForeColor;
		MainCanvas.stroke();
		MainCanvas.closePath();		
	}
	
	// Split the text if it wouldn't fit in the rectangle
	MainCanvas.fillStyle = ForeColor;
	if (MainCanvas.measureText(Text).width > Width) {
		var words = Text.split(' ');
		var line = '';
		Y += 46;
		for(var n = 0; n < words.length; n++) {
		  var testLine = line + words[n] + ' ';
		  var metrics = MainCanvas.measureText(testLine);
		  var testWidth = metrics.width;
		  if (testWidth > Width && n > 0) {
			MainCanvas.fillText(line, X + Width / 2, Y);
			line = words[n] + ' ';
			Y += 46;
		  }
		  else {
			line = testLine;
		  }
		}
		MainCanvas.fillText(line, X + Width / 2, Y);
	} else MainCanvas.fillText(Text, X + Width / 2, Y + Height / 2);

}

// Draw a text that will fit on the specified width
function DrawTextFit(Text, X, Y, Width, Color) {

	for (var S = 36; S >= 10; S = S - 2) {
		MainCanvas.font = S.toString() + "px Arial";
		var metrics = MainCanvas.measureText(Text);
		if (metrics.width <= Width)
			break;
	}
	MainCanvas.fillStyle = Color;
	MainCanvas.fillText(Text, X, Y);
	MainCanvas.font = "36px Arial";	
}

// Draw a text in the canvas
function DrawText(Text, X, Y, Color, BackColor) {

	// Draw a back color relief text if needed
	if ((BackColor != null) && (BackColor != "")) {
		MainCanvas.fillStyle = BackColor;
		MainCanvas.fillText(Text, X + 1, Y + 1);	
	}

	// Split the text on two lines if there's a |
	MainCanvas.fillStyle = Color;
	MainCanvas.fillText(Text, X, Y);

}

// Draw a button
function DrawButton(Left, Top, Width, Height, Label, Color, Image) {

	// Draw the button rectangle
	MainCanvas.beginPath();
	MainCanvas.rect(Left, Top, Width, Height);
    MainCanvas.fillStyle = Color; 
    MainCanvas.fillRect(Left, Top, Width, Height);
	MainCanvas.fill();	
	MainCanvas.lineWidth = '2';
	MainCanvas.strokeStyle = 'black';
	MainCanvas.stroke();
	MainCanvas.closePath();
	
	// Draw the text
	DrawText(Label, Left + Width / 2, Top + Height / 2, "black");
	if ((Image != null) && (Image != "")) DrawImage(Image, Left + 2, Top + 2);
	
}

// Draw a basic empty rectangle
function DrawEmptyRect(Left, Top, Width, Height, Color) {
	MainCanvas.beginPath();
	MainCanvas.rect(Left, Top, Width, Height);
	MainCanvas.lineWidth = '3';
	MainCanvas.strokeStyle = Color;
	MainCanvas.stroke();
	MainCanvas.closePath();
}

// Draw a basic rectangle
function DrawRect(Left, Top, Width, Height, Color) {
	MainCanvas.beginPath();
	MainCanvas.rect(Left, Top, Width, Height);
    MainCanvas.fillStyle = Color; 
    MainCanvas.fillRect(Left, Top, Width, Height);
	MainCanvas.fill();	
	MainCanvas.closePath();		
}

// Draw a basic circle
function DrawCircle(CenterX, CenterY, Radius, LineWidth, LineColor) {
	MainCanvas.beginPath();
	MainCanvas.arc(CenterX, CenterY, Radius, 0, 2 * Math.PI, false);
	MainCanvas.lineWidth = LineWidth;
	MainCanvas.strokeStyle = LineColor;
	MainCanvas.stroke();	
}

// Draw --- if zero, +value in green if positive, -value in red if negative
function DrawPosNegValue(Value, X, Y) {	
	if (Value == 0) DrawText("---", X, Y, "black");
	if (Value > 0) DrawText("+" + Value.toString(), X, Y, "#00BB00");
	if (Value < 0) DrawText(Value.toString(), X, Y, "#BB0000");	
}

// Makes sure the screen is at the proper size
function DrawProcess() {
	
	// Gets the Width and Height differently on mobile and regular browsers
	var W = (CommonIsMobile) ? document.documentElement.clientWidth : window.innerWidth;
	var H = (CommonIsMobile) ? document.documentElement.clientHeight : window.innerHeight;

	// If we need to resize, we keep the 2x1 ratio
	if ((DrawScreenWidth != W) || (DrawScreenHeight != H)) {
		DrawScreenWidth = W;
		DrawScreenHeight = H;
		if (W <= H * 2) {
			MainCanvas.width = W;
			MainCanvas.height = MainCanvas.width / 2;
			MainCanvas.canvas.style.width = "100%"; 
			MainCanvas.canvas.style.height = "";
		} else {
			MainCanvas.height = H;
			MainCanvas.width = MainCanvas.height * 2;
			MainCanvas.canvas.style.width = ""; 
			MainCanvas.canvas.style.height = "100%";
		}
	}
	
	// Gets the current screen background and draw it, a darker version in character dialog mode
	var B = window[CurrentScreen + "Background"];
	if ((B != null) && (B != ""))
		DrawImage("Backgrounds/" + B + ((CurrentCharacter != null) ? "Dark" : "") + ".jpg", 0, 0);
	
	// Draws the dialog screen or current screen if there's no loaded character
	if (CurrentCharacter != null) DialogDraw();
	else CommonDynamicFunction(CurrentScreen + "Run()");

}