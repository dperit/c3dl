c3dl.addMainCallBack(test, "Shape Custom Texture-first");
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
  
  var vert = [-5,0,-5,-5,0,5,0,0,0, 5,0,5,5,0,-5,0,0,0];
  var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
  var text = [0,0,0,1,0.5,0.5,1,1,1,0,0.5,0.5];
  var customShapeWithTexture = new c3dl.CustomShape(vert,norm,text);
  customShapeWithTexture.setTexture("../models/images/testing.jpg");
  var cam = new c3dl.FreeCamera();
  cam.setPosition([0.0, 20.0, 0.01]);
  cam.setLookAtPoint([0.0, 0.0, 0.0]);
  scene.addObjectToScene(customShapeWithTexture);
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
