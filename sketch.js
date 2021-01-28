var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var ground;
var FoodGroup, obstacleGroup;
var survivalTime;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload() 
{
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");

  obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
  createCanvas(600, 450);

  monkey = createSprite(80, 410, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.2;

  ground = createSprite(300,440, 900, 20);
  ground.velocityX = -4;
  ground.shapeColor = "green";

  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() 
{
 
     if (gameState === PLAY)
     {
           background("lightBlue");

           stroke("black");
           textSize(20);
           fill("black");
           survivalTime = Math.ceil(frameCount / frameRate());
           text("Survival Time: " + survivalTime, 250, 50);

           stroke("red");
           fill("red");
           textSize(18);
           text("Score: " + score, 20, 100);   

           //Keep Monkey collided with ground always
           monkey.collide(ground);
           
           //Add Gravity to the monkey
           monkey.velocityY = monkey.velocityY + 0.8;
           
           //Infinite Scrolling Ground
           if (ground.x > 0) 
           {
              ground.x = ground.width / 2;
           }
           
           //Make the monkey jump when SPACEBAR is pressed 
           if(keyDown("space")&& monkey.y >= 200)
           {
              monkey.velocityY =-9;
           }

           //Increment score by 1 when touches the banana
           if(FoodGroup.isTouching(monkey))
           {
               FoodGroup.destroyEach(); 
               score = score + 1;
           }
           
           //After collision END the state and do not disappear the                   obstacles 
           if (obstacleGroup.collide(monkey)) 
           {
              gameState = END;
              obstacleGroup.lifetime = -1;
           }
           
           console.log(gameState);
           drawSprites();
           spawnFood();
           spawnObstacles(); 

      }
      else if (gameState === END)
      {
        stroke("black");
        fill("black");
        textSize(30);
        text("Game Over", 250, 300);

        obstacleGroup.destroyEach();
        FoodGroup.destroyEach();

        
      
      }
  
}

function spawnFood()
{
   if (frameCount % 80 === 0)
   {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.addImage("banana.png",bananaImage);
    banana.scale=0.1 ;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    FoodGroup.add(banana);
     
   }
}
function spawnObstacles()
{
  
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,375,10,40);
    obstacle.velocityX = -6;
    

    obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
    
   // monkey.depth = obstacle.depth +1;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
   obstacleGroup.add(obstacle);
  }

}

function reset()
{
   gameState  = PLAY;
   obstacleGroup.destroyEach();
   FoodGroup.destroyEach();
   score=0;
   survivalTime = 0;
   monkey.changeAnimation("running",monkey_running);
   
}