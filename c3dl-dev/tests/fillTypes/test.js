const SENSITIVITY = 1;
const ZOOM_SENSITIVITY = 3;

var isDragging = false;
var rotationStartCoords = [0,0];

var scene;
var light, light2, light3;

c3dl.addModel('models/teapot.dae');
c3dl.addModel('models/fly_plane_tri.dae');
c3dl.addMainCallBack(filltype_test, 'filltype_test');

var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(250);
orbitCam.setClosestDistance(30);
orbitCam.setDistance(280);
orbitCam.setPosition([0,0,130]);

var teapots = [];

function filltype_test(canvasName)
{
  scene = new c3dl.Scene();		
  scene.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();

  scene.setRenderer(renderer);
  scene.init();
  scene.setAmbientLight([0,0,0]);  

  // LIGHTS
  light = new c3dl.PositionalLight();
  light.setPosition([0,200,150]);
  light.setDiffuse([1,1,1]);
  light.setName('light1');
  light.setOn(false);
  scene.addLight(light);

  light2 = new c3dl.DirectionalLight();
  light2.setDirection([0,0,-1]);
  light2.setSpecular([1,0,0]);
  light2.setOn(false);
  scene.addLight(light2);

  /////////////////////////////////////////////////	


  teapots.push(new c3dl.Collada());
  teapots[0].init("models/teapot.dae");
  teapots[0].setTexture("models/images/red.jpg");
  teapots[0].translate([0,40,0]);
  teapots[0].setFillType("POINT");
  scene.addObjectToScene(teapots[0]);
  orbitCam.setOrbitPoint(teapots[0].getPosition());

  teapots[1] = new c3dl.Collada();
  teapots[1].init("models/teapot.dae");
  teapots[1].setTexture("models/images/red.jpg");
  teapots[1].translate([30,40,0]);
  teapots[1].setFillType("ONE");
  scene.addObjectToScene(teapots[1]);

  teapots.push(new c3dl.Collada());
  teapots[2].init("models/teapot.dae");
  teapots[2].setTexture("models/images/texture.jpg");
  teapots[2].translate([0,20,0]);
  teapots[2].setFillType("TRIANGLE_STRIP");
  scene.addObjectToScene(teapots[2]);

  teapots.push(new c3dl.Collada());
  teapots[3].init("models/teapot.dae");
  teapots[3].translate([30,20,0]);
  teapots[3].setFillType("TRIANGLE_FAN");
  scene.addObjectToScene(teapots[3]);
  
  var plane = new c3dl.Collada();
  plane.init("models/fly_plane_tri.dae");
  plane.scale([2,2,2]);

  var propNode = plane.getSceneGraph().findNode('prop');
  var planeNode = plane.getSceneGraph().findNode('plane');
  scene.addObjectToScene(plane);

  propNode.setAngularVel([0,0,0.002]);
  planeNode.setAngularVel([0,0.001,0.0]);

  scene.setCamera(orbitCam);
  scene.startScene();
  scene.setUpdateCallback(update);
  scene.setMouseCallback(mouseUp,mouseDown, mouseMove, mouseScroll);
  scene.setKeyboardCallback(onKeyUp, onKeyDown);


  effects = [c3dl.effects.STANDARD];
}

function changeKeyState(event, keyState)
{
	switch( event.keyCode)
	{
		case KEY_ZOOM: keysPressed[ZOOM] = keyState;break;
		case KEY_PITCH: keysPressed[PITCH] = keyState;break;
		case KEY_YAW: keysPressed[YAW] = keyState;break; 
	}
}

function update(event)
{	
  document.getElementById('fps').innerHTML = "FPS: " + Math.floor(scene.getFPS());
}

function onKeyUp(event)
{
	changeKeyState(event, false);
}

function toggleLight(id)
{
  if(id == 1)
  {
    light.setOn(!light.isOn());
  }
  else if(id == 2)
  {
    light2.setOn(!light2.isOn());
  }
}

function changeOrbit(id)
{
  orbitCam.setOrbitPoint(teapots[id-1].getPosition());
}

function onKeyDown(event)
{
	changeKeyState(event, true);
	
}

function mouseUp(event)
{
	// user released the LMB.
	if(event.which == 1)
	{
		isDragging = false;
	}
}

function mouseScroll(event)
{
  var d = event.wheelDelta ? -event.wheelDelta/100: event.detail;

  // towards user
  if(-d * ZOOM_SENSITIVITY < 0)
  {
    orbitCam.goFarther(-1 * -d * ZOOM_SENSITIVITY);
  }

  // towards screen
  else
  {
    orbitCam.goCloser(-d * ZOOM_SENSITIVITY);
  }
}

function mouseDown(evt)
{
	// user pressed the LMB.
	if(evt.which == 1)
	{
		isDragging = true;
		rotationStartCoords[0] = xevtpos(evt);
		rotationStartCoords[1] = yevtpos(evt);
	}
}

function mouseMove(evt)
{
  if(isDragging == true)
  {
    var x = xevtpos(evt);
    var y = yevtpos(evt);

    // how much was the cursor moved compared to last time
    // this function was called?
    var deltaX = x - rotationStartCoords[0];
    var deltaY = y - rotationStartCoords[1];

    orbitCam.yaw(-deltaX * SENSITIVITY);
    orbitCam.pitch(deltaY * SENSITIVITY);

    // now that the camera was updated, reset where the
    // rotation will start for the next time this function is 
    // called.
    rotationStartCoords = [x,y];
  }
}

function xevtpos(evt)
{
  return 2 * (evt.clientX / evt.target.width) - 1;
}

function yevtpos(evt)
{
  return 2 * (evt.clientY / evt.target.height) - 1;
}