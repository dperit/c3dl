c3dl.addMainCallBack(test, "Shape Sphere-first");
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

  var sphere = new c3dl.Sphere(10);
  sphere.setTexture("../images/testing.jpg"); 
  var cam = new c3dl.FreeCamera();
  cam.setPosition([8.0, 15, 20]);
  cam.setLookAtPoint([0.0, 0.0, 0.0]);
  scene.addObjectToScene(sphere);
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