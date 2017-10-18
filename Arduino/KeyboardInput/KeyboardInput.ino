// Tastatur Bibliothek
#include <Keyboard.h>

// Variablen, Werte werden vor dem Kompilieren ersetzt
#define buttonA 6   // A an Pin 6
#define buttonD 7   // D an Pin 7
#define buttonSpace 8   // Leertaste an Pin 8 
#define buttonShift 9   // Leertaste an Pin 9

int characters[4] = {97, 100, 32, 129};
boolean isDown[4] = {false, false, false, false};
boolean wasDown[4];

void setup() {
  Keyboard.begin();
  pinMode(buttonA, INPUT_PULLUP);
  pinMode(buttonD, INPUT_PULLUP);
  pinMode(buttonSpace, INPUT_PULLUP);
  pinMode(buttonShift, INPUT_PULLUP);
}

void loop() {
  memcpy(wasDown, isDown, 4);
  isDown[0] = !digitalRead(buttonA);
  isDown[1] = !digitalRead(buttonD);
  isDown[2] = !digitalRead(buttonSpace);
  isDown[3] = !digitalRead(buttonShift);
  for (int k = 0; k < 4; k++) {
    processKey(k);
  }
  delay(1);
}

void processKey(int i) {
  if (isDown[i] && !wasDown[i]) {
    Keyboard.press(characters[i]);
  } else if (!isDown[i] && wasDown[i]) {
    Keyboard.release(characters[i]);
  }
}


