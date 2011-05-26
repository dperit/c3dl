c3dl.addMainCallBack(test, "size_test");
c3dl.addModel("models/teapot.dae");
c3dl.addModel("models/cube.dae");
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
  if(renderer.isReady()) {
    var teapot = new c3dl.Collada();
    teapot.init("models/teapot.dae");
    teapot.centerObject();
    teapot.setRenderObb(true);
    teapot.setHeight(2);
    teapot.setWidth(2);
    teapot.setLength(2);
    scn.addObjectToScene(teapot);
    var cube = new c3dl.Collada();
    cube.init("models/cube.dae");
    //cube.centerObject();
    scn.addObjectToScene(cube);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([10.0, 5.0,10]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
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