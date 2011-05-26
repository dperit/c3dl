c3dl.addMainCallBack(test, "angularvelocity_test");
c3dl.addModel("models/duck.dae");
var callbackFunc;
var addCallBack = true;
var timeSinceLastChange = 0;
var duck;
var testDone = false;
var callback;
function test(canvasName, callbackvar){
  scn = new c3dl.Scene();
  try{callback = callbackvar}catch(err){};
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
    duck = new c3dl.Collada();
    duck.init("models/duck.dae");
    duck.setAngularVel([0.0, -0.001, 0.0]);
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
  if(!testDone){
    timeSinceLastChange += time; 
    if(timeSinceLastChange >= 8000){
      testDone = true;
      duck.setAngularVel([0.0, 0.0, 0.0]);
      var dir = duck.getDirection();
      if (addCallBack)
  {
    callbackFunc = function(callback){setTimeout(callback, 2000)};
    c3dl.addMainCallBack(callbackFunc, callback);
    addCallBack = false;
  }
    }
  }
}
