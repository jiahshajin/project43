var backImage,backgr;
var player, player_running;
var ground,ground_img;
var foodGroup, obstacleGroup;
var bananaImage
var banana
var END =0;
var PLAY =1;
var gameState = PLAY;
var gameoverImg;
 var game;
var stoneImg;
var obstacle;
 var stone
 var gameoverImg, gameover;
var score=0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  stoneImg=loadImage("stone.png");
gameoverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameover=createSprite(390,199)
  gameover.addImage(gameoverImg)
  gameover.visible=false;

 foodGroup = createGroup();
 obstacleGroup =createGroup();

  
  
  
}

function draw() { 
  background(0);
   
  
   
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();

     spawnObstacle() ;

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score=score+2
      player.scale+=+0.1
    }

    
     
  }

  if(obstacleGroup.isTouching(player)){
    gameState= END;
  }
else if(gameState=== END){

  backgr.velocityX=0;
  player.visible = false;
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameover.visible=true
 
  
}

  

  drawSprites();
  textSize(30) 
  fill(255)
  text("Score:"+ score,500,40)
}

function spawnFood() {
  if(frameCount % 80 === 0){
    var banana= createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage)
    banana.scale=0.05;
    banana.velocityX=-4;

    banana.lifetime=300
    player.depth=banana.depth+1;
    foodGroup.add(banana);
  }
}
 
function spawnObstacle() {
  if(frameCount % 120 === 0){
    var obstacle= createSprite(600,330,40,10);
    obstacle.y = random(290,390);
    obstacle.addImage(stoneImg)
    obstacle.scale=0.2;
    obstacle.velocityX=-6;

    obstacle.lifetime=300
    player.depth=obstacle.depth+1;
    obstacleGroup.add(obstacle);
  }
}
 