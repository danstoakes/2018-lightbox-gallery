function returnJSONString()
{	
	return '{ "images": [ ' +
		'{' +
		'	"URL":"img/20210615_213607.jpg", ' +
		'	"caption":"Oldies in Bangor"' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213618.jpg", ' +
		'	"caption":"Sleepy Catto"' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213710.jpg",' +
		'	"caption":"Froggy Feast"' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213629.jpg", ' +
		'	"caption":"Modelling professionals"' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213639.jpg", ' +
		'	"caption":"Five Nights at Callum\'s"' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213657.jpg", ' +
		'	"caption":"Bangor\'s best hot choccy"' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213720.jpg", ' +
		'	"caption":"Fit. That is all."' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213758.jpg",' +
		'	"caption":"Sleepy Christmas Catto"' +
		'},' +
		'{' +
		'	"URL":"img/20210615_213739.jpg", ' +
		'	"caption":"One of many selfies"' +
		'} ' +
	']}';
}

function clearArea()
{	
	var imageArea = document.getElementById("background"),
		actualImage = document.getElementById("backgroundtop"),
		currentChildren = actualImage.children;
		
	imageArea.style.display = "none";
		
	if (currentChildren.length > 1)
	{		
		document.getElementById("currentImage").outerHTML = "";
		document.getElementById("imageScroller").outerHTML = "";	
	}
		
	actualImage.style.display = "none";

	document.getElementById("lightbox-container").style.visibility = "hidden";
	
}

// triggered when an image is clicked, loading the images into a LightBox
// where the image clicked is in the centre of the lightbox
function openSlideShow(n)
{
	clearArea();
	document.getElementById("lightbox-container").style.visibility = "visible";
	
	var imageArea = document.getElementById("background"),
		actualImage = document.getElementById("backgroundtop");
	
	imageArea.style.display = "block";
	actualImage.style.display = "block";
	
	var JSONObject = JSON.parse(returnJSONString()),
		imageArea = document.getElementById("backgroundtop"),
		key = Object.keys(JSONObject)[0],
		imageObject = JSONObject[key];
	
	var myImage = document.createElement("img"),
		myCaption = document.createElement("h2"),
		centreDIV = document.createElement("div"),
		containerDIV = document.createElement("div"),
		surroundingDIV = document.createElement("div");

	if ((n + 1) > imageObject.length)
	{
		n = 0;
	} else if (n == -1)
	{
		n = imageObject.length - 1;
    }
	
	myImage.setAttribute("src", imageObject[n].URL);
	myImage.setAttribute("height", "300px");
	myCaption.setAttribute("class", "caption-text-white");
	myCaption.appendChild(document.createTextNode(imageObject[n].caption));

	var arrowLeft = document.createElement("span");
	arrowLeft.appendChild(document.createTextNode("❮"));
	arrowLeft.setAttribute("class", "arrow left");
	arrowLeft.setAttribute("onclick", "openSlideShow(" + (n - 1) + ")");

	var arrowRight = document.createElement("span");
	arrowRight.appendChild(document.createTextNode("❯"));
	arrowRight.setAttribute("class", "arrow right");
	arrowRight.setAttribute("onclick", "openSlideShow(" + (n + 1) + ")");

	centreDIV.setAttribute("class", "centre");
	centreDIV.appendChild(arrowLeft);
	centreDIV.appendChild(myImage);
	centreDIV.appendChild(arrowRight);
	containerDIV.setAttribute("id", "currentImage");
	containerDIV.appendChild(centreDIV);
	containerDIV.appendChild(myCaption);
	imageArea.appendChild(containerDIV);
		
	surroundingDIV.setAttribute("id", "imageScroller");
	
	// finding how many images could possibly fit on the scrolling line
	var pageWidth = window.innerWidth,
		possibleImages = Math.floor ( pageWidth / 170 );
		
	// finding if even, and getting the central position
	if (imageObject.length % 2 == 0) {
		var idealPosition = (imageObject.length / 2);
	} else {
		var idealPosition = ((imageObject.length - 1)/2);
	}
	
	// if the image selected is not the middle image
	if (n != idealPosition)
	{	
		// shifting based on where the selected image is in relation to the other images
		var shift = idealPosition - n;
		var type = "minus";
		if (n > idealPosition)
		{
			shift = n - idealPosition;
			var type = "add";
		}
	}
	
	var shiftarray = [];
	
	// Loop through and add images to array in an order such that the selected image is always
	// in the middle of the image scroller
	if (type == "add")
	{
		for (var i = shift; i < imageObject.length; i++) 
			shiftarray.push(i);
			
		var length = shiftarray.length;
		for (var i = shiftarray.length; i < (imageObject.length - length); i++) 
			shiftarray.push(i);
			
		for (var i = 0; i < shift; i++) 
			shiftarray.push(i);
			
	} else
	{
		for (var i = (imageObject.length - shift); i < imageObject.length; i++ ) 
			shiftarray.push(i);
			
		var length = shiftarray.length;
		for (var i = 0; i < (imageObject.length - length); i++ )	
			shiftarray.push(i);
	}

	// loop through the array and print out each image in the scroller line
	for (var i = 0; i < imageObject.length; i++)
	{		
		var myImage = document.createElement("img"),
			containerDIV = document.createElement("div");
						
		myImage.setAttribute("src", imageObject[shiftarray[i]].URL);
		myImage.setAttribute("height", "100px");
		myImage.setAttribute("onclick", "openSlideShow(" + shiftarray[i] + ")");
				
		// apply active attribute to selected image
		if (n == shiftarray[i])
		{
			myImage.setAttribute("class", "padding active mouse-pointer hover-shadow");
		} else
		{	
			myImage.setAttribute("class", "padding mouse-pointer hover-shadow");
		}	
		containerDIV.setAttribute("class", "no-width");
				
		surroundingDIV.appendChild(myImage)
		imageArea.appendChild(surroundingDIV);
	}
}

// prevents the javascript running before the DOM is loaded
document.addEventListener("DOMContentLoaded", function ()
{
	clearArea();
	document.getElementById("closeButton").addEventListener("mousedown", clearArea);
	
	var JSONObject = JSON.parse(returnJSONString()),
		galleryArea = document.getElementById("container"),
		key = Object.keys(JSONObject)[0],
		imageObject = JSONObject[key];
	
	if (JSONObject.hasOwnProperty(key))
	{
		for (var i = 0; i < imageObject.length; i++)
		{
			// create the new image element
			var container = document.createElement("div"),
				newImage = document.createElement("img"),
				newCaption = document.createElement("p");
			
			// define any attributes for the image
			newImage.setAttribute("src", imageObject[i].URL);
			newImage.setAttribute("height", "150px");
			newImage.setAttribute("onclick", "openSlideShow(" + i + ")");
			newImage.setAttribute("class", "mouse-pointer hover-shadow");
			
			newCaption.setAttribute("class", "caption-text");
			newCaption.appendChild(document.createTextNode(imageObject[i].caption));
			
			container.setAttribute("class", "image-div");
			
			// add class names to top and bottom images so they are styled accordingly
			// allowing for equal spacing at the top, bottom and middle
			if (i < 3)
			{
				container.className += " " + "top";
				
			} else if ((imageObject.length - i) <= 3)
			{
				container.className += " " + "bottom";
			}
			
			// append the child elements to the DIV "container"
			container.appendChild(newImage);
			container.appendChild(newCaption);
			galleryArea.appendChild(container);
		}
	}
});