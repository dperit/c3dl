c3dl.addMainCallBack(test, "textureupdate_test");
c3dl.addModel("../models/tv.dae");
var tv;
function test(canvasName, callback){
    scn = new c3dl.Scene();
    scn.setCanvasTag(canvasName);
    renderer = new c3dl.WebGL();
    renderer.createRenderer(this);
    scn.setRenderer(renderer);
    scn.init(canvasName);
    if(renderer.isReady() )
    {
        tv=new c3dl.Collada();
      tv.init("../models/tv.dae");
      tv.setSize(6,2,3);
      scn.addObjectToScene(tv); 
 
      var cam = new c3dl.FreeCamera();
      cam.setPosition(new Array(0.0, 0.0, 10.0));
      cam.setLookAtPoint(new Array(0.0, 0.0, 0.0));
      scn.setCamera(cam);
      scn.startScene();
      tv.updateTextureByName('../models/images/webgl.jpg','../models/images/fffffffnoCulling.jpg');
      try{callback()}catch(err){};
    }
}