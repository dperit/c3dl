c3dl.addMainCallBack(test, "shape_test");

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

  var vert = [-5,-5, -5,5, 0,5, 0,0, 5,0, 5,-5]; //norm up
  var customPlane = new c3dl.CustomPlane(vert);
  customPlane.setTexture("../models/images/testing.jpg");
  var cam = new c3dl.FreeCamera();
  cam.setPosition([0.0, 15, 0.01]);
  cam.setLookAtPoint([0.0, 0.0, 0.0]);
  scene.addObjectToScene(customPlane);
  scene.setCamera(cam);
  scene.startScene();
  if (addCallBack)
  {
    setTimeout(callback, 3000);
    //callbackFunc = function(callback){setTimeout(callback, 3000)};
    //c3dl.addMainCallBack(callbackFunc, callback);
    //addCallBack = false;
  }
}
//

