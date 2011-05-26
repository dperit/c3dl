c3dl.addMainCallBack(test, "Velocity-first");
c3dl.addModel("models/duck.dae");
var callbackFunc;
var timeSinceLastChange=0;
var duck;
var testDone = false;
var callback;
function test(canvasName, callbackvar){
  scn = new c3dl.Scene();
  callback = callbackvar;
  if (typeof(canvasName)=='string'){
    scn.setCanvasTag(canvasName);
  }else{
    scn.setCanvasTag(canvasName.getAttribute('id'));
  }
  var renderer = new c3dl.WebGL();
  renderer.createRenderer(this);
  scn.setRenderer(renderer);
  scn.init(canvasName);
  
  if (renderer.isReady()) {
    var now = new Date();
    duck = new c3dl.Collada();
    duck.init("models/duck.dae");
    duck.setLinearVel([0.0, -0.05, 0.0]);
    scn.addObjectToScene(duck);
    var cam = new c3dl.FreeCamera();
    cam.setPosition([200.0, 300.0, 1000.0]);
    cam.setLookAtPoint([0.0, 0.0, 0.0]);
    scn.setCamera(cam);
    scn.setUpdateCallback(checktime);
    scn.startScene();
  }
}

function checktime(time){
  if( !testDone ){
    timeSinceLastChange += time; 
    if(timeSinceLastChange >= 8000){
      testDone = true;
      duck.setLinearVel([0.0, 0.0, 0.0]);
      var pos = duck.getPosition();
      try{callback()}catch(err){};
    }
  }
}
