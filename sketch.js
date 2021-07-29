/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle,ground,groundImage;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

//creating kangaroo
  kangaroo = createSprite(50,180,20,50);
  
  kangaroo.addAnimation("running", trex_running);
  kangaroo.addAnimation("collided", trex_collided);
  //kangaroo.scale = 0.5;

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);

  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && kangaroo.y >= 159) {
      kangaroo.velocityY = -12;
    }
  
    kangaroo.velocityY = kangaroo.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   kangaroo.collide(invisibleGround);
    spawnshrubsGroup();
    spawnObstacles();
  
    if(shrubsGroup.isTouching(kangaroo)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    

    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    kangaroo.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    shrubsGroup.setVelocityXEach(0);
    
    //change the kangaroo animation
    kangaroo.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    shrubsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  

  drawSprites();

}


function shrubsGroup() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var shrub = createSprite(600,120,40,10);
    shrub.y = Math.round(random(80,120));
    shrub1.addImage(shrub1Image);
    shrub1.scale = 0.5;
    shrub1.velocityX = -3;
    
     //assign lifetime to the variable
    shrub1.lifetime = 200;
    
    //adjust the depth
   shrub1 .depth = kangaroo.depth;
    kangaroo.depth = kangaroo.depth + 1;
    
    //add each cloud to the group
    shrubsGroup.add(shrub2);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var stone = createSprite(600,165,10,40);
    //stone.debug = true;
    stone.velocityX = -(6 + 3*score/100);
    
    //generate random stone
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: stone.addImage(stone);
              break;
      case 2: stone.addImage(stone);
              break;
      case 3: stone.addImage(stone);
              break;
      case 4: stone.addImage(stone);
              break;
      case 5: stone.addImage(stone);
              break;
      case 6: stone.addImage(stone);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the stone          
    stone.scale = 0.5;
    stone.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(stone);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  shrubsGroup.destroyEach();
  
  kangaroo.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}
