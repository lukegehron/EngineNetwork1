
/*
ENGINE = 0 -- width/2, height/2 - static

1 = "Building Science" 1 - 6
2 = "Visualization" 1 - 6 + 7
3 = "Fabrication" 1 - 6 + 9,10,11,13
4 = "Computation" 1-6 + 8,10,12,13
5 = "Data Visualization" 1-6 + 13
6 = "Research + Tools"... maybe not add to group?
7 = "VR + AR"
8 = "Interactive Graphics"
9 = "CNC Machine"
10 = "3D Printing"
11 = "Laser Cutting"
12 = "Simulation"
13 = "Parametric Design"

Items 7+ are Orbital:
  they find the centerpoint of their parent groups and circle around their collective centerpoint
*/
let nameArray = ["Building Science", "Visualization", "Fabrication",  "Data Visualization", "Computation"];
let bugXArray = [];
let bugYArray = [];
let speed = .2;
let m = 4;
let bugDiameter = [];
let numBugs = nameArray.length;

let line1X = 0;
let line1Y = 0;
let line2X = 0;
let line2Y = 0;

let smallNode = [
  {name:"Research + Tools", link:1},
  {name:"Simulation", link:1},
  {name:"VR + AR", link:2},
  {name:"CNC Machining", link:3},
  {name:"3D Printing", link:3},
  {name:"Laser Cutting", link:3},
  {name:"Parametric Design", link:4},
  {name:"Interactive Graphics", link:5}

];

let Line1XArray = [];
let Line1YArray = [];
let Line2XArray = [];
let Line2YArray = [];
let Line7XArray = [];
let Line7YArray = [];


let line7X = 0; //VR + AR
let line7Y = 0; //VR + AR
let diameter7 = 35; //VR + AR

function setup() {
  createCanvas(700, 400);
  for (let i=0; i<numBugs; i++){
    if (i%2 == 0){
      let x = random(width*(1/7), width*(4/7));
      bugXArray.push(x);
    }else{
    let x = random(width*(3/7), width*(6/7));
    bugXArray.push(x);
  }
  }
  for (let i=0; i<numBugs; i++){
    if(i%2 == 1){
      let y = random(height*(1/6), height*(3/6));
      bugYArray.push(y);
    }else{
      let y = random(height*(3/6), height*(5/6));
      bugYArray.push(y);
    }
  }
  for (let i=0; i<numBugs; i++){
    let dia = int(random(15,50));
    bugDiameter.push(dia);
  }
  //strokeWeight(2);
}

function draw() {
  background(255); //WHITE BACKGROUND
  for (i = 0; i < numBugs; i++){ //MEGA FOR-LOOP
    if (bugDiameter[i] % 2 == 0){ //SPIN HALF OF THE NODES CLOCK-WISE
      line1X = bugDiameter[i]*sin((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
      line1Y = bugDiameter[i]*cos((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
    }else{ //SPIN HALF OF THE NODES COUNTER-CLOCK-WISE
      line1X = bugDiameter[i]*sin((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
      line1Y = bugDiameter[i]*cos((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
    }

    if (abs(mouseX - line1X) < 15 && abs(mouseY - line1Y) < 15){
      if (mouseIsPressed){ // IF THE MOUSE IS WITHIN 15px OF THE ELLIPSE AND CLICKED, IT FOLLOWS THE MOUSE
          bugXArray[i] = bugXArray[i]+((mouseX-pmouseX));
          bugYArray[i] = bugYArray[i]+((mouseY-pmouseY));
        }
    }else{ //OTHERWISE IT JUST RANDOMLY MOVES A LITTLE BIT IN X AND Y
      bugXArray[i] += random(-speed, speed);
      bugYArray[i] += random(-speed, speed);
    }
    push();
    stroke(220,100);
    noFill();
    ellipse(bugXArray[i],bugYArray[i],bugDiameter[i]*2); //BIG BUBBLE ROTATION
    ellipse(line1X,line1Y,30*2); //LITTLE BUBBLE ROTATION
    pop();

    noFill();
    stroke(255);

  }
  for (let i = 0; i < numBugs; i++){ // SECOND FOR-LOOP TO LOOP THROUGH THE PREV-SET OF COORDINATES
    for (let j = 0; j < numBugs; j++){ // STUPID SECOND-SECOND FOR LOOP SO WE CAN GET AN i AND j VARIABLES
            if (mouseX < (width/2)+20 && mouseX > (width/2) - 20 && mouseY < (height/2) + 20 && mouseY > (height/2) - 20 ){
              strokeWeight(2);
              stroke((i+10)*20,(j+5)*5,(j+10)*7,i+2*25); //IF YOU MOUSE OVER THE CENTER-NODE EVERYTHING LIGHTS UP
            }else{
              strokeWeight(1);
              stroke((j+20)*5,i+2*25); //OTHERWISE EVERYTHING IS JUST GREY-ISH
            }

            if (bugDiameter[i] % 2 == 0){ //SPIN HALF OF THE NODES CLOCK-WISE
              line1X = bugDiameter[i]*sin((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
              line1Y = bugDiameter[i]*cos((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
            }else{//SPIN HALF OF THE NODES COUNTER-CLOCK-WISE
              line1X = bugDiameter[i]*sin((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
              line1Y = bugDiameter[i]*cos((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
            }if (bugDiameter[j] % 2 == 0){ //SPIN HALF OF THE NODES CLOCK-WISE
              line2X = bugDiameter[j]*sin((frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugXArray[j];
              line2Y = bugDiameter[j]*cos((frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugYArray[j];
            }else{//SPIN HALF OF THE NODES COUNTER-CLOCK-WISE
              line2X = bugDiameter[j]*sin((-frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugXArray[j];
              line2Y = bugDiameter[j]*cos((-frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugYArray[j];
            }
            Line1XArray.push(line1X);
            Line1YArray.push(line1Y);
            Line2XArray.push(line2X);
            Line2YArray.push(line2Y);
          }
        }

  for (let i = 0; i < numBugs; i++){ //HORRAY! A THIRD FOR-LOOP..
    for (let j = 0; j < numBugs; j++){ //AND A THIRD SECOND-FOR-LOOP... this is just bad coding at this point
      line1X = Line1XArray[i*j+j];
      line1Y = Line1YArray[i*j+j];
      line2X = Line2XArray[i*j+j];
      line2Y = Line2YArray[i*j+j];
      line(line1X,line1Y,line2X,line2Y); //DRAW A LINE BETWEEN EACH OF THE NODES
      line(line1X,line1Y, width/2, height/2); //DRAW A LINE BETWEEN EACH OF THE NODES AND THE CENTER POINT
      for (let z = 0; z < smallNode.length; z++){
        if (i == j && i == smallNode[z].link){ //DETERMINE IF A NODE GETS A SMALLNODE
          line7X = diameter7*sin((-frameCount/diameter7/m)+diameter7/m+z*4)+line1X;  //ROTATE THE SMALLNODE AROUND THE BIG NODE
          line7Y = diameter7*cos((-frameCount/diameter7/m)+diameter7/m+z*4)+line1Y; //ROTATE THE SMALLNODE AROUND THE BIG NODE
          Line7XArray.push(line7X);
          Line7YArray.push(line7Y);
          push();
          strokeWeight(1);
          stroke(0);
          fill('yellow');
          ellipse(line7X,line7Y,5,5); //DRAW THE YELLOW DOT ON SMALL NODES 
          pop();
          if (mouseX < line7X+20 && mouseX > line7X - 20 && mouseY < line7Y+20 && mouseY > line7Y - 20 ){
            fill(50);
            text(smallNode[z].name, line7X, line7Y); //IF MOUSE-OVER SMALL NODE, SHOW NODE NAME
          }
        }
      }
      push();
      noStroke();
      fill(50);
      if (mouseX < line1X+20 && mouseX > line1X - 20 && mouseY < line1Y+20 && mouseY > line1Y - 20 ){
        strokeWeight(2);
        stroke((i+10)*20,(j+5)*5,(j+10)*7,i+5*25);
        line(line1X,line1Y,line2X,line2Y); //IF MOUSE-OVER BIG NODE, COLOR CONNECTIONS TO OTHER NODES
        line(line1X,line1Y, width/2, height/2); //IF MOUSE-OVER BIG NODE, COLOR CONNECTION TO CENTER NODE
      }
      strokeWeight(1);
      stroke(0);
      fill('yellow');
      ellipse(line1X,line1Y,7,7); //DRAW A YELLOW DOT ON BIG NODES
      pop();
    }
    push();
    noStroke();
    fill(50);
    if (mouseX < line1X+20 && mouseX > line1X - 20 && mouseY < line1Y+20 && mouseY > line1Y - 20 ){
      noStroke();
      text(nameArray[i], line1X, line1Y); //IF MOUSE-OVER BIG NODE, SHOW NODE NAME
    }
    pop();

    push();
    stroke(50);
    fill(255);
    ellipse(width/2, height/2, 10,10); //MAKE CENTER NODE WHITE
    fill(50);

    if (mouseX < (width/2)+20 && mouseX > (width/2) - 20 && mouseY < (height/2) + 20 && mouseY > (height/2) - 20 ){
      if(mouseIsPressed){
        push();
        textSize(100);
        textAlign(CENTER);
        background(255,200);
        text("ENGINE",width/2, height/2+32); //IF MOUSE PRESSED OVER CENTER NODE - ADD WHITE OVERLAY AND SHOW 'ENGINE' TEXT
        pop();
   }   
   }
    pop();

   }
   for(r = 0; r < numBugs*numBugs; r++){ // A FOURTH FOR-LOOP... I THINK I'M GOING TO THROW UP
     for (item = 0; item < smallNode.length; item++ ){
       strokeWeight(1);
       stroke(255,150,150,50);
       if(abs(Line1XArray[r] - Line7XArray[item]) < diameter7*2 && abs(Line1YArray[r] - Line7YArray[item]) < diameter7*2){
         line(Line1XArray[r], Line1YArray[r], Line7XArray[item], Line7YArray[item]); //DRAW THE CONNECTIONS BETWEEN THE SMALL NODES AND NEARBY LARGE NODES
       }
     }
   }

 Line1XArray = [];
 Line1YArray = [];
 Line2XArray = [];
 Line2YArray = [];
 Line7XArray = [];
 Line7YArray = [];

}
