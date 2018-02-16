class Button {
  int x, y, w, h;
  String t;
  boolean hov;
  color c;

  // Constructors
  Button(int x, int y, int w, int h, String t, color c) {
    this.x = x; 
    this.y = y; 
    this.w = w; 
    this.h = h;
    this.t = t;
    this.c = c;
  }

  // Dispay
  void display() {
    fill(180, 180, 180, 80);
    noStroke();
    rect(x+2, y+2, w, h, 4);
    if (hov) {
      fill(150);
    } else {
      fill(c);
    }
    rect(x,y,w,h,4);
    textAlign(CENTER);
    stroke(0);
    fill(0);
    textSize(14);
    text(t,x+(w/2),y+(h/2)+5);
  }

  // Click
  void hover() {
    hov = mouseX>x && mouseX<x+w && mouseY>y && mouseY<y+h;
  }
}