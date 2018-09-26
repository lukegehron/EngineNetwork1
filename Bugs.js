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
let speed = .1;
let m = 8;
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
    let dia = random(15,50);
    bugDiameter.push(dia);
  }
  //strokeWeight(2);
}

function draw() {
  background(255);
  for (i = 0; i < numBugs; i++){
    bugXArray[i] += random(-speed, speed);
    bugYArray[i] += random(-speed, speed);
    noFill();
    stroke(255);
    //ellipse(bugXArray[i], bugYArray[i], bugDiameter[i], bugDiameter[i]);
  }

  for (let i = 0; i < numBugs; i++){
    for (let j = 0; j < numBugs; j++){
            if (mouseX < (width/2)+20 && mouseX > (width/2) - 20 && mouseY < (height/2) + 20 && mouseY > (height/2) - 20 ){
              strokeWeight(2);
              stroke((i+10)*20,(j+5)*5,(j+10)*7,i+2*25);
            }else{
              strokeWeight(1);
              stroke((j+20)*5,i+2*25);
            }

            if (bugDiameter[i] < 50 && bugDiameter[j] < 50){
              line1X = bugDiameter[i]*sin((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
              line1Y = bugDiameter[i]*cos((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
              line2X = bugDiameter[j]*sin((frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugXArray[j];
              line2Y = bugDiameter[j]*cos((frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugYArray[j];
            }else if  (bugDiameter[i] > 50 && bugDiameter[j] < 50){
              line1X = bugDiameter[i]*sin((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
              line1Y = bugDiameter[i]*cos((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
              line2X = bugDiameter[j]*sin((frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugXArray[j];
              line2Y = bugDiameter[j]*cos((frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugYArray[j];
            }else if  (bugDiameter[j] > 50 && bugDiameter[i] < 50){
              line1X = bugDiameter[i]*sin((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
              line1Y = bugDiameter[i]*cos((frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
              line2X = bugDiameter[j]*sin((-frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugXArray[j];
              line2Y = bugDiameter[j]*cos((-frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugYArray[j];
            }else{
              line1X = bugDiameter[i]*sin((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugXArray[i];
              line1Y = bugDiameter[i]*cos((-frameCount/bugDiameter[i]/m)+bugDiameter[i]/m)+bugYArray[i];
              line2X = bugDiameter[j]*sin((-frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugXArray[j];
              line2Y = bugDiameter[j]*cos((-frameCount/bugDiameter[j]/m)+bugDiameter[j]/m)+bugYArray[j];
            }
            Line1XArray.push(line1X);
            Line1YArray.push(line1Y);
            Line2XArray.push(line2X);
            Line2YArray.push(line2Y);
          }
        }
//console.log(Line1XArray);
  for (let i = 0; i < numBugs; i++){
    for (let j = 0; j < numBugs; j++){
      line1X = Line1XArray[i*j+j];
      line1Y = Line1YArray[i*j+j];
      line2X = Line2XArray[i*j+j];
      line2Y = Line2YArray[i*j+j];
      line(line1X,line1Y,line2X,line2Y);
      line(line1X,line1Y, width/2, height/2);
      for (let z = 0; z < smallNode.length; z++){
        if (i == j && i == smallNode[z].link){
          line7X = diameter7*sin((-frameCount/diameter7/m)+diameter7/m+z*4)+line1X;
          line7Y = diameter7*cos((-frameCount/diameter7/m)+diameter7/m+z*4)+line1Y;
          Line7XArray.push(line7X);
          Line7YArray.push(line7Y);
          push();
          strokeWeight(1);
          stroke(0);
          fill('yellow');
          ellipse(line7X,line7Y,5,5);
          pop();
          if (mouseX < line7X+20 && mouseX > line7X - 20 && mouseY < line7Y+20 && mouseY > line7Y - 20 ){
            fill(50);
            text(smallNode[z].name, line7X, line7Y);
          }
        }
      }
      push();
      noStroke();
      fill(50);
      if (mouseX < line1X+20 && mouseX > line1X - 20 && mouseY < line1Y+20 && mouseY > line1Y - 20 ){
        strokeWeight(2);
        stroke((i+10)*20,(j+5)*5,(j+10)*7,i+5*25);
        line(line1X,line1Y,line2X,line2Y);
        line(line1X,line1Y, width/2, height/2);
      }
      strokeWeight(1);
      stroke(0);
      fill('yellow');
      ellipse(line1X,line1Y,7,7);
      pop();
    }
    push();
    noStroke();
    fill(50);
    if (mouseX < line1X+20 && mouseX > line1X - 20 && mouseY < line1Y+20 && mouseY > line1Y - 20 ){
      noStroke();
      text(nameArray[i], line1X, line1Y);
    }
    pop();

    push();
    stroke(50);
    fill(255);
    ellipse(width/2, height/2, 10,10);
    fill(50);

    if (mouseX < (width/2)+20 && mouseX > (width/2) - 20 && mouseY < (height/2) + 20 && mouseY > (height/2) - 20 ){

      if(mouseIsPressed){
        push();
        textSize(100);
        textAlign(CENTER);
        background(255,200);
        text("ENGINE",width/2, height/2+32);
        pop();
   }
   if (mouseX < line1X+20 && mouseX > line1X - 20 && mouseY < line1Y+20 && mouseY > line1Y - 20 ){
     noStroke();
     text(nameArray[i], line1X, line1Y);
   }


   }

    pop();

   }
   for(r = 0; r < numBugs*numBugs; r++){
     for (item = 0; item < smallNode.length; item++ ){
       strokeWeight(1);
       stroke(255,150,150,50);
       if(abs(Line1XArray[r] - Line7XArray[item]) < diameter7*2 && abs(Line1YArray[r] - Line7YArray[item]) < diameter7*2){
         line(Line1XArray[r], Line1YArray[r], Line7XArray[item], Line7YArray[item]);
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
