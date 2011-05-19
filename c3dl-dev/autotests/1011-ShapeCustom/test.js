c3dl.addMainCallBack(test, "shape_test");
c3dl.addModel("../models/sphere.dae");
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var cube = new c3dl.Cube(5,5,5);
//    cube.setTexture("../models/images/testing.jpg");
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 0.0, 15.0]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(cube);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var plane = new c3dl.Plane(5,5);
//    plane.setTexture("../models/images/testing.jpg");
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 3, 9]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(plane);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var sphere = new c3dl.Sphere(10);
//    sphere.setTexture("../models/images/testing.jpg"); 
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 0, 20]);
//    sphere.setAngularVel([0.0, -0.001, 0.0]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(sphere);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var sphere = new c3dl.Sphere(10,5,5);
//    sphere.setTexture("../models/images/testing.jpg"); 
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 0, 20]);
//    sphere.setAngularVel([0.0, -0.001, 0.0]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(sphere);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
function test(canvasName, callback){
  scn = new c3dl.Scene();
  scn.setCanvasTag(canvasName);
  renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var vert = [-5,0,-5,-5,0,5,0,0,2.5, -5,0,5,5,0,5,0,0,2.5, 5,0,5,0,10,0,0,0,2.5];
    var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
    var customShape = new c3dl.CustomShape(vert,norm);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([-10.0, 20.0, 15.01]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.addObjectToScene(customShape);
    scn.setCamera(cam);
    scn.startScene();
    try{callback()}catch(err){};
  }
}
//
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var vert = [-5,0,-5,-5,0,5,0,0,0, 5,0,5,5,0,-5,0,0,0];
//    var norm = [0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0];
//    var text = [0,0,0,1,0.5,0.5,1,1,1,0,0.5,0.5];
//    var customShapeWithTexture = new c3dl.CustomShape(vert,norm,text);
//    customShapeWithTexture.setTexture("../models/images/testing.jpg");
//    var cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 15.0, 0.01]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(customShapeWithTexture);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//var cam;
//function test(canvasName, callback){
//  scn = new c3dl.Scene();
//  scn.setCanvasTag(canvasName);
//  renderer = new c3dl.WebGL();
//  renderer.createRenderer(this);
//  scn.setRenderer(renderer);
//  scn.init(canvasName);
//  
//  if (renderer.isReady()) {
//    var vert = [-5,-5, -5,5, 0,5, 0,0, 5,0, 5,-5]; //norm up
//    var customPlane = new c3dl.CustomPlane(vert);
//    customPlane.setTexture("../models/images/testing.jpg");
//    cam = new c3dl.FreeCamera();
//    cam.setPosition([0.0, 15, 0.01]);
//    cam.setLookAtPoint([0.0, 0.0, 0.0]);
//    scn.addObjectToScene(customPlane);
//    scn.setCamera(cam);
//    scn.startScene();
//    callback();
//  }
//}
//

