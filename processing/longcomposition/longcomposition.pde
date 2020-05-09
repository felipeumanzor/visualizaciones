ColorPalette palette = new ColorPalette();


void setup(){
  size(1400,400);
  noFill();
  frameRate(1);
  colorMode(HSB,360,100,100);
}


void draw(){
  background(255);
  palette = new ColorPalette();
  color c = palette.getColor();
  
  stroke(c);
  
  for(int j=1;j<10;j+=1){
   //c = palette.getColor();
    if(random(1)>0.8){
      c = palette.getColor();
    }
   for(int i=0;i<width;i++){
      strokeWeight(random(50));
      color aux=color(hue(c)+random(-30,30) , 100-j*8,100);
      stroke(aux,10);
      bezier(i,height*j/9,random(width),random(height*j/9,height*(j+1)/9),random(i),random(height*j/9,height*(j+1)/9), random(width), height*j/9+random(-160,160));
  }
  }



  float x = random(10);
  
  c=palette.getColor();
  
  for(int i=0;i<width;i++){
      fill(0,60);
      ellipse(i,height,20,noise(x)*250);
      x+=0.001;
  }
  noFill();
  
  

}
