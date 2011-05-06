const SENSITIVITY = 1;
const ZOOM_SENSITIVITY = 3;

var isDragging = false;
var rotationStartCoords = [0,0];

var effectCounter = 0;
var effects, scene;
var light, light2, light3;

c3dl.addModel('models/teapot.dae');
c3dl.addMainCallBack(effect_test1, 'effect_test_point');
c3dl.addMainCallBack(effect_test2, 'effect_test_wireframe');
c3dl.addMainCallBack(effect_test3, 'effect_test_triangle_strip');
c3dl.addMainCallBack(effect_test4, 'effect_test_triangle_fan');

var simpleIEffect, simpleIEffect2;
var celIEffect;
var goochEffect, goochEffect2;

// outlines for gooch and cel effects
var outlineOn = true;

//
function effect_test1(canvasName)
{
  var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(250);
orbitCam.setClosestDistance(30);
orbitCam.setDistance(280);
orbitCam.setPosition([0,0,130]);

  
  var fillType = "POINT";
  var teapots = [];
  scene = new c3dl.Scene();		
  scene.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();

  scene.setRenderer(renderer);
  scene.init();
  scene.setAmbientLight([0,0,0]);  

  // LIGHTS
  var light = new c3dl.PositionalLight();
  light.setPosition([0,200,150]);
  light.setDiffuse([1,1,1]);
  light.setName('light1');
  scene.addLight(light);

  var light2 = new c3dl.DirectionalLight();
  light2.setDirection([0,0,-1]);
  light2.setSpecular([1,0,0]);
  scene.addLight(light2);

  /////////////////////////////////////////////////	

  // GREYSCALE
  greyscaleEffect = new c3dl.Effect();
  greyscaleEffect.init(c3dl.effects.GREYSCALE);

  teapots.push(new c3dl.Collada());
  teapots[0].init("models/teapot.dae");
  teapots[0].setTexture("models/images/red.jpg");
  teapots[0].translate([0,40,0]);
  teapots[0].setEffect(greyscaleEffect);
  teapots[0].setFillType(fillType);
  scene.addObjectToScene(teapots[0]);

  // SEPIA
  var sepiaEffect = new c3dl.Effect();
  sepiaEffect.init(c3dl.effects.SEPIA);
  sepiaEffect.setParameter("color", [1.2, 1.0, 0.8]);

  teapots[1] = new c3dl.Collada();
  teapots[1].init("models/teapot.dae");
  teapots[1].setTexture("models/images/red.jpg");
  teapots[1].translate([30,40,0]);
  teapots[1].setEffect(sepiaEffect);
  teapots[1].setFillType(fillType);
  scene.addObjectToScene(teapots[1]);

  // CARTOON
  celIEffect = new c3dl.Effect();
  celIEffect.init(c3dl.effects.CARTOON);
  celIEffect.setParameter("qMap", "models/images/shades.jpg");

  teapots.push(new c3dl.Collada());
  teapots[2].init("models/teapot.dae");
  teapots[2].setTexture("models/images/texture.jpg");
  teapots[2].translate([0,20,0]);
  teapots[2].setEffect(celIEffect);
  teapots[2].setFillType(fillType);
  scene.addObjectToScene(teapots[2]);

  // SOLID COLOR
  solidColorEffect = new c3dl.Effect();
  solidColorEffect.init(c3dl.effects.SOLID_COLOR);
  solidColorEffect.setParameter("color", [0.0, 1.0, 0.0]);	

  teapots.push(new c3dl.Collada());
  teapots[3].init("models/teapot.dae");
  teapots[3].translate([30,20,0]);
  teapots[3].setEffect(solidColorEffect);
  teapots[3].setFillType(fillType);
  scene.addObjectToScene(teapots[3]);
  orbitCam.setOrbitPoint(teapots[3].getPosition());

  // STANDARD
  teapots.push(new c3dl.Collada());
  teapots[4].init("models/teapot.dae");
  teapots[4].setTexture("modes/images/red.jpg");
  teapots[4].setVisible(false);
  teapots[4].setFillType(fillType);
  scene.addObjectToScene(teapots[4]);

  // GOOCH
  goochEffect = new c3dl.Effect();
  goochEffect.init(c3dl.effects.GOOCH);

  teapots.push(new c3dl.Collada());
  teapots[5].init("models/teapot.dae");
  teapots[5].translate([30,0,0]);
  teapots[5].setEffect(goochEffect);
  teapots[5].setFillType(fillType);
  scene.addObjectToScene(teapots[5]);

  // VARYING
  teapots.push(new c3dl.Collada());
  teapots[6].init("models/teapot.dae");
  teapots[6].setTexture("models/images/red.jpg");
  teapots[6].translate([0,-20,0]);
  teapots[6].setEffect(c3dl.effects.STANDARD);
  teapots[6].setFillType(fillType);
  scene.addObjectToScene(teapots[6]);

  // GOOCH
  goochEffect2 = new c3dl.Effect();
  goochEffect2.init(c3dl.effects.GOOCH);
  goochEffect2.setParameter("warmColor", [1,1,1]);
  goochEffect2.setParameter("coolColor", [0,0,0]);

  teapots.push(new c3dl.Collada());
  teapots[7].init("models/teapot.dae");
  teapots[7].translate([30,-20,0]);
  teapots[7].setEffect(goochEffect2);
  teapots[7].setFillType(fillType);
  scene.addObjectToScene(teapots[7]);

  scene.setCamera(orbitCam);
  scene.startScene();

  effects = [c3dl.effects.STANDARD,celIEffect,greyscaleEffect,sepiaEffect, goochEffect];
}
function effect_test4(canvasName)
{
  var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(250);
orbitCam.setClosestDistance(30);
orbitCam.setDistance(280);
orbitCam.setPosition([0,0,130]);

  
  var fillType = "TRIANGLE_FAN";
  var teapots = [];
  scene = new c3dl.Scene();		
  scene.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();

  scene.setRenderer(renderer);
  scene.init();
  scene.setAmbientLight([0,0,0]);  

  // LIGHTS
  var light = new c3dl.PositionalLight();
  light.setPosition([0,200,150]);
  light.setDiffuse([1,1,1]);
  light.setName('light1');
  scene.addLight(light);

  var light2 = new c3dl.DirectionalLight();
  light2.setDirection([0,0,-1]);
  light2.setSpecular([1,0,0]);
  scene.addLight(light2);

  /////////////////////////////////////////////////	

  // GREYSCALE
  greyscaleEffect = new c3dl.Effect();
  greyscaleEffect.init(c3dl.effects.GREYSCALE);

  teapots.push(new c3dl.Collada());
  teapots[0].init("models/teapot.dae");
  teapots[0].setTexture("models/images/red.jpg");
  teapots[0].translate([0,40,0]);
  teapots[0].setEffect(greyscaleEffect);
  teapots[0].setFillType(fillType);
  scene.addObjectToScene(teapots[0]);

  // SEPIA
  var sepiaEffect = new c3dl.Effect();
  sepiaEffect.init(c3dl.effects.SEPIA);
  sepiaEffect.setParameter("color", [1.2, 1.0, 0.8]);

  teapots[1] = new c3dl.Collada();
  teapots[1].init("models/teapot.dae");
  teapots[1].setTexture("models/images/red.jpg");
  teapots[1].translate([30,40,0]);
  teapots[1].setEffect(sepiaEffect);
  teapots[1].setFillType(fillType);
  scene.addObjectToScene(teapots[1]);

  // CARTOON
  celIEffect = new c3dl.Effect();
  celIEffect.init(c3dl.effects.CARTOON);
  celIEffect.setParameter("qMap", "models/images/shades.jpg");

  teapots.push(new c3dl.Collada());
  teapots[2].init("models/teapot.dae");
  teapots[2].setTexture("models/images/texture.jpg");
  teapots[2].translate([0,20,0]);
  teapots[2].setEffect(celIEffect);
  teapots[2].setFillType(fillType);
  scene.addObjectToScene(teapots[2]);

  // SOLID COLOR
  solidColorEffect = new c3dl.Effect();
  solidColorEffect.init(c3dl.effects.SOLID_COLOR);
  solidColorEffect.setParameter("color", [0.0, 1.0, 0.0]);	

  teapots.push(new c3dl.Collada());
  teapots[3].init("models/teapot.dae");
  teapots[3].translate([30,20,0]);
  teapots[3].setEffect(solidColorEffect);
  teapots[3].setFillType(fillType);
  scene.addObjectToScene(teapots[3]);
  orbitCam.setOrbitPoint(teapots[3].getPosition());

  // STANDARD
  teapots.push(new c3dl.Collada());
  teapots[4].init("models/teapot.dae");
  teapots[4].setTexture("modes/images/red.jpg");
  teapots[4].setVisible(false);
  teapots[4].setFillType(fillType);
  scene.addObjectToScene(teapots[4]);

  // GOOCH
  goochEffect = new c3dl.Effect();
  goochEffect.init(c3dl.effects.GOOCH);

  teapots.push(new c3dl.Collada());
  teapots[5].init("models/teapot.dae");
  teapots[5].translate([30,0,0]);
  teapots[5].setEffect(goochEffect);
  teapots[5].setFillType(fillType);
  scene.addObjectToScene(teapots[5]);

  // VARYING
  teapots.push(new c3dl.Collada());
  teapots[6].init("models/teapot.dae");
  teapots[6].setTexture("models/images/red.jpg");
  teapots[6].translate([0,-20,0]);
  teapots[6].setEffect(c3dl.effects.STANDARD);
  teapots[6].setFillType(fillType);
  scene.addObjectToScene(teapots[6]);

  // GOOCH
  goochEffect2 = new c3dl.Effect();
  goochEffect2.init(c3dl.effects.GOOCH);
  goochEffect2.setParameter("warmColor", [1,1,1]);
  goochEffect2.setParameter("coolColor", [0,0,0]);

  teapots.push(new c3dl.Collada());
  teapots[7].init("models/teapot.dae");
  teapots[7].translate([30,-20,0]);
  teapots[7].setEffect(goochEffect2);
  teapots[7].setFillType(fillType);
  scene.addObjectToScene(teapots[7]);

  scene.setCamera(orbitCam);
  scene.startScene();

  effects = [c3dl.effects.STANDARD,celIEffect,greyscaleEffect,sepiaEffect, goochEffect];
}
function effect_test3(canvasName)
{
  var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(250);
orbitCam.setClosestDistance(30);
orbitCam.setDistance(280);
orbitCam.setPosition([0,0,130]);

  
  var fillType = "TRIANGLE_STRIP";
  var teapots = [];
  scene = new c3dl.Scene();		
  scene.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();

  scene.setRenderer(renderer);
  scene.init();
  scene.setAmbientLight([0,0,0]);  

  // LIGHTS
  var light = new c3dl.PositionalLight();
  light.setPosition([0,200,150]);
  light.setDiffuse([1,1,1]);
  light.setName('light1');
  scene.addLight(light);

  var light2 = new c3dl.DirectionalLight();
  light2.setDirection([0,0,-1]);
  light2.setSpecular([1,0,0]);
  scene.addLight(light2);

  /////////////////////////////////////////////////	

  // GREYSCALE
  greyscaleEffect = new c3dl.Effect();
  greyscaleEffect.init(c3dl.effects.GREYSCALE);

  teapots.push(new c3dl.Collada());
  teapots[0].init("models/teapot.dae");
  teapots[0].setTexture("models/images/red.jpg");
  teapots[0].translate([0,40,0]);
  teapots[0].setEffect(greyscaleEffect);
  teapots[0].setFillType(fillType);
  scene.addObjectToScene(teapots[0]);

  // SEPIA
  var sepiaEffect = new c3dl.Effect();
  sepiaEffect.init(c3dl.effects.SEPIA);
  sepiaEffect.setParameter("color", [1.2, 1.0, 0.8]);

  teapots[1] = new c3dl.Collada();
  teapots[1].init("models/teapot.dae");
  teapots[1].setTexture("models/images/red.jpg");
  teapots[1].translate([30,40,0]);
  teapots[1].setEffect(sepiaEffect);
  teapots[1].setFillType(fillType);
  scene.addObjectToScene(teapots[1]);

  // CARTOON
  celIEffect = new c3dl.Effect();
  celIEffect.init(c3dl.effects.CARTOON);
  celIEffect.setParameter("qMap", "models/images/shades.jpg");

  teapots.push(new c3dl.Collada());
  teapots[2].init("models/teapot.dae");
  teapots[2].setTexture("models/images/texture.jpg");
  teapots[2].translate([0,20,0]);
  teapots[2].setEffect(celIEffect);
  teapots[2].setFillType(fillType);
  scene.addObjectToScene(teapots[2]);

  // SOLID COLOR
  solidColorEffect = new c3dl.Effect();
  solidColorEffect.init(c3dl.effects.SOLID_COLOR);
  solidColorEffect.setParameter("color", [0.0, 1.0, 0.0]);	

  teapots.push(new c3dl.Collada());
  teapots[3].init("models/teapot.dae");
  teapots[3].translate([30,20,0]);
  teapots[3].setEffect(solidColorEffect);
  teapots[3].setFillType(fillType);
  scene.addObjectToScene(teapots[3]);
  orbitCam.setOrbitPoint(teapots[3].getPosition());

  // STANDARD
  teapots.push(new c3dl.Collada());
  teapots[4].init("models/teapot.dae");
  teapots[4].setTexture("modes/images/red.jpg");
  teapots[4].setVisible(false);
  teapots[4].setFillType(fillType);
  scene.addObjectToScene(teapots[4]);

  // GOOCH
  goochEffect = new c3dl.Effect();
  goochEffect.init(c3dl.effects.GOOCH);

  teapots.push(new c3dl.Collada());
  teapots[5].init("models/teapot.dae");
  teapots[5].translate([30,0,0]);
  teapots[5].setEffect(goochEffect);
  teapots[5].setFillType(fillType);
  scene.addObjectToScene(teapots[5]);

  // VARYING
  teapots.push(new c3dl.Collada());
  teapots[6].init("models/teapot.dae");
  teapots[6].setTexture("models/images/red.jpg");
  teapots[6].translate([0,-20,0]);
  teapots[6].setEffect(c3dl.effects.STANDARD);
  teapots[6].setFillType(fillType);
  scene.addObjectToScene(teapots[6]);

  // GOOCH
  goochEffect2 = new c3dl.Effect();
  goochEffect2.init(c3dl.effects.GOOCH);
  goochEffect2.setParameter("warmColor", [1,1,1]);
  goochEffect2.setParameter("coolColor", [0,0,0]);

  teapots.push(new c3dl.Collada());
  teapots[7].init("models/teapot.dae");
  teapots[7].translate([30,-20,0]);
  teapots[7].setEffect(goochEffect2);
  teapots[7].setFillType(fillType);
  scene.addObjectToScene(teapots[7]);

  scene.setCamera(orbitCam);
  scene.startScene();

  effects = [c3dl.effects.STANDARD,celIEffect,greyscaleEffect,sepiaEffect, goochEffect];
}
function effect_test2(canvasName)
{
  var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(250);
orbitCam.setClosestDistance(30);
orbitCam.setDistance(280);
orbitCam.setPosition([0,0,130]);

  
  var fillType = "ONE";
  var teapots = [];
  scene = new c3dl.Scene();		
  scene.setCanvasTag(canvasName);
  var renderer = new c3dl.WebGL();

  scene.setRenderer(renderer);
  scene.init();
  scene.setAmbientLight([0,0,0]);  

  // LIGHTS
  var light = new c3dl.PositionalLight();
  light.setPosition([0,200,150]);
  light.setDiffuse([1,1,1]);
  light.setName('light1');
  scene.addLight(light);

  var light2 = new c3dl.DirectionalLight();
  light2.setDirection([0,0,-1]);
  light2.setSpecular([1,0,0]);
  scene.addLight(light2);

  /////////////////////////////////////////////////	

  // GREYSCALE
  greyscaleEffect = new c3dl.Effect();
  greyscaleEffect.init(c3dl.effects.GREYSCALE);

  teapots.push(new c3dl.Collada());
  teapots[0].init("models/teapot.dae");
  teapots[0].setTexture("models/images/red.jpg");
  teapots[0].translate([0,40,0]);
  teapots[0].setEffect(greyscaleEffect);
  teapots[0].setFillType(fillType);
  scene.addObjectToScene(teapots[0]);

  // SEPIA
  var sepiaEffect = new c3dl.Effect();
  sepiaEffect.init(c3dl.effects.SEPIA);
  sepiaEffect.setParameter("color", [1.2, 1.0, 0.8]);

  teapots[1] = new c3dl.Collada();
  teapots[1].init("models/teapot.dae");
  teapots[1].setTexture("models/images/red.jpg");
  teapots[1].translate([30,40,0]);
  teapots[1].setEffect(sepiaEffect);
  teapots[1].setFillType(fillType);
  scene.addObjectToScene(teapots[1]);

  // CARTOON
  celIEffect = new c3dl.Effect();
  celIEffect.init(c3dl.effects.CARTOON);
  celIEffect.setParameter("qMap", "models/images/shades.jpg");

  teapots.push(new c3dl.Collada());
  teapots[2].init("models/teapot.dae");
  teapots[2].setTexture("models/images/texture.jpg");
  teapots[2].translate([0,20,0]);
  teapots[2].setEffect(celIEffect);
  teapots[2].setFillType(fillType);
  scene.addObjectToScene(teapots[2]);

  // SOLID COLOR
  solidColorEffect = new c3dl.Effect();
  solidColorEffect.init(c3dl.effects.SOLID_COLOR);
  solidColorEffect.setParameter("color", [0.0, 1.0, 0.0]);	

  teapots.push(new c3dl.Collada());
  teapots[3].init("models/teapot.dae");
  teapots[3].translate([30,20,0]);
  teapots[3].setEffect(solidColorEffect);
  teapots[3].setFillType(fillType);
  scene.addObjectToScene(teapots[3]);
  orbitCam.setOrbitPoint(teapots[3].getPosition());

  // STANDARD
  teapots.push(new c3dl.Collada());
  teapots[4].init("models/teapot.dae");
  teapots[4].setTexture("modes/images/red.jpg");
  teapots[4].setVisible(false);
  teapots[4].setFillType(fillType);
  scene.addObjectToScene(teapots[4]);

  // GOOCH
  goochEffect = new c3dl.Effect();
  goochEffect.init(c3dl.effects.GOOCH);

  teapots.push(new c3dl.Collada());
  teapots[5].init("models/teapot.dae");
  teapots[5].translate([30,0,0]);
  teapots[5].setEffect(goochEffect);
  teapots[5].setFillType(fillType);
  scene.addObjectToScene(teapots[5]);

  // VARYING
  teapots.push(new c3dl.Collada());
  teapots[6].init("models/teapot.dae");
  teapots[6].setTexture("models/images/red.jpg");
  teapots[6].translate([0,-20,0]);
  teapots[6].setEffect(c3dl.effects.STANDARD);
  teapots[6].setFillType(fillType);
  scene.addObjectToScene(teapots[6]);

  // GOOCH
  goochEffect2 = new c3dl.Effect();
  goochEffect2.init(c3dl.effects.GOOCH);
  goochEffect2.setParameter("warmColor", [1,1,1]);
  goochEffect2.setParameter("coolColor", [0,0,0]);

  teapots.push(new c3dl.Collada());
  teapots[7].init("models/teapot.dae");
  teapots[7].translate([30,-20,0]);
  teapots[7].setEffect(goochEffect2);
  teapots[7].setFillType(fillType);
  scene.addObjectToScene(teapots[7]);

  scene.setCamera(orbitCam);
  scene.startScene();

  effects = [c3dl.effects.STANDARD,celIEffect,greyscaleEffect,sepiaEffect, goochEffect];
}