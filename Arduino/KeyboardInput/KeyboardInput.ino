// Tastatur Bibliothek
#include <Keyboard.h>

// Variablen, Werte werden vor dem Kompilieren im Code mit den Werten ersetzt
#define buttonEsc 4       // Escape an Pin 4
#define buttonBackspace 5 // Backspace an Pin 5
#define buttonA 6         // A an Pin 6
#define buttonD 7         // D an Pin 7
#define buttonSpace 8     // Leertaste an Pin 8 
#define buttonShift 9     // Shift-Taste an Pin 9

int characters[6] = {177, 178, 97, 100, 32, 129};               // Charaktere nach ASCII (a, d, Leertaste, shift)
boolean isDown[6] = {false, false, false, false, false, false}; // Array mit Status aller Tasten
boolean wasDown[6];                                             // Array mit vorherigen Status

// Initialisierungs-Funktion, wird bei Arduino-start 1x durchlaufen
void setup() {
  Keyboard.begin();                 // Tastatur Emulierung wird gestartet
  pinMode(buttonEsc, INPUT_PULLUP); // Pins als Tasten-Input, interner Widerstand wird verwendet
  pinMode(buttonBackspace, INPUT_PULLUP);
  pinMode(buttonA, INPUT_PULLUP);     
  pinMode(buttonD, INPUT_PULLUP);     
  pinMode(buttonSpace, INPUT_PULLUP);
  pinMode(buttonShift, INPUT_PULLUP);
}

// Endlosschleife, wird nach setup() endlos ausgeführt
void loop() {
  memcpy(wasDown, isDown, 4);        // Array von vorherigen Status wird kopiert & gespeichert

  // Status von Pins wird überprüft und gespeichert
  isDown[0] = !digitalRead(buttonEsc);
  isDown[1] = !digitalRead(buttonBackspace);
  isDown[2] = !digitalRead(buttonA); 
  isDown[3] = !digitalRead(buttonD);
  isDown[4] = !digitalRead(buttonSpace);
  isDown[5] = !digitalRead(buttonShift);
  for (int k = 0; k < 6; k++) { processKey(k); } // Jede Taste wird verarbeitet
  delay(1); // Verzögerung von 1ms für Stabilität
}

// Funktion vom Taste zu verarbeiten
void processKey(int i) {
  if (isDown[i] && !wasDown[i]) { // Knopf ist unten & war nicht unten
    // Tastatur Input soll bloss betätigt werden falls Taste vorher noch nicht gedrückt wurde
    Keyboard.press(characters[i]); 
  } else if (!isDown[i] && wasDown[i]) { // Knopf war unten & ist nicht unten
    // Tastatur Input soll lossgelassen werden
    Keyboard.release(characters[i]);
  }
}


