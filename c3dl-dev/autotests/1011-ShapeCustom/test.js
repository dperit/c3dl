c3dl.addMainCallBack(test, "Shape Custom-first");

var callbackFunc;
var addCallBack = true;

function test(canvasName, callback){
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
  
  var vert = [-5,0,-5,-5,0,5,0,0,2.5, -5,0,5,5,0,5,0,0,2.5, 5,0,5,0,10,0,0,0,2.5];
  var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
  var customShape = new c3dl.CustomShape(vert,norm);
  var cam = new c3dl.FreeCamera();
  cam.setPosition([-10.0, 20.0, 15.01]);
  cam.setLookAtPoint([0.0, 0.0, 0.0]);
  scene.addObjectToScene(customShape);
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