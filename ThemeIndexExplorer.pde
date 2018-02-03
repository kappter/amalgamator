Table tiTable; //<>//
Table reTable;
TableRow tr1;
TableRow tr2;
Timer timer;

Button btnContinue;
Button btnPlausible; 
Button btnIrrelevant;
Button btnNotPlausible;
Button btnLeft;
Button btnRight;
int secs =0;;
//Button btnG
int row1, row2, counter;
final int stateReadNotes = 0;
final int statePlay = 1;
int state = stateReadNotes;
String notes="";

int lS;
int lM;
int lH;
int lMil;

int uS;
int uM;
int uH;
int uMil;

void setup() {
  size(1000, 400);
  timer = new Timer(1000);
  timer.start();
  lS = second();
  lM = minute();
  lH = hour();
  lMil = millis();
  uS = second();
  uM = minute();
  uH = hour();
  uMil = millis();
  tiTable = loadTable("classification.csv", "header");
  reTable = loadTable("responses.csv", "header");
  getNewRows();
  btnContinue = new Button(660, 260, 300, 20, "Continue...", #C5DBB5);
  btnIrrelevant = new Button(770, 290, 85, 20, "Irrelevant", #DEDCB5);
  btnPlausible = new Button(865, 290, 95, 20, "Plausible", #C5DBB5);
  btnNotPlausible = new Button(660, 290, 100, 20, "Not Plausible", #CE8D85);
  btnLeft = new Button(660, 320, 15, 20, "<", 180);
  btnRight = new Button(690, 320, 15, 20, ">", 180);
  counter = 0;
}

void draw() {
  if (timer.isFinished()) {
    secs++;
    timer.start();
  }
  int s = second();
  int m = minute();
  int h = hour();
  int mil = millis();
  background(44, 48, 44);
  fill(33);
  rect(40, 80, 440, 100, 4);
  fill(40);
  rect(520, 80, 440, 100, 4);
  rect(40, 190, 920, 55, 4);
  drawUI();
  drawFocusSlider();
  btnContinue.display();
  btnContinue.hover();
  btnIrrelevant.display();
  btnIrrelevant.hover();
  btnPlausible.display();
  btnPlausible.hover();
  btnNotPlausible.display();
  btnNotPlausible.hover();
  btnLeft.display();
  btnLeft.hover();
  btnRight.display();
  btnRight.hover();
  fill(127);
  textAlign(RIGHT);
  text("Login Time: " + lH + ":" + lM + ":" + lS +" Mil:" + lMil, width-40, 15);
  text("Current Time: " + h + ":" + m + ":" + s, width-40,30); //" Mil:" + mil, width-40, 30);
  //text("Reset Time: " + uH + ":" + uM + ":" + uS +" Mil:" + uMil, width-40, 45);
  text("Seconds to Reset: " + str(60-secs),width-40, 45); 
  text("Seconds Elapsed: " + secs, width-40,60);
  textAlign(LEFT);
  if (state==stateReadNotes) {
    fill(155);
    text("Thoughts and Notes:", 50, 210);
    fill(255);
    text(notes, 50, 230);
  } else if (state==statePlay) {
    fill (255);
    text (notes + " will be saved. Please click Plausible or Not Plausible.", 50, 230);
  }
}

void drawUI() {
  textAlign(CENTER);
  textSize(34);
  fill(#DEDCB5);
  text("The Amalgamator", width/2, 50);
  textSize(14);
  fill(200);
  text("by Ken Kapptie", 580, 64);
  textSize(11);
  textAlign(LEFT);
  fill(133);
  textSize(14);
  text("Is there a connection? You can decide.", 43, 273);
  text("Click continue to advance the hierarchy of each topic, take a moment to process it.", 43, 290);
  text("Type to add notes then click plausible, irrelevant or not plausible to record your entry.", 43, 307);
  text("Optional: click or drag on number line to change concept on the left.", 43, 324);

  fill(33);
  rect(0, 380, width, 20);
  fill(100);
  textSize(11);
  text("© Ken Kapptie | 2018 | Thematic Index data from Roget's Thesaurus - roget.org.", 40, 393);
  tr1 = tiTable.getRow(row1);
  tr2 = tiTable.getRow(row2);

  textSize(14);
  fill(155);
  textAlign(LEFT);
  switch(counter) {
  case 0: 
    text("CONCEPT: " + row1, 50, 100);
    text("CONCEPT: " + row2, 530, 100);
    break;
  case 1:
    text(tr1.getString("C1"), 50, 100);
    text(tr2.getString("C1"), 530, 100);
    break;
  case 2:
    text(tr1.getString("C1"), 50, 100);
    text(tr1.getString("C2"), 50, 115);
    text(tr2.getString("C1"), 530, 100);
    text(tr2.getString("C2"), 530, 115);
    break;  
  case 3:
    text(tr1.getString("C1"), 50, 100);
    text(tr1.getString("C2"), 50, 115);
    text(tr1.getString("C3"), 50, 130);
    text(tr2.getString("C1"), 530, 100);
    text(tr2.getString("C2"), 530, 115);
    text(tr2.getString("C3"), 530, 130);
    break;
  case 4:
    text(tr1.getString("C1"), 50, 100);
    text(tr1.getString("C2"), 50, 115);
    text(tr1.getString("C3"), 50, 130);
    fill(255);
    text(tr1.getString("C4"), 50, 145);
    fill(155);
    text(tr2.getString("C1"), 530, 100);
    text(tr2.getString("C2"), 530, 115);
    text(tr2.getString("C3"), 530, 130);
    fill(255);
    text(tr2.getString("C4"), 530, 145);
    break;
  case 5:
    text(tr1.getString("C1"), 50, 100);
    text(tr1.getString("C2"), 50, 115);
    text(tr1.getString("C3"), 50, 130);
    fill(255);
    text(tr1.getString("C4"), 50, 145);
    fill(155);
    text("NOTES: " + tr1.getString("NOT"), 50, 160);
    text(tr2.getString("C1"), 530, 100);
    text(tr2.getString("C2"), 530, 115);
    text(tr2.getString("C3"), 530, 130);
    fill(255);
    text(tr2.getString("C4"), 530, 145);
    fill(155);
    text("NOTES : " + tr2.getString("NOT"), 530, 160);
    break;
  }
}

void drawFocusSlider() {
  fill(127);
  strokeWeight(1);
  stroke(#E3DBB6);
  line(0, 360, width, 360);
  for (int i = 0; i<width; i+=25) {
    strokeWeight(1);
    stroke(#E3DBB6);
    line(i, 358, i, 362);
    textSize(8);
    textAlign(CENTER);
    text(i, i, 355);
  }
}

void getNewRows() {
  row1 = int(random(2, tiTable.getRowCount()));
  row2 = int(random(2, tiTable.getRowCount()));
}

boolean canAm(int secs) {
  if(counter == 4) {
    if(secs>60){
      
    }
    uMil = 0;
    return true;
  } else {
    return false;
  }
}

void mouseReleased() {
  if (btnContinue.hov) { // && canAm(lMil) && counter<=4) {
    if (counter == 4) {
      btnContinue.c = #CE8D85;
      btnContinue.t = "Next click will reset terms...";
      counter++;
    } else if (counter>=6) {
      counter = 0;
      getNewRows();
    } else {
      btnContinue.c = #C5DBB5;
      btnContinue.t = "Continue...";
      counter++;
    }
  } else if (btnPlausible.hov) {
    TableRow newRow = reTable.addRow();
    newRow.setString("T1", tr1.getString("C4"));
    newRow.setString("T2", tr2.getString("C4"));
    newRow.setString("P", "YES");
    newRow.setString("NOTES", notes);
    saveTable(reTable, "data/responses.csv");
    notes = "";
    println("Table saved!");
    counter = 0;
    getNewRows();
  } else if (btnNotPlausible.hov) {
    TableRow newRow = reTable.addRow();
    newRow.setString("T1", tr1.getString("C4"));
    newRow.setString("T2", tr2.getString("C4"));
    newRow.setString("P", "NO");
    newRow.setString("NOTES", notes);
    saveTable(reTable, "data/responses.csv");
    notes = "";
    println("Table saved!");
    counter = 0;
    getNewRows();
  } else if (btnIrrelevant.hov) {
    TableRow newRow = reTable.addRow();
    newRow.setString("T1", tr1.getString("C4"));
    newRow.setString("T2", tr2.getString("C4"));
    newRow.setString("P", "IR");
    newRow.setString("NOTES", notes);
    saveTable(reTable, "data/responses.csv");
    notes = "";
    println("Table saved!");
    counter = 0;
    getNewRows();
  } else if (btnLeft.hov) {
    // TODO: add record review info
  }
}
void keyPressed() {
  if (state==stateReadNotes) {
    if ( (key>='a'&&key<='z') || ( key >= 'A'&&key<='Z') || (key>=' ')) {
      notes+=key;
    } else if (key==ENTER||key==RETURN) {
      state=statePlay;
      println ("Thank you, "+notes+".");
    } else if (key==BACKSPACE) {
      if (notes.length()>0) {
        notes=notes.substring(0, notes.length()-1);
      }
    } else { 
      println ("Unknow key "+ key);
    }
  }
}
void mouseDragged() {
  if (mouseX >= 0 && mouseY > 350 && mouseX < width && mouseY<370) {
    row1 = mouseX;
  }
}

void mousePressed() {
  // return to enter name
  if (state==statePlay) {
    state=stateReadNotes;
  }
  if (mouseX >= 0 && mouseY > 350 && mouseX < width && mouseY<370) {
    row1 = mouseX;
  }
}