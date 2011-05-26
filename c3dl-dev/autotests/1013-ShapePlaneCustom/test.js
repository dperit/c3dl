c3dl.addMainCallBack(test, "shape_test");
c3dl.addModel("models/sphere.dae");
var callbackFunc;
var addCallBack = true;

function test(canvasName, callback){
  scn = new c3dl.Scene();
  if (typeof(canvasName)=='string'){
    scn.setCanvasTag(canvasName);
  }else{
    scn.setCanvasTag(canvasName.getAttribute('id'));
  }
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var vert = [-5,-5, -5,5, 0,5, 0,0, 5,0, 5,-5]; //norm up
    var customPlane = new c3dl.CustomPlane(vert);
    customPlane.setTexture("models/images/testing.jpg");
    var cam = new c3dl.FreeCamera();
    cam.setPosition([0.0, 15, 0.01]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(customPlane);
    scn.setCamera(cam);
    scn.startScene();
    if (addCallBack)
  {
    callbackFunc = function(callback){setTimeout(callback, 2000)};
    c3dl.addMainCallBack(callbackFunc, callback);
    addCallBack = false;
  }
  }else{
    setTimeout(callback, 2000);
  }
}
//

