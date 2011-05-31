c3dl.addModel("../models/teapot.dae");
c3dl.addModel("../models/cube.dae");
c3dl.addMainCallBack(test, "Size Bounding Box-first");

var callbackFunc;
var addCallBack = true;

function test(canvasName, callback){
  scene = new c3dl.Scene();
  c3dl.addModel("../models/teapot.dae");
  c3dl.addModel("../models/cube.dae");
  var scnCanvasName;
  if (typeof(canvasName) == 'string'){
    scene.setCanvasTag(canvasName);
    scnCanvasName = canvasName;
  }else{
    scene.setCanvasTag(canvasName.getAttribute('id'));
    scnCanvasName = canvasName.getAttribute('id');
  }
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scene.setRenderer(renderer);
  scene.init(scnCanvasName);
  var teapot = new c3dl.Collada();
  teapot.init("../models/teapot.dae");
  teapot.centerObject();
  teapot.setRenderObb(true);
  teapot.setHeight(2);
  teapot.setWidth(2);
  teapot.setLength(2);
  scene.addObjectToScene(teapot);
  var cube = new c3dl.Collada();
  cube.init("../models/cube.dae");
  //cube.centerObject();
  scene.addObjectToScene(cube);
  var cam = new c3dl.FreeCamera();
  cam.setPosition([10.0, 5.0,10]);
  cam.setLookAtPoint([0.0, 0.0, 0.0]);
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