//Creating a class to make objects
class sprite{
  //Defining properties
  constructor(xPos,yPos,width,height){
    this.x = xPos;
    this.y = yPos;
    this.height = height;
    this.width = width;
    this.velocityX = 0;
    this.velocityY = 0;
    this.weight = 0;
  }
  //Function to display the object
  display(){
    rect(this.x,this.y,this.width,this.height);

    //Moving the object
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
}
//Creating the objects
var car = new sprite(50,150,50,50);
var wall = new sprite(1300,100,50,200);

//Creating the essential variables
var speed,Carweight,state;

function setup() {
  createCanvas(windowWidth,400);
  
  //Defining the speed and the weight of the car
  speed = round(random(50,99));
  Carweight = round(random(400,1500));

  //variable to keep the track of the program
  state = "start";
}

function draw() {
  background(200);  
 
  //Displaying the objects
  car.display();
  wall.display();

  //Calling function to calculate deformation of the car after crashing
  deformation();

  //Creating a new drawing state
  push();
  fill(0);
  textAlign(CENTER);
  textSize(20);
  //Displaying the instructions
  if(state === "start")
    text("Press enter to start",150,100);
  else if(state === "over")
    text("Press r to restart",150,100);
  pop();

  //Creating a new drawing state
  push();
  textAlign(LEFT);
  textSize(15);
  fill(0)
  //Displaying the current speed and weight
  text("Speed: "+speed,50,375);
  text("Car weight: "+Carweight,200,375);
  text("Click below to change the values",50,350);
  pop();
}
//Function to handle eyboard input
function keyPressed(){
  //Starting the simulation
  if(keyCode === ENTER && state === "start"){
    car.weight = Carweight;
    car.velocityX = speed - car.weight/1000;
  }
  //Restarting the simulation
  if(key === 'r' && state === "over"){
    state = "start";
    Carweight = round(random(400,1500));
    speed = round(random(50,99));
    car.x = 50;
    fill(255,255,255,255);
  }
}
//Function to calculate the deformation of the car
function deformation(){
  //Testing for collision
  if(wall.x - car.x <= (car.width/2 + wall.width/2)){
    //Setting the car velocity to 0
    car.velocityX = 0;
    car.x = wall.x - car.width;

    //Calculating the deformation
    let deformation = Math.round((0.5 * car.weight * (speed * speed)) / 22500);

    //Properties of the text
    textAlign(CENTER);
    textSize(25);
    //Starting a new drawing state
    push();
    fill(0);
    //Displaying the deformation
    text("vehicle deformation:"+deformation,windowWidth/2,100);
    pop();
      
    //Changin the object color and displaying relative text according to the deformation
    if(deformation > 180){
      fill(255,0,0);    //Changing the object color to red
      text("Vehicle not safe for passengers",windowWidth/2,150);  //Displaying unsafe message
    }
    else if(deformation > 100 && deformation < 180){
      fill(230,230,0);  //Changing the object color to yellow
      text("Vehicle provides basic security",windowWidth/2,150);  //Displaying average security
    }
    else{
      fill(0,255,0);    //Changing the object color to green
      text("Vehicle is safe",windowWidth/2,150);                  //Displaying safe message
    }
      state = "over"; //Changing the state to over
  }
}

//Creating the DOM objects
var inp = 0;
var button = 0;
//Function to handle mouse inputs
function mouseClicked(){
  //If the mouse is clicked on the speed text, then create a text placeholder to edit the speed
  if(mouseX > 50 && mouseX < 90 && mouseY > 360 && mouseY < 390){
    //Removing the objects if they are already defined
    if(inp != 0){
      inp.remove();
      button.remove();
    }
    inp = createInput("speed"); //Creating the text placeholder
    inp.position(100,440);      //To edit the speed
    inp.size(50,14);
    button = createButton('ok');  //Creating a button
    button.position(inp.x + inp.width,inp.y);
    button.mouseClicked(setSpeed);  //Calling the setspeed function if the mouse is clicked on it
  }
  //If the mouse is clicked on the weight text, then create a text placeholder to edit the weight
  else if(mouseX > 200 && mouseX < 270 && mouseY > 360 && mouseY < 390){
    //Removing the objects if they are already defined
    if(inp != 0){
      inp.remove();
      button.remove();
    }
    inp = createInput("weight"); //Creating the text placeholder
    inp.position(280,440);       //To edit the speed
    inp.size(50,14);
    button = createButton('ok');  //Creating a button
    button.position(inp.x + inp.width,inp.y);
    button.mouseClicked(setWeight); //Calling the setWeight function if the mouse is clicked on it
  }
}
//Function to edit the speed
function setSpeed(){
  if(inp.value() === "speed" || isNaN(inp.value())){
    inp.remove();
    button.remove();
    console.error("Please enter only numbers");
    return 0;
  }
  speed = inp.value();
  inp.remove();
  button.remove();
  return 0;
}
//Function to edit the weight
function setWeight(){
  if(inp.value() === "weight" || isNaN(inp.value())){
    inp.remove();
    button.remove();
    console.error("Please enter only numbers");
    return 0;
  }
  Carweight = inp.value();
  inp.remove();
  button.remove();
  return 0;
}