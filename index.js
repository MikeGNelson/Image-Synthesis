window.onload = function () {

    // Definitions
    var canvas = document.getElementById("paint-canvas");
    var context = canvas.getContext("2d");

    var canvas2 = document.getElementById("image-canvas");
    var context2 = canvas2.getContext("2d");

    var boundings = canvas.getBoundingClientRect();

    const toolbar = document.getElementById('toolbar');
    const line = document.getElementById('lineWidth');
    const colorV = document.getElementById('stroke');
    const paintBtn = document.getElementById('paint');
    const dragBtn = document.getElementById('drag');
  
    // Specifications
    var mouseX = 0;
    var mouseY = 0;
    context.strokeStyle = colorV.value; // initial brush color
    context.lineWidth = line.value; // initial brush width
    var isDrawing = false;
    var isDragging = false;
    var tool = 1;

    let strokes = [];
    let strokeIndex =0;
    let lineNumber = 0;

    let sources = [];
    // sources.push({x:100, y:30, width:200, height: 200, src:'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg', img:""});
    // sources.push({x:350, y:55, width:200, height: 200, src:'http://www.html5canvastutorials.com/demos/assets/yoda.jpg', img:""});

    let current_image = null;

    switchActive();

    function switchActive(){
      if(tool==1){
          
        // paintBtn.classList.add("fa-beat");
        // dragBtn.classList.remove("fa-beat");
        paintBtn.classList.add("active");
        dragBtn.classList.remove("active");
        
      }
      if(tool==2){
        console.log(tool);
        paintBtn.classList.remove("active");
        dragBtn.classList.add("active");
        // dragBtn.classList.add("fa-beat");
        // paintBtn.classList.remove("fa-beat");
        
      }
    };
  
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
          images[i].crossOrigin = "anonymous";
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
            context2.drawImage(sources[i].img, sources[i].x, sources[i].y, sources[i].width, sources[i].height);

        }
    }

    let drawStrokes = function(){
      context.clearRect(0, 0, canvas.width, canvas.height);
      let sty = context.strokeStyle;
      let wid = context.lineWidth;
      let tempStrokes = strokes;
      let j = 0;
      //console.log(strokes);
       for( let i =0; i<strokes.length; i++){
          if(strokes[i].index ==0){
            // Start Drawing
            context.strokeStyle = strokes[i].strokeStyle; 
            context.lineWidth = strokes[i].lineWidth; 
            console.log(strokes[i].lineWidth);
            
            context.beginPath();
            context.moveTo(strokes[i].x, strokes[i].y);
          }
          else if(strokes[i].index >0){
            context.strokeStyle = strokes[i].strokeStyle; 
            context.lineWidth = strokes[i].lineWidth; 
            context.lineTo(strokes[i].x, strokes[i].y);
            context.stroke();
            //context.closePath();
          }
          else{
            
          }
       }
       context.strokeStyle =sty;
       context.lineWidth =wid;
     
    }

  
    // Handle Colors
    var colors = document.getElementsByClassName('colors')[0];
  
    // colors.addEventListener('click', function(event) {
    //   context.strokeStyle = event.target.value || 'black';
    // });
  
    // // Handle Brushes
    // var brushes = document.getElementsByClassName('brushes')[0];
  
    // brushes.addEventListener('click', function(event) {
    //   context.lineWidth = event.target.value || 1;
    // });

    toolbar.addEventListener('change', e => {
      //console.log(e.target.value);
      if(e.target.id === 'stroke') {
        
        context.strokeStyle = e.target.value;
        console.log(context.strokeStyle);
      }
  
      if(e.target.id === 'lineWidth') {
        
          context.lineWidth = e.target.value;
          console.log(context.lineWidth );
      }
      if(e.target.id === 'file_input'){
        var URL = window.webkitURL || window.URL;
        var url = URL.createObjectURL(e.target.files[0]);
        var img = new Image();
        img.src = url;
        sources.push({x:100, y:30, width:200, height: 200, src:url, img:""});

        loadImages(sources,function(images){});
        
      }
      
  });

    // Handle Tools
    var tools = document.getElementsByClassName('tools')[0];
  
    tools.addEventListener('click', function(event) {
        tool = event.target.value || 1;

        switchActive();
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
        // context.beginPath();
        // context.moveTo(mouseX, mouseY);
        strokeIndex =0;
        lineNumber++;
        strokes.push({index: strokeIndex, lineNumber:lineNumber, strokeStyle: context.strokeStyle, lineWidth: context.lineWidth, x: mouseX, y: mouseY
        })
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
        strokeIndex++;
        strokes.push({index: strokeIndex, lineNumber:lineNumber, strokeStyle: context.strokeStyle, lineWidth: context.lineWidth, x: mouseX, y: mouseY
        })
        // context.lineTo(mouseX, mouseY);
        // context.stroke();
        //drawStrokes();
      }
      if(isDragging)
      {
        //change dragged items position
        if(current_image != null)
        {
            console.log("dragging");

            sources[current_image].x = mouseX - sources[current_image].width/2;
            sources[current_image].y = mouseY - sources[current_image].height /2;
            context2.clearRect(0, 0, canvas.width, canvas.height);
            //drawImages();
            
        }
        
      }
      drawImages();
      drawStrokes();
      
    });
  
    // Mouse Up Event
    canvas.addEventListener('mouseup', function(event) {
      setMouseCoordinates(event);
      // strokeIndex=-1;
      //   strokes.push({index: strokeIndex, strokeStyle: context.strokeStyle, lineWidth: context.lineWidth = 1, x: mouseX, y: mouseY
      //   })
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
      context2.clearRect(0, 0, canvas.width, canvas.height);
      sources =[];
      strokes =[];
    });
  
    // Handle Save Button
    var saveButton = document.getElementById('save');
  
    var overlayCanvases = function(cnv1, cnv2) {
      var newCanvas = document.createElement('canvas'),
          ctx = newCanvas.getContext('2d'),
          width = cnv1.width,
          height = cnv1.height;
  
      newCanvas.width = width;
      newCanvas.height = height;
  
      [cnv1, cnv2].forEach(function(n) {
          ctx.beginPath();
          ctx.drawImage(n, 0, 0, width, height);
      });
  
      return newCanvas.toDataURL();
  };

    saveButton.addEventListener('click', function() {
      var imageName = prompt('Please enter image name');
      var canvasDataURL = overlayCanvases(canvas2,canvas);//canvas2.toDataURL() + canvas.toDataURL();
      var a = document.createElement('a');
      a.href = canvasDataURL;
      a.download = imageName || 'drawing';
      a.click();
    });

    var loadButton = document.getElementById('load');

    loadButton.addEventListener('click', function(){
        context2.clearRect(0, 0, canvas.width, canvas.height);
        drawImages();
    })


  };
  