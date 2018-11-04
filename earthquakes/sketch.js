let explo;
let timestamp;
var tableVar;
let tableIndex;
let cx, cy;
let zoom=3;

let token='pk.eyJ1IjoiZmVsaXBldW1hbnpvciIsImEiOiJjajh1aXlzZGgxMWV1MzNtYjRkcnA1M3Y5In0.anfLhLcrMORqCCYy2vNIXw';
let apiImg="https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-70.65,-36.45,"+zoom+",0,0/1280x800?access_token="+token
let mapImage;

function preload(){
  soundFormats('mp3', 'ogg');
    sounds = [
      loadSound('sounds/4.0.mp3'),
      loadSound('sounds/4.1.mp3'),
      loadSound('sounds/4.2.mp3'),      
      loadSound('sounds/4.3.mp3'),      
      loadSound('sounds/4.4.mp3'),    
      loadSound('sounds/4.5.mp3'),
      loadSound('sounds/4.6.mp3'),
      loadSound('sounds/4.7.mp3'),
      loadSound('sounds/4.8.mp3'),
      loadSound('sounds/4.9.mp3'),
      loadSound('sounds/5.0.mp3'),
      loadSound('sounds/5.1.mp3'),
      loadSound('sounds/5.2.mp3'),
      loadSound('sounds/5.3.mp3'),
      loadSound('sounds/5.4.mp3'),
      loadSound('sounds/5.5.mp3'),
      loadSound('sounds/5.6.mp3'),
      loadSound('sounds/5.7.mp3'),
      loadSound('sounds/5.8.mp3'),
      loadSound('sounds/5.9.mp3'),
      loadSound('sounds/6.0.mp3'),
      loadSound('sounds/6.1.mp3'),
      loadSound('sounds/6.2.mp3'),
      loadSound('sounds/6.3.mp3'),
      loadSound('sounds/6.4.mp3'),
      loadSound('sounds/6.5.mp3'),
      loadSound('sounds/6.6.mp3'),
      loadSound('sounds/6.7.mp3'),
      loadSound('sounds/6.8.mp3'),
      loadSound('sounds/6.9.mp3')           
    ];

  mapImage=loadImage(apiImg);

  tableVar = loadTable('https://raw.githubusercontent.com/felipeumanzor/visualizaciones/master/earthquakes/parsedata.csv', 'csv','header');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  let hi = 1541127528.07
  timestamp = moment("02-02-2010", "MM-DD-YYYY");
  explo = [new Explode(50,50)]
  frameRate(48);

  tableIndex=18712;
  textFont('Helvetica');
  
  colorMode(HSB, 100);

  sounds.map( (item)=>{
    item.setVolume(0.1)
  } )

  cx = mercX(-70.65);
  cy = mercY(-36.45);

}

function draw() {
  translate(width/2,height/2)
  background(180,2,10,15);
  imageMode(CENTER)
  image(mapImage,0,0);
  fill('white');
  explo.map( (item)=>{
    item.grow();
    item.go();
    if(item.isOver()) return ;
    else return item
  })


  timestampShow();
  explodeTodayEarthquakes();


  
  
}

function timestampShow(){
  textSize(24);
 // fill("black")
 // rect(-width/2,-height/2,windowWidth,32)
  fill("white")
let posX = -width/3
if(windowWidth<500) posX=-width/2  + 10

  text(timestamp.format("DD-MM-YYYY"), posX, 30);
  textSize(12);
  text(timestamp.format("HH:mm"), posX, 46);

  timestamp.add(1, 'hours');
    textSize(12);
}

function explodeTodayEarthquakes(){
  
  next=parseFloat(tableVar.getString(tableIndex,0))
  actualtime =timestamp.unix()
  
	while(next<actualtime){
    tableIndex+=1;
    sound(next)
    next=parseFloat(tableVar.getString(tableIndex,0))
  }
}

function sound(){
  mag=parseFloat(tableVar.getString(tableIndex,4))
  lat=parseFloat(tableVar.getString(tableIndex,1))
  lng=parseFloat(tableVar.getString(tableIndex,2))
  dpth=parseFloat(tableVar.getString(tableIndex,3))
 // console.log(mag)
  if(mag>=7.0){
    osc = new p5.Oscillator();
    osc.setType('triangle');
    osc.freq(700-(mag*70));
    osc.amp(0.25);
    osc.start();
    osc.stop(mag*(mag)/50);
    explo.push(new Explode(dpth,mag*5,lng,lat))
  }
  else if(mag>=4.0 && mag<7.0){
  	sounds[int((mag-4)*10)].play()
      explo.push(new Explode(dpth,mag*5,lng,lat))
  }
}


class Explode{

  constructor(depth, intensity,x,y){
  	this.depth = depth;
    this.intensity=intensity;
    this.size=0;

    this.x = mercX(x)-cx
    this.y = mercY(y)-cy
    this.isEnded = false;
    
  }
  
  grow(){
  	this.size+=1
  }

  isOver(){
    return this.isEnded
  }
  

  go(){
    if(this.size<this.intensity){
        		let realint = this.intensity/5;

      fill("gray")
			text(this.intensity/5, this.x +Math.pow(realint/2,realint/2) , this.y);
      
      fill(this.intensity*2,255,255,this.intensity-this.size)
      let realsize = sqrt(pow(10,realint))
      let magmax = sqrt(pow(10,10))
      let d = map(realsize,0,magmax,0,2000)
      
      ellipse(this.x,this.y,d,d )
    }else{
      this.isEnded=true
    }
  }


}