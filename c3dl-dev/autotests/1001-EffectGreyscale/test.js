const SENSITIVITY = 1;
const ZOOM_SENSITIVITY = 3;

var isDragging = false;
var rotationStartCoords = [0,0];

var effectCounter = 0;
var effects, scene;
var light, light2, light3;

c3dl.addModel('../models/teapot.dae');
c3dl.addMainCallBack(test, 'effect_test');

//
function test(canvasName, callback)
{

  var orbitCam = new c3dl.OrbitCamera();
orbitCam.setFarthestDistance(250);
orbitCam.setClosestDistance(30);
orbitCam.setDistance(100);
orbitCam.setPosition([0,0,38]);

var teapots = [];

var simpleIEffect, simpleIEffect2;
var celIEffect;
var goochEffect, goochEffect2;

// outlines for gooch and cel effects
var outlineOn = true;
  
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
  light.setOn(true);
  scene.addLight(light);

  light2 = new c3dl.DirectionalLight();
  light2.setDirection([0,0,-1]);
  light2.setSpecular([1,0,0]);
  light2.setOn(true);
  scene.addLight(light2);

  /////////////////////////////////////////////////	

  // GREYSCALE
  greyscaleEffect = new c3dl.Effect();
  greyscaleEffect.init(c3dl.effects.GREYSCALE);
  // SEPIA
  var sepiaEffect = new c3dl.Effect();
  sepiaEffect.init(c3dl.effects.SEPIA);
  sepiaEffect.setParameter("color", [1.2, 1.0, 0.8]);
  // CARTOON
  celIEffect = new c3dl.Effect();
  celIEffect.init(c3dl.effects.CARTOON);
  celIEffect.setParameter("qMap", "../models/images/shades.jpg");
  // SOLID COLOR
  solidColorEffect = new c3dl.Effect();
  solidColorEffect.init(c3dl.effects.SOLID_COLOR);
  solidColorEffect.setParameter("color", [0.0, 1.0, 0.0]);
  // GOOCH
  goochEffect = new c3dl.Effect();
  goochEffect.init(c3dl.effects.GOOCH);
  // GOOCH
  goochEffect2 = new c3dl.Effect();
  goochEffect2.init(c3dl.effects.GOOCH);
  goochEffect2.setParameter("warmColor", [1,1,1]);
  goochEffect2.setParameter("coolColor", [0,0,0]);

  teapots.push(new c3dl.Collada());
  teapots[0].init("../models/teapot.dae");
  teapots[0].setTexture("../models/images/red.jpg");
  teapots[0].setEffect(greyscaleEffect);
  scene.addObjectToScene(teapots[0]);
  orbitCam.setOrbitPoint(teapots[0].getPosition());

  scene.setCamera(orbitCam);
  scene.startScene();
  scene.setUpdateCallback(update);

  effects = [c3dl.effects.STANDARD,celIEffect,greyscaleEffect,sepiaEffect, goochEffect];
  //if (typeof(callback)!='undefined')
  //{
    callback();
  //}
}

function update(event)
{	
  document.getElementById('fps').innerHTML = "FPS: " + Math.floor(scene.getFPS());
}

