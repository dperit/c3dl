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
    var plane = new c3dl.Cube(5,5,5);
    plane.setTexture("models/images/testing.jpg");
    var cam = new c3dl.FreeCamera();
    cam.setPosition([5.0, 3, 9]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(plane);
    scn.setCamera(cam);
    scn.startScene();
    if (addCallBack)
  {
    callbackFunc = function(callback){setTimeout(callback, 2000)};
    c3dl.addMainCallBack(callbackFunc, callback);
    addCallBack = false;
  }
  }
}

