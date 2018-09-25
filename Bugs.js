let bugXArray = [];
let bugYArray = [];
speed = .1;
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
    let dia = random(30,100);
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
      stroke((i+10)*20,(i+5)*5,(j+10)*7);
    //line(bugXArray[i],bugYArray[i],bugXArray[j],bugYArray[j]);
    let line1X = 0;
    let line1Y = 0;
    let line2X = 0;
    let line2Y = 0;
    if (bugDiameter[i] < 50 && bugDiameter[j] < 50){
      line1X = bugDiameter[i]/2*sin((frameCount/bugDiameter[i])+bugDiameter[i])+bugXArray[i];
      line1Y = bugDiameter[i]/2*cos((frameCount/bugDiameter[i])+bugDiameter[i])+bugYArray[i];
      line2X = bugDiameter[j]/2*sin((frameCount/bugDiameter[j])+bugDiameter[j])+bugXArray[j];
      line2Y = bugDiameter[j]/2*cos((frameCount/bugDiameter[j])+bugDiameter[j])+bugYArray[j];
    }else if  (bugDiameter[i] > 50 && bugDiameter[j] < 50){
      line1X = bugDiameter[i]/2*sin((-frameCount/bugDiameter[i])+bugDiameter[i])+bugXArray[i];
      line1Y = bugDiameter[i]/2*cos((-frameCount/bugDiameter[i])+bugDiameter[i])+bugYArray[i];
      line2X = bugDiameter[j]/2*sin((frameCount/bugDiameter[j])+bugDiameter[j])+bugXArray[j];
      line2Y = bugDiameter[j]/2*cos((frameCount/bugDiameter[j])+bugDiameter[j])+bugYArray[j];
    }else if  (bugDiameter[j] > 50 && bugDiameter[i] < 50){
      line1X = bugDiameter[i]/2*sin((frameCount/bugDiameter[i])+bugDiameter[i])+bugXArray[i];
      line1Y = bugDiameter[i]/2*cos((frameCount/bugDiameter[i])+bugDiameter[i])+bugYArray[i];
      line2X = bugDiameter[j]/2*sin((-frameCount/bugDiameter[j])+bugDiameter[j])+bugXArray[j];
      line2Y = bugDiameter[j]/2*cos((-frameCount/bugDiameter[j])+bugDiameter[j])+bugYArray[j];
    }else{
      line1X = bugDiameter[i]/2*sin((-frameCount/bugDiameter[i])+bugDiameter[i])+bugXArray[i];
      line1Y = bugDiameter[i]/2*cos((-frameCount/bugDiameter[i])+bugDiameter[i])+bugYArray[i];
      line2X = bugDiameter[j]/2*sin((-frameCount/bugDiameter[j])+bugDiameter[j])+bugXArray[j];
      line2Y = bugDiameter[j]/2*cos((-frameCount/bugDiameter[j])+bugDiameter[j])+bugYArray[j];
    }
    line(line1X,line1Y,line2X,line2Y);
    fill(0);
    ellipse(line1X,line1Y,5,5);
    if (mouseX < line1X+15 && mouseX > line1X - 15 && mouseY < line1Y+15 && mouseY > line1Y - 15 ){
      text("ENGINE", line1X, line1Y);
    }
  }
 }
}
