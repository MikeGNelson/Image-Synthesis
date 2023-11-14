window.onload = function () {

    // Definitions
    var canvas = document.getElementById("paint-canvas");
    var context = canvas.getContext("2d");
    var boundings = canvas.getBoundingClientRect();
  
    // Specifications
    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = 'black'; // initial brush color
    context.lineWidth = 1; // initial brush width
    var isDrawing = false;
    var isDragging = false;
    var tool = 1;

    let sources = [];
    sources.push({x:100, y:30, width:200, height: 200, src:'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg', img:""});
    sources.push({x:350, y:55, width:200, height: 200, src:'http://www.html5canvastutorials.com/demos/assets/yoda.jpg', img:""});

    let current_image = null;
  
    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
          numImages++;
        }
        // console.log(sources);
        for(var i in sources) {
            // console.log(sources[i].src);
          images[i] = new Image();
          images[i].onload = function() {
            if(++loadedImages >= numImages) {
              callback(images);
            }
          };
          //console.log(images);
          images[i].src = sources[i].src;
          sources[i].img = images[i];
        }
      }

     

      loadImages(sources, function(images) {
        //console.log(sources);
        for( let i =0; i<sources.length; i++){
            //console.log(sources[i].img);
            //context.drawImage(sources[i].img, sources[i].x, sources[i].y, sources[i].width, sources[i].height);

        }
      
      });
    
    let drawImages = function(){
        for( let i =0; i<sources.length; i++){
            //console.log(sources[i].img);
            context.drawImage(sources[i].img, sources[i].x, sources[i].y, sources[i].width, sources[i].height);

        }
    }

  
    // Handle Colors
    var colors = document.getElementsByClassName('colors')[0];
  
    colors.addEventListener('click', function(event) {
      context.strokeStyle = event.target.value || 'black';
    });
  
    // Handle Brushes
    var brushes = document.getElementsByClassName('brushes')[0];
  
    brushes.addEventListener('click', function(event) {
      context.lineWidth = event.target.value || 1;
    });

    // Handle Tools
    var tools = document.getElementsByClassName('tools')[0];
  
    tools.addEventListener('click', function(event) {
        tool = event.target.value || 1;
      });

    let isMouseInImage = function(x,y,source)
    {
        
        let source_left = source.x;
        let source_right = source.x + source.width;
        let source_top = source.y;
        let source_bottom = source.y + source.height;

        if(x > source_left && x <source_right && y >source_top && y < source_bottom){
            console.log(source.src);
            return true;
        }
        
        return false;
    }
    // Mouse Down Event
    canvas.addEventListener('mousedown', function(event) {
      setMouseCoordinates(event);
      if(tool==1)
      {
        isDrawing = true;
  
        // Start Drawing
        context.beginPath();
        context.moveTo(mouseX, mouseY);
      }
      if(tool ==2){
        isDragging = true;

        for( let i =0; i<sources.length; i++){
            //console.log(mouseX);
            if(isMouseInImage(mouseX,mouseY, sources[i])){
                current_image = i;
            }
        }
      }
      
    });
  
    // Mouse Move Event
    canvas.addEventListener('mousemove', function(event) {
      setMouseCoordinates(event);
  
      if(isDrawing){
        context.lineTo(mouseX, mouseY);
        context.stroke();
      }
      if(isDragging)
      {
        //change dragged items position
        if(current_image != null)
        {
            console.log("dragging");

            sources[current_image].x = mouseX - sources[current_image].width/2;
            sources[current_image].y = mouseY - sources[current_image].height /2;
            drawImages();
        }
        
      }

    });
  
    // Mouse Up Event
    canvas.addEventListener('mouseup', function(event) {
      setMouseCoordinates(event);
      isDrawing = false;
      isDragging = false;
      current_image = null;
    });
  
    // Handle Mouse Coordinates
    function setMouseCoordinates(event) {
      mouseX = event.clientX - boundings.left;
      mouseY = event.clientY - boundings.top;
    }
  
    // Handle Clear Button
    var clearButton = document.getElementById('clear');
  
    clearButton.addEventListener('click', function() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    // Handle Save Button
    var saveButton = document.getElementById('save');
  
    saveButton.addEventListener('click', function() {
      var imageName = prompt('Please enter image name');
      var canvasDataURL = canvas.toDataURL();
      var a = document.createElement('a');
      a.href = canvasDataURL;
      a.download = imageName || 'drawing';
      a.click();
    });

    var loadButton = document.getElementById('load');

    loadButton.addEventListener('click', function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawImages();
    })


  };
  