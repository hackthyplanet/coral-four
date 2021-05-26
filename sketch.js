var c, r; //columns and rows for the 3d vertex;
var f = 0; // speed for mount 1;
var f1 = 0; // speed for mount 2;
var scl = 15; //how dense the triangle strips are
var w = 1800; //width
var h = 800; // height
var speed = 0 ; //speed the waves are moving
var noiseScale=0.05; // noise for making mountains
var water = []; //water array

var soundscape

let ctx, ctxOn;



function preload(){
  
  
  soundscape = loadSound('assets/coral four.mp3')


}
function setup() {
  createCanvas(windowWidth -10, windowHeight -10
    , WEBGL);
  c = w / scl;
  r = h / scl;

  noCursor()
  

  
    //ctx = getAudioContext();
    // ctxOn = createButton('Audio');
    ///ctxOn.position( 100, 100 )
    ///ctxOn.mousePressed(() => {
  	//ctx.resume().then(() => {
  	///console.log('Audio Context is now ON');
  	//});
    //});

  
  
  soundscape.play()
  
	
	//create matrix for water vertex
  for (var x = 0; x < c; x++) {
    water[x] = [];
    for (var y = 0; y < r; y++) {
      water[x][y] = []; 
    }
  }
}

function draw() {
	
  
  background(180,200,200+Math.abs(10-second())*2);
	waves(); //display wave
	moveObj(); //move mountains

 
}

//shift all the objects created
function moveObj (){
	speed -= 0.01 + (mouseX/3000);
}

//map the noise and create waves by changing the vertex
function waves(){
	//water noise
	push();
  var yoff = speed;
  for (var y = 0; y < r; y++) {
    var xoff = 0;
    for (var x = 0; x < c; x++) {
      water[x][y] = map(noise(xoff, yoff), 0, 1, -120, 120);
      xoff += 0.1;
    }
    yoff += 0.2;
  }
	
	//water
	push();
  translate(0, -100);
  rotateX(PI/7);
	noStroke();
  fill(0,Math.abs(30-second())*4,200,100);
  translate(-w/2, -h/2);
	
  for (var y = 0; y < r-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < c; x++) {
			vertex(x*scl, y*scl, water[x][y-1]);
      vertex(x*scl, (y+1)*scl, water[x][y+1]);
    }
    endShape();
	}
	pop();
}





