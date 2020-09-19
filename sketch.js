var bgimg, bg;
var monkey, monkeyimg;
var bananaimg, obstacleimg;
var ObstacleGroup, BananaGroup;

var score = 0;

function preload() {
  bgimg = loadImage("jungle.jpg");
  monkeyimg=loadAnimation("Monkey1.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png","Monkey7.png","Monkey8.png","Monkey9.png","Monkey10.png");
  
  obstacleimg=loadImage("stone.png");
  bananaimg=loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);
  
  bg = createSprite(0,0,800,400)
  bg.addImage(bgImg);
  bg.scale=1.5
  bg.velocityX=-4;
  
  monkey = createSprite(100,340,20,50)
  monkey.addAnimation(monkeyimg)
  monkey.scale=0.1;
  
  ground = createSprite(400,350,800,10)
  ground.velocityX = -4;
  ground.visible=false;
  
  bananaGroup=new Group();
  ObstacleGroup=new Group();
}

function draw() {
  background(220);
  
  if(ground.x<0) {
    ground.x = ground.width/2;
  }
  
  if(bg.x<0) {
    bg.x = bg.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(ObstacleGroup.isTouching(monkey)){
      ObstacleGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  
  monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
  
  if(ObstacleGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
     // score=score-2;
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnBananas() {
    if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
      
    BananaGroup.add(banana);
    }
}

function spawnObstacles() {
    if (frameCount % 300 === 0) {
    var stone = createSprite(800,350,10,40);    
    stone.addImage(obstacleimg);
    stone.scale = 0.2;
    stone.velocityX = -6;
     //assign lifetime to the variable
    stone.lifetime = 300;
      
    ObstacleGroup.add(stone); 
    }
}