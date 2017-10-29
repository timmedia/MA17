# -*- coding: utf-8 -*-
# Module
import json
import threading
import ASUS.GPIO as GPIO
from subprocess import Popen
from websocket_server import WebsocketServer
from time import sleep, clock
from math import cos, sin, pi
from random import randint

# Je nach Modus wird eine andere Farbe / ein anderer Effekt angezeigt
mode = 'loading'
previousMode = mode

# Beibehalten der Anzahl Tode (Bestimmung ob einer hinzugekommen ist)
previousDeathCount = 0

# Server erstellen, Port als Argument (lokal erreichbar via ws://localhost:9001)
server = WebsocketServer(9001)

# Spiel verbindet mit Server, Funktion an Modul übergeben
def newConnection(client, server):
    print('Connection %d established' % client['id'])
server.set_fn_new_client(newConnection)

# Verbindung unterbrochen
def lostConnection(client, server):
    print('Connection %d lost' % client['id'])
server.set_fn_client_left(lostConnection)

# Modus setzen
def setMode(newMode):
    # 'global': Behebung von Fehler wo Variablen innerhalb der Server-Funktionen
    # nicht erkannt wurden (Lösung von: https://stackoverflow.com/q/10851906)
    global mode, previousMode
    # vorherigen Modus speichern
    previousMode = mode
    mode = newMode.lower().strip()

# Nachricht von Spiel zum Server
def readMessage(client, server, message):
    global mode, previousMode, previousDeathCount
    # JSON (String) in Python lesen: https://stackoverflow.com/q/7771011
    info = json.loads(message)
    if info['deathCount'] == previousDeathCount:
        setMode(info['mode'])
    else:
        previousDeathCount = info['deathCount']
        previousMode = info['mode']
        mode = 'damage'
    print('Mode: ' + str(message))
server.set_fn_message_received(readMessage)

# Farbe einer LED setzen
def setColour(led, r, g, b):
    # Intensität ist 100-x da die LEDs eine gemeinsame Anode haben und dementprechend
    # der Pin 0V haben muss damit die LED zu 100% leuchtet
    led[0].ChangeDutyCycle(100 - r)
    led[1].ChangeDutyCycle(100 - g)
    led[2].ChangeDutyCycle(100 - b)

# alle Farben aller LEDs setzen
def setColoursAllLeds(r, g, b):
    for led in leds:
        led[0].ChangeDutyCycle(100 - r) # rot
        led[1].ChangeDutyCycle(100 - g) # grün
        led[2].ChangeDutyCycle(100 - b) # blau

# einzelne Farbe aller LEDs setzen
def setColourAllLeds(colourIndex, intensity):
    for led in leds:
        led[colourIndex].ChangeDutyCycle(100 - intensity)

# 'Wellen'-Effekt, einzelne Farbe, alle LEDs
def setColourRipple(colourIndex, phase, intensity):
    percentage = intensity / 2
    for i in range(5):
        leds[i][colourIndex].ChangeDutyCycle(percentage * sin(phase + 0.8 * i) + percentage)

# Pin Nummerierung setzen
GPIO.setmode(GPIO.BOARD)

# Fehler in Konsole nicht anzeigen
GPIO.setwarnings(False)

# jede Zeile ist eine LED, mit jeweils Pinnummern von Rot, Grün und Blau
pins = [
    [3, 5, 7],
    [11, 13, 15],
    [19, 21, 23],
    [29, 31, 33],
    [8, 10, 12]
]

# Array mit allen LEDs, für später
leds = []

# Jeder Pin als PWM-Output, danach dem 'leds' Array hinzufügen, gleiche Struktur wie bei 'pins'
for triple in pins:
    GPIO.setup(triple, GPIO.OUT)
    led = []
    for pin in triple:
        colour = GPIO.PWM(pin, 50)
        colour.start(0)
        led.append(colour)
    leds.append(led)

# Server starten
serverLoop = threading.Thread(target=server.run_forever)
serverLoop.start()

# Endlosschleife, Länge der Pause
stopped = False
delay = 0.05

# Server ist parat, Spiel soll starten
# Idee: https://unix.stackexchange.com/q/188182 & https://stackoverflow.com/q/1196074
Popen(['firefox', 'file:///home/linaro/MA17/game_files/game.html?mode=arcade'])

while not stopped:
    # Phase (für Trig. Funktionen) nach Zeit, nicht abhängig von Durchlaufszeit einer Iteration
    phase = 20 * clock()
    if mode == 'loading':
        # Warten auf Spiel: Welleneffekt mit rot und blau
        setColourRipple(0, phase, 100)
        setColourAllLeds(1, 0)
        setColourRipple(2, phase + 1, 100)
        delay = 0.05
    elif mode == 'menu':
        # Menu wird angezeigt, Welleneffekt mit allen Farben, grün zu max. 50% Helligkeit
        setColourRipple(0, phase, 100)
        setColourRipple(1, phase + 0.2, 50)
        setColourRipple(2, phase + 1, 100)
        delay = 0.05
    elif mode == 'off':
        # Alle LEDs ausgeschaltet, Delay wird erhöht da kein Welleneffekt
        setColoursAllLeds(0, 0, 0)
        delay = 0.5
    elif mode == 'white':
        # Alle LEDs angeschaltet, Delay wird erhöht da kein Welleneffekt
        setColoursAllLeds(100, 100, 100)
        delay = 0.5
    elif mode == 'green':
        # Grüner Farbakzent: rot Welleneffekt, 50% Helligkeit; grün 100%, blau 'Sins'-Kurve
        setColourRipple(0, phase, 50)
        setColourAllLeds(1, 100)
        setColour(2, phase, 50)
        delay = 0.05
    elif mode == 'red_white':
        # Rot-Weisser Farbakzent: rot immer 100%, blau & grün gleichzeitiger Welleneffekt
        setColourAllLeds(0, 100)
        setColourRipple(1, phase, 100)
        setColourRipple(2, phase, 100)
        delay = 0.05
    elif mode == 'blue_white':
        # Blau-Weisser Farbakzent: Blau immer 100%, rot & grün gleichzeitiger Welleneffekt
        setColourAllLeds(2, 100)
        setColourRipple(0, phase, 100)
        setColourRipple(1, phase, 100)
        delay = 0.05
    elif mode == 'yellow_white':
        # Gelb-Weisser Farbakzent: rot & grün immer 100%, blau Welleneffekt
        setColourAllLeds(0, 100)
        setColourAllLeds(1, 100)
        setColourRipple(2, phase, 100)
        delay = 0.05
    elif mode == 'pink':
        # Pinker Farbakzent: grün 0%, rot 100%, blau Welleneffekt
        setColourAllLeds(0, 100)
        setColourAllLeds(1, 0)
        setColourRipple(2, phase, 100)
        delay = 0.05
    elif mode == 'purple':
        # Lila Farbakzent: grün 0%, blau 100%; rot Welleneffekt
        setColourAllLeds(2, 100)
        setColourAllLeds(1, 0)
        setColourRipple(0, phase, 100)
        delay = 0.05
    elif mode == 'red_blue':
        # Rot-Blau abwechselnd: grün 0%, rot & blau abwechselnder Welleneffekt
        setColourAllLeds(1, 0)
        setColourRipple(0, phase, 100)
        setColourRipple(2, phase + 0.8, 100)
        delay = 0.05
    elif mode == 'damage':
        # Spieler nimmt schaden, kurz 100% rot, langsam zu 0%, dann vorheriger Modus weiter
        for k in range(10):
            setColoursAllLeds(100 - k * 10, 0, 0)
            sleep(0.05)
            mode = previousMode
    else:
        # (theoretisch nicht nötig) Mode nicht erkannt, vorheriger wird verwendet
        mode = previousMode

    # Vorheriger Modus wird mit aktuellem ersetzt
    previousMode = mode
    # Timout, Stabilität
    sleep(delay)

# Reset aller Pins, GPIO-Teil beendet
GPIO.cleanup()
