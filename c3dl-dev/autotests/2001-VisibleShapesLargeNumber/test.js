c3dl.addMainCallBack(test, "visibleShapesLargeNumber_test");
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
var duck, scn;
var testDone = false;



function test(canvasName){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if(renderer.isReady()) {   
    for(var x = 0; x < xLimit; x++){
      for(var y = 0; y < yLimit; y++){
        for (var z = 0; z < zLimit; z++){
          var curCube = new c3dl.Cube(1,1,1);
          curCube.setPosition([(x * xScale) - ((xLimit * xScale)/2),
                               y* yScale- ((yLimit * yScale)/2),
                               z * zScale]);
          //curCube.setAngularVel([0.0, -0.001, 0.0]);
          scn.addObjectToScene(curCube);
        }
      }
    }
    
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0, 0, 30.0]);
    cam.setLookAtPoint([0, 0, 0]);
    scn.setCamera(cam);
    scn.setUpdateCallback(checktime);
    scn.startScene();
  }
}

function checktime(time){
  var curFPS = scn.getFPS();
  document.getElementById('fps').innerHTML = curFPS;
  totalFPS+=curFPS;
  numFPS++;
  document.getElementById('avgfps').innerHTML = totalFPS/numFPS;
  
}

//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var plane = new c3dl.Plane(5,5);
//    plane.setTexture("../models/images/testing.jpg");
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 3, 9]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(plane);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var sphere = new c3dl.Sphere(10);
//    sphere.setTexture("../models/images/testing.jpg"); 
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 0, 20]);
//    sphere.setAngularVel([0.0, -0.001, 0.0]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(sphere);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var sphere = new c3dl.Sphere(10,5,5);
//    sphere.setTexture("../models/images/testing.jpg"); 
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 0, 20]);
//    sphere.setAngularVel([0.0, -0.001, 0.0]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(sphere);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var vert = [-5,0,-5,-5,0,5,0,0,2.5, -5,0,5,5,0,5,0,0,2.5, 5,0,5,0,10,0,0,0,2.5];
//    var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
//    var customShape = new c3dl.CustomShape(vert,norm);
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([-10.0, 10.0, 15.01]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(customShape);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var vert = [-5,0,-5,-5,0,5,0,0,0, 5,0,5,5,0,-5,0,0,0];
//    var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
//    var text = [0,0,0,1,0.5,0.5,1,1,1,0,0.5,0.5];
//    var customShapeWithTexture = new c3dl.CustomShape(vert,norm,text);
//    customShapeWithTexture.setTexture("../models/images/testing.jpg");
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 15.0, 0.01]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(customShapeWithTexture);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//var cam;
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var vert = [-5,-5, -5,5, 0,5, 0,0, 5,0, 5,-5]; //norm up
//    var customPlane = new c3dl.CustomPlane(vert);
//    customPlane.setTexture("../models/images/testing.jpg");
//    cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 15, 0.01]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(customPlane);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//

