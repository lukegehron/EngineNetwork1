let bugXArray = [];
let bugYArray = [];
speed = .3;
let bugDiameter = [];
let numBugs = 7;

function setup() {
  createCanvas(710, 400);
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
      line1X = bugDiameter[i]*sin((frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugXArray[i];
      line1Y = bugDiameter[i]*cos((frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugYArray[i];
      line2X = bugDiameter[j]*sin((frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugXArray[j];
      line2Y = bugDiameter[j]*cos((frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugYArray[j];
    }else if  (bugDiameter[i] > 50 && bugDiameter[j] < 50){
      line1X = bugDiameter[i]*sin((-frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugXArray[i];
      line1Y = bugDiameter[i]*cos((-frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugYArray[i];
      line2X = bugDiameter[j]*sin((frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugXArray[j];
      line2Y = bugDiameter[j]*cos((frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugYArray[j];
    }else if  (bugDiameter[j] > 50 && bugDiameter[i] < 50){
      line1X = bugDiameter[i]*sin((frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugXArray[i];
      line1Y = bugDiameter[i]*cos((frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugYArray[i];
      line2X = bugDiameter[j]*sin((-frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugXArray[j];
      line2Y = bugDiameter[j]*cos((-frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugYArray[j];
    }else{
      line1X = bugDiameter[i]*sin((-frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugXArray[i];
      line1Y = bugDiameter[i]*cos((-frameCount/bugDiameter[i]*4)+bugDiameter[i]*4)+bugYArray[i];
      line2X = bugDiameter[j]*sin((-frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugXArray[j];
      line2Y = bugDiameter[j]*cos((-frameCount/bugDiameter[j]*4)+bugDiameter[j]*4)+bugYArray[j];
    }
    //stroke(0);
    line(line1X,line1Y,line2X,line2Y);
    
      push();
      
      fill('yellow');
      ellipse(line1X,line1Y,7,7);
      push();
      noStroke();
      fill(50);
      if (mouseX < line1X+20 && mouseX > line1X - 20 && mouseY < line1Y+20 && mouseY > line1Y - 20 ){
      text("ENGINE", line1X, line1Y);
    }
      pop();
      pop();
    
  }
 }
}
