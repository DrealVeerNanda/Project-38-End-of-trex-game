var gameState="PLAY";
var gameOver, restart, gameOverImage, restartImage

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var jump_sound, hit_sound, score_sound;
var bananaGroup, banana1
var backGround;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  jump_sound=loadSound("jump.mp3");
  hit_sound=loadSound("die.mp3");
  score_sound= loadSound("checkPoint.mp3");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  gameOverImage= loadImage("gameOver.png");
  restartImage= loadImage("restart.png");

  backGround= loadImage("download.jpeg")
                      
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  banana1= loadImage("banana.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-120);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trexcollision",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  gameOver= createSprite(300,50,10,10);
  gameOver.addImage("gm",gameOverImage);
  gameOver.visible=false;
  gameOver.scale=0.5;
  
  restart= createSprite(300,100,10,10);
  restart.addImage("rt",restartImage);
  restart.visible=false;
  restart.scale=0.5;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  bananaGroup=new Group();
  
  score = 0;
}

function draw() {
  background(backGround);
  
  fill ("black");
  text("Score: "+ score, 500,50);
  
  if (gameState==="PLAY"){
    ground.velocityX=-4;
    score = score + 1
    if(keyDown("space")&&trex.y>=161) {
    trex.velocityY = -13;
    jump_sound.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  console.log(trex.y);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if (score>0 && score%100===0){
    score_sound.play();
    
  }
    
    spawnClouds();
  spawnObstacles();
 
    
    if (obstaclesGroup.isTouching(trex)){
        gameState="END";
      hit_sound.play();
     
   }
    
  }
  
  else if (gameState==="END"){
    ground.velocityX=0;
    trex.velocityY=0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexcollision",trex_collided);
     gameOver.visible=true;
    restart.visible=true;
    
    
    if (mousePressedOver(restart)){
        reset();
    }
  }
  
 camera.position.x= trex.x+400

  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    cloud.lifetime = 200;
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}




function reset(){
  gameState="PLAY";
  gameOver.visible=false;
  restart.visible=false;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  score=0;
  
  
  
}