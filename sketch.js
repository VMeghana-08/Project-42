var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png")
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
  player.scale = 0.15;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  

  bananaGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
}

function draw() { 
  background(0);


  switch (score) {
    case 10:
      player.scale = 0.25
      break;
    case 20:
      player.scale = 0.3
      break;
    case 30:
      player.scale = 0.35
      break;
    case 40:
      player.scale = 0.4
      break;
    default:
       break;
  }


  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

    if (obstacleGroup.isTouching(player)) {
      player.scale = 0.1;
      //console.log("obstacle Touched")
    }
    if (bananaGroup.isTouching(player)) {
        score = score + 2;
        //console.log("banana destroyed")
        bananaGroup.destroyEach();
      }
    if (keyDown("space")) {
      player.velocityY = -12
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  Obstacles();
  Bananas();

  drawSprites();

  textSize(20);
  stroke("white");
  fill("white")
  text("Score : " + score, 180, 20);
}

function Bananas() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, 200, 20, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120, 250));
    banana.scale = 0.2;
    banana.velocityX = -3;
    bananaGroup.add(banana)

    //assigning lifetime to the variable
    banana.lifetime = 200

    //adjust the depth
    banana.depth = player.depth
    player.depth = player.depth + 1;


  }
}

function Obstacles() {

  if (frameCount % 400 === 0) {
    obstacle = createSprite(600, 350, 40, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacleGroup.add(obstacle)
    obstacle.lifetime = 200
    


  }
}
