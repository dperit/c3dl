c3dl.addMainCallBack(test, "size_test");
c3dl.addModel("../models/teapot.dae");
c3dl.addModel("../models/cube.dae");

function test(canvasName, callback){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  if(renderer.isReady()) {
    var teapot = new c3dl.Collada();
    teapot.init("../models/teapot.dae");
    teapot.centerObject();
    teapot.setRenderObb(true);
    teapot.setHeight(2);
    teapot.setWidth(2);
    teapot.setLength(2);
    scn.addObjectToScene(teapot);
    var cube = new c3dl.Collada();
    cube.init("../models/cube.dae");
    //cube.centerObject();
    scn.addObjectToScene(cube);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([10.0, 5.0,10]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.setCamera(cam);
    scn.startScene();
    try{callback()}catch(err){};
  }
}

//function test(canvasName, callback){
//  
//  if (renderer.isReady()) {
//    var vert = [-5,-5, -5,5, 0,5, 0,0, 5,0, 5,-5]; //norm up
//    var customPlane = new c3dl.CustomPlane(vert);
//    customPlane.setTexture("../models/images/testing.jpg");
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 15, 0.01]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(customPlane);
//    scn.setCamera(cam);
//    scn.startScene();
//    try{callback()}catch(err){};
//  }
//}