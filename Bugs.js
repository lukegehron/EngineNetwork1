/*
ENGINE = 0 -- width/2, height/2 - static

1 = "Building Science" 1 - 6
2 = "Visualization" 1 - 6 + 7
3 = "Fabrication" 1 - 6 + 9,10,11,13
4 = "Computation" 1-6 + 8,10,12,13
5 = "Data Visualization" 1-6 + 13
6 = "Research + Tools"... maybe not add to graphic?
7 = "VR + AR"
8 = "Interactive Graphocs"
9 = "CNC Machine"
10 = "3D Printing"
11 = "Laser Cutting"
12 = "Simulation"
13 = "Parametric Design"

Items 7+ are Orbital:
  they find the centerpoint of their parent groups and circle around their collective centerpoint
*/
let nameArray = ["Building Science", "Visualization", "Fabrication", "Computation", "Data Visualization"];
let bugXArray = [];
let bugYArray = [];
let speed = .2;
let m = 3;
let bugDiameter = [];
let numBugs = 5;

function setup() {
  createCanvas(700, 400);
  for (let i=0; i<numBugs; i++){
    let x = random(width/6, width*(5/6));
    bugXArray.push(x);
  }
  for (let i=0; i<numBugs; i++){
    let y = random(height/6, height*(5/6));
    bugYArray.push(y);
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
      stroke((i+10)*20,(j+5)*5,(j+10)*7);
    //line(bugXArray[i],bugYArray[i],bugXArray[j],bugYArray[j]);
    let line1X = 0;
    let line1Y = 0;
    let line2X = 0;
    let line2Y = 0;
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
    line(line1X,line1Y,line2X,line2Y);
    line(line1X,line1Y, width/2, height/2);

      push();
      noStroke();
      fill(50);
      if (mouseX < line1X+20 && mouseX > line1X - 20 && mouseY < line1Y+20 && mouseY > line1Y - 20 ){
        strokeWeight(3);
        stroke((i+10)*20,(j+5)*5,(j+10)*7);
        line(line1X,line1Y,line2X,line2Y);
        line(line1X,line1Y, width/2, height/2);
        noStroke();
        text(nameArray[i], line1X, line1Y);
      }
      strokeWeight(1);
      stroke(0);
      fill('yellow');
      ellipse(line1X,line1Y,7,7);
      pop();
  }
 }
 push();
 stroke(50);
 fill(255);
 ellipse(width/2, height/2, 10,10);
 fill(50);
 textSize(100);
 textAlign(CENTER);
 if (mouseX < (width/2)+20 && mouseX > (width/2) - 20 && mouseY < (height/2) + 20 && mouseY > (height/2) - 20 ){
   if(mouseIsPressed){
 text("ENGINE",width/2, height/2+32);
}
}
 pop();
}
