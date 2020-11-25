// CREATING GAMESTATES.
PLAY = 1;
END = 0;
gameState = PLAY;

// CREATING MONKEY AND OTHER OBJECTS.
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var totalBanana = 0;
var createEdgeSprites;

function preload() {
  
// LOADING MY IMAGES HERE.
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  createCanvas(400,400)

// CREATING MONKEY.
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
// CREATING GROUND.
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
// CREATING THE FOOD GROUP AND OBSTACLE GROUP.
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("lightblue")
  
// TEXT FOR SHOWING THE TOTAL BANANAS.
  stroke("black");
  textSize(20);
  fill("black");
  text("Total Banana's : " + totalBanana,100,50);
  

// IF STATEMENT SO THAT WHEN THE GROUND REACHES ITS HALF WIDTH IT SHOULD REPEAT.
    if (ground.x < 0){
       ground.x = ground.width/2;
    }

// SO THAT MONKEY COLLIDES WITH THE GROUND.
  monkey.collide(ground);

if(gameState === PLAY) {
  
 monkey.visible = true;
     
// FUNCTION BANANA AND STONES.
  Bannana();
  Stones();
  
// JUMP WHEN THE SPACE KEY IS PRESSED.
    if(keyDown("space") && monkey.y >= 300) {
        monkey.velocityY = -13;
    }
      
// ADDING GRAVITY.
    monkey.velocityY = monkey.velocityY + 0.4
  
    
// IF THE MONKEY TOUCHES THE BANANA.
  if(monkey.isTouching(FoodGroup)) {
    totalBanana = totalBanana +1;
    FoodGroup.destroyEach();
  } 
    
// IF THE MONKEY TOUCHES THE OBSTACLES.
  if(monkey.isTouching(obstacleGroup)) {
  gameState = END;
}
    
} else if(gameState === END) {

// TEXT TO SHOW GAMEOVER IN THE END STATE.
  textSize(40);
  fill("black");
  stroke(0);
  text("GAME OVER !!",80,200)
  textSize(18);
  stroke(200);
  text("press R to restart",120,230)
  
  monkey.visible = false;
  ground.visible = true;
  FoodGroup.velocityX = 0
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  obstacleGroup.velocityX = 0

// IF STATEMENT FOR IF THE PLAYER PRESS THE "R" KEY. 
    if(keyDown("r")){
      totalBanana = 0
      gameState = PLAY
 }
  
}
  
// DISPLAYS WHAT IS THERE.
  drawSprites();
  
}

// FUNCTION FOR THE BANANA.
function Bannana() {
  if(frameCount % 50 === 0) {

     banana = createSprite(400,165,10,40);
     banana.velocityX = -5;
     banana.addImage(bananaImage)
     banana.scale = 0.1;
     banana.lifetime = 82;
     banana.y = Math.round(random(120,200));
     FoodGroup.add(banana);
  }

}

// FUNCTION FOR THE STONES.
function Stones() {
  if(frameCount % 70 === 0) {
    obstacle = createSprite(400,330,10,40);
    obstacle.velocityX = -7;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
}

}