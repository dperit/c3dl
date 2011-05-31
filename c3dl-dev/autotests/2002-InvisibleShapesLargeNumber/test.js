c3dl.addMainCallBack(test, "invisibleShapesLargeNumber_test");

var _nextPage = '../2003-VisibleShapesSmallNumber/index.html';
var _testType = 2;
var _testNumber = 2;

var xLimit = 10;
var yLimit = 10;
var zLimit = 10;

var xSize = 1;
var ySize = 1;
var zSize = 1;

var xScale = 1.6;
var yScale = 1.6;
var zScale = -1.6;

var totalFPS = 0;
var numFPS = 0;
var timeSinceLastChange = 0;
var duck, scene;
var testDone = false;



function test(canvasName){
  scene = new c3dl.Scene();
  if (typeof(canvasName) == 'string'){
    scene.setCanvasTag(canvasName);
  }else{
    scene.setCanvasTag(canvasName.getAttribute('id'));
  }
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scene.setRenderer(renderer);
  scene.init(canvasName);
  
  if(renderer.isReady()) {   
    for(var x = 0; x < xLimit; x++){
      for(var y = 0; y < yLimit; y++){
        for (var z = 0; z < zLimit; z++){
          var curCube = new c3dl.Cube(1,1,1);
          curCube.setPosition([(x * xScale) - ((xLimit * xScale)/2),
                               y* yScale- ((yLimit * yScale)/2),
                               z * zScale]);
          //curCube.setAngularVel([0.0, -0.001, 0.0]);
          scene.addObjectToScene(curCube);
        }
      }
    }
    
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0, 0, 30]);
    cam.setLookAtPoint([0, 0, 40]);
    scene.setCamera(cam);
    scene.setUpdateCallback(checktime);
    scene.startScene();
  }
}

function checktime(time){
  var curFPS = scene.getFPS();
  document.getElementById('fps').innerHTML = 'FPS: ' + curFPS;
  totalFPS+=curFPS;
  numFPS++;
  document.getElementById('totfps').innerHTML = 'Total FPS Counts: ' + numFPS;
  document.getElementById('avgfps').innerHTML = 'Average FPS: ' + totalFPS/numFPS;
  if (numFPS == 60){
    $.get(
                _sundaeSettings.testReceiverURL,
                {testNumber: _testNumber, testType: _testType, score: (totalFPS/numFPS)},
                function(data){window.location.href = _nextPage}
            ).error(function(data){window.location.href = _nextPage;});
  }
}