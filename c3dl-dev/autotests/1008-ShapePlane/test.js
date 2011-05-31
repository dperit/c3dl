c3dl.addMainCallBack(test, "Shape Plane-first");
var callbackFunc;
var addCallBack = true;

function test(canvasName, callback){
  var scene = new c3dl.Scene();
  if (typeof(canvasName) == 'string'){
    scene.setCanvasTag(canvasName);
  }else{
    scene.setCanvasTag(canvasName.getAttribute('id'));
  }
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scene.setRenderer(renderer);
  scene.init(canvasName);
  
  var plane = new c3dl.Plane(5,5);
  plane.setTexture("../images/testing.jpg");
  var cam = new c3dl.FreeCamera();
  cam.setPosition([5.0, 8, 9]);
  cam.setLookAtPoint([0.0, 0.0, 0.0]);
  scene.addObjectToScene(plane);
  scene.setCamera(cam);
  scene.startScene();
  if (addCallBack)
  {
    setTimeout(callback, _sundaeSettings.timeBeforeCallback);
    //callbackFunc = function(callback){setTimeout(callback, 3000)};
    //c3dl.addMainCallBack(callbackFunc, callback);
    //addCallBack = false;
  }
  
}