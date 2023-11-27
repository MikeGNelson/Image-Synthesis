window.onload = function () {

  // Definitions
  var canvas = document.getElementById("paint-canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  var canvas2 = document.getElementById("image-canvas");
  var context2 = canvas2.getContext("2d");
  context2.clearRect(0, 0, canvas.width, canvas.height);

  var canvas3 = document.getElementById("select-canvas");
  var context3 = canvas3.getContext("2d");
  context3.clearRect(0, 0, canvas.width, canvas.height);

  var boundings = canvas.getBoundingClientRect();

  const toolbar = document.getElementById('toolbar');
  const line = document.getElementById('lineWidth');
  const colorV = document.getElementById('stroke');

  const paintBtn = document.getElementById('paint');
  const dragBtn = document.getElementById('drag');
  const scaleBtn = document.getElementById('scale');
  const eraseBtn = document.getElementById('erase');
  const removeBtn = document.getElementById('remove');
  const selectBtn = document.getElementById('select');
  const autoFillBtn = document.getElementById('autofill');
  const imagineBtn = document.getElementById('imagine');

  const negativeSwitch = document.getElementById('negative');
  const negativeTxt = document.getElementById('negativeprompt');
  if(negativeSwitch.checked){
    negativeTxt.classList.remove("hide");
  }
  else{
    negativeTxt.classList.add("hide");
  }

  const generateBtn = document.getElementById('generate');
  const promptTxt = document.getElementById('prompt');
  

  // Specifications
  var mouseX = 0;
  var mouseY = 0;
  context.strokeStyle = colorV.value; // initial brush color
  context.lineWidth = line.value; // initial brush width
  var isDrawing = false;
  var isDragging = false;
  var tool = 6;

  let strokes = [];
  let strokeIndex =0;
  let lineNumber = 0;

  let sources = [];

  let selectedRegion = {
    x:0,
    y:0,
    startX:0,
    startY:0,
    width:0,
    height:0,
    active: false,
    selecting:false
  }
  // sources.push({x:100, y:30, width:200, height: 200, src:'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg', img:""});
  // sources.push({x:350, y:55, width:200, height: 200, src:'http://www.html5canvastutorials.com/demos/assets/yoda.jpg', img:""});

  let current_image = null;

  switchActive();

  function switchActive(){

    selectedRegion.active = false;

    imagineBtn.classList.add("active");

    if(tool==1){
        
      // paintBtn.classList.add("fa-beat");
      // dragBtn.classList.remove("fa-beat");
      paintBtn.classList.add("active");
      dragBtn.classList.remove("active");
      scaleBtn.classList.remove("active");
      eraseBtn.classList.remove("active");
      selectBtn.classList.remove("active");
      imagineBtn.classList.remove("active");
      autoFillBtn.classList.remove("active");
      selectedRegion.active = false;
      
    }
    if(tool==2){
      console.log(tool);
      paintBtn.classList.remove("active");
      dragBtn.classList.add("active");
      scaleBtn.classList.remove("active");
      eraseBtn.classList.remove("active");
      selectBtn.classList.remove("active");
      imagineBtn.classList.remove("active");
      autoFillBtn.classList.remove("active");
      selectedRegion.active = false;
      // dragBtn.classList.add("fa-beat");
      // paintBtn.classList.remove("fa-beat");
      
    }
    if(tool==3){
      console.log(tool);
      paintBtn.classList.remove("active");
      dragBtn.classList.remove("active");
      scaleBtn.classList.remove("active");
      eraseBtn.classList.add("active");
      selectBtn.classList.remove("active");
      imagineBtn.classList.remove("active");
      autoFillBtn.classList.remove("active");
      selectedRegion.active = false;
      // dragBtn.classList.add("fa-beat");
      // paintBtn.classList.remove("fa-beat");
      
    }
    if(tool==4){
      console.log(tool);
      paintBtn.classList.remove("active");
      dragBtn.classList.remove("active");
      scaleBtn.classList.remove("active");
      eraseBtn.classList.remove("active");
      selectBtn.classList.add("active");
      imagineBtn.classList.remove("active");
      autoFillBtn.classList.remove("active");
      selectedRegion.active = true;
      
    }
    if(tool==5){
      console.log(tool);
      paintBtn.classList.remove("active");
      dragBtn.classList.remove("active");
      scaleBtn.classList.remove("active");
      eraseBtn.classList.remove("active");
      selectBtn.classList.remove("active");
      imagineBtn.classList.remove("active");
      autoFillBtn.classList.add("active");
      selectedRegion.active = true;
      
    }
    if(tool==6){
      console.log(tool);
      paintBtn.classList.remove("active");
      dragBtn.classList.remove("active");
      scaleBtn.classList.remove("active");
      eraseBtn.classList.remove("active");
      selectBtn.classList.remove("active");
      imagineBtn.classList.add("active");
      autoFillBtn.classList.remove("active");
      selectedRegion.active = true;
      
    }
    if(tool==7){
      console.log(tool);
      paintBtn.classList.remove("active");
      dragBtn.classList.remove("active");
      scaleBtn.classList.add("active");
      eraseBtn.classList.remove("active");
      selectBtn.classList.remove("active");
      imagineBtn.classList.remove("active");
      autoFillBtn.classList.remove("active");
      selectedRegion.active = false;
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

  let drawSelect = function(){
    
    context3.clearRect(0, 0, canvas.width, canvas.height);
    if(selectedRegion.active){
      
      //console.log(selectedRegion);
      context3.shadowColor = "#d53";
      context3.shadowBlur = 20;
      context3.lineJoin = "bevel";
      context3.lineWidth = 15;
      context3.strokeStyle = "#38f";
      context3.strokeRect(selectedRegion.x, selectedRegion.y, selectedRegion.width, selectedRegion.height)

      //Debug
      // context3.beginPath();
      // context3.moveTo(selectedRegion.startX,selectedRegion.startY);
      // context3.lineTo(mouseX, mouseY);
      // context3.stroke();
    }
    
  }
  
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
          // console.log(strokes[i].lineWidth);
          
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
  // var tools = document.getElementsByClassName('tools')[0];

  // tools.addEventListener('click', function(event) {
  //     tool = event.target.value || 1;

  //     switchActive();
  //   });


  dragBtn.addEventListener('click', function(event) {
        console.log("drag")
        tool = 2;

        switchActive();
      });

  scaleBtn.addEventListener('click', function(event) {
        console.log("scale")
        tool = 7;

        switchActive();
      });
  
  paintBtn.addEventListener('click', function(event) {
      console.log("paint")
      tool = 1;

      switchActive();
    });

  eraseBtn.addEventListener('click', function(event) {
      console.log("erase")
      tool = 3;

      switchActive();
    });

  selectBtn.addEventListener('click', function(event) {
      console.log("select")
      tool = 4;

      switchActive();
    });
  
  autoFillBtn.addEventListener('click', function(event) {
      console.log("select")
      tool = 5;

      switchActive();
    });

  imagineBtn.addEventListener('click', function(event) {
      console.log("select")
      tool = 6;

      switchActive();
    });

  removeBtn.addEventListener('click', function(event) {
      sources.splice(-1);
      context2.clearRect(0, 0, canvas.width, canvas.height);
    });

  negativeSwitch.addEventListener('click', function(event) {
    console.log(negativeSwitch.checked);
    if(negativeSwitch.checked){
      negativeTxt.classList.remove("hide");
    }
    else{
      negativeTxt.classList.add('hide');
      negativeTxt.value = "";
    }

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
  canvas3.addEventListener('mousedown', function(event) {
    setMouseCoordinates(event);
    console.log(tool);
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
    if(tool==3)
    {
      isDrawing = true;

      // Start Drawing
      // context.beginPath();
      // context.moveTo(mouseX, mouseY);
      strokeIndex =0;
      lineNumber++;
      strokes.push({index: strokeIndex, lineNumber:lineNumber, strokeStyle: "white", lineWidth: context.lineWidth, x: mouseX, y: mouseY
      })
    }
    if(tool==4 || tool==5 || tool==6){
      selectedRegion.selecting = true;
      selectedRegion.x = mouseX;
      selectedRegion.y = mouseY;
      selectedRegion.startX = mouseX;
      selectedRegion.startY = mouseY;
    }
    if(tool==7){
      for( let i =0; i<sources.length; i++){
        //console.log(mouseX);
        if(isMouseInImage(mouseX,mouseY, sources[i])){
            current_image = i;
        }
    }
    }
    
  });

  // Mouse Move Event
  canvas3.addEventListener('mousemove', function(event) {
    setMouseCoordinates(event);
    context3.clearRect(0, 0, canvas.width, canvas.height);

    if(isDrawing){
      strokeIndex++;
      if(tool==1){
        strokes.push({index: strokeIndex, lineNumber:lineNumber, strokeStyle: context.strokeStyle, lineWidth: context.lineWidth, x: mouseX, y: mouseY
      });
      }
      else if(tool==3){
        strokes.push({index: strokeIndex, lineNumber:lineNumber, strokeStyle: "white", lineWidth: context.lineWidth, x: mouseX, y: mouseY
        });
      }
      
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
    if(tool==4 || tool==5 || tool==6){
      if(selectedRegion.selecting){
        
        selectedRegion.width = Math.abs( mouseX - selectedRegion.startX);
        selectedRegion.height = Math.abs( mouseY - selectedRegion.startY);

        selectedRegion.x = (mouseX + selectedRegion.startX)/2 -selectedRegion.width/2;
        selectedRegion.y = (mouseY + selectedRegion.startY)/2 - selectedRegion.height/2;
      }
      
    }
    if(tool==7){
      sources[current_image].width = mouseX - sources[current_image].x;
      sources[current_image].height = mouseY - sources[current_image].y;
      context2.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawSelect();
    drawImages();
    drawStrokes();
    
    
  });

  // Mouse Up Event
  canvas3.addEventListener('mouseup', function(event) {
    setMouseCoordinates(event);
    // strokeIndex=-1;
    //   strokes.push({index: strokeIndex, strokeStyle: context.strokeStyle, lineWidth: context.lineWidth = 1, x: mouseX, y: mouseY
    //   })
    isDrawing = false;
    isDragging = false;
    current_image = null;
    selectedRegion.selecting = false;
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

  // TODO
  var selectedCanvases = function(cnv1, cnv2) {
    var newCanvas = document.createElement('canvas'),
        ctx = newCanvas.getContext('2d'),
        width = selectedRegion.width,
        height = selectedRegion.height;

    newCanvas.width = width;
    newCanvas.height = height;

    [cnv1, cnv2].forEach(function(n) {
        ctx.beginPath();
        ctx.drawImage(n, selectedRegion.x, selectedRegion.y, width, height);
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

  // var loadButton = document.getElementById('load');

  // loadButton.addEventListener('click', function(){
  //     context2.clearRect(0, 0, canvas.width, canvas.height);
  //     drawImages();
  // })

  generateBtn.addEventListener('click', async function(e){
    var data = new FormData()
    
    var canvasDataURL = selectedCanvases(canvas2,canvas);
    //const blob = await (await fetch(canvasDataURL)).blob(); 

    data.append('prompt', promptTxt.value)
    data.append('image', canvasDataURL)

    let mode = "image";
    if(tool ==5){
      mode = "autofill";
    }
    if(tool ==4){
      mode = "edit"
    }
    data.append('mode', mode) //4 is edit, 5 is autofill, 6 is imagine
    // console.log(data)
    const response = await fetch('http://127.0.0.1:5000//getImage', {
      method: 'POST',
      mode: 'cors',
      body: data, // string or object
      headers: {
        'Access-Control-Allow-Origin': "*"
      }
    });
    const imageBlob = await response.blob(); //extract JSON from the http response
    console.log(imageBlob)
    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(imageBlob);
    var img = new Image();
    console.log(img)
    img.src = url;
    sources.push({x:selectedRegion.x, y:selectedRegion.y, width:selectedRegion.width, height: selectedRegion.height, src:url, img:""});

    loadImages(sources,function(images){});
    //document.body.appendChild(img);
    // do something with myJson
  }

  );
  // const getTransform = async () => {


    
  // }

};
