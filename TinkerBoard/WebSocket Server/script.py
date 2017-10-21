# -*- coding: utf-8 -*-
# Module
import threading
import ASUS.GPIO as GPIO
from websocket_server import WebsocketServer
from time import sleep, clock
from math import cos, sin, pi
from random import randint

# Je nach Modus wird eine andere Farbe / ein anderer Effekt angezeigt
mode = 'loading'
previousMode = mode

# Server erstellen, Port als Argument
server = WebsocketServer(9001)

# Spiel verbindet mit Server
def newConnection(client, server):
    print('Connection %d established' % client['id'])
server.set_fn_new_client(newConnection)

# Verbindung unterbrochen
def lostConnection(client, server):
    print('Connection %d lost' % client['id'])
server.set_fn_client_left(lostConnection)

# Nachricht von Spiel zum Server
def readMessage(client, server, message):
    setMode(message)
    print('Mode: ' + str(message))
server.set_fn_message_received(readMessage)

# Modus setzen
def setMode(newMode):
    # Behebung von Fehler wo Variablen innerhalb der Server-Funktionen
    # nicht erkannt wurden (https://stackoverflow.com/q/10851906)
    global mode, previousMode
    previousMode = mode
    mode = newMode.lower().strip()

# Farbe einer LED setzen
def setColour(led, r, g, b):
    led[0].ChangeDutyCycle(100 - r)
    led[1].ChangeDutyCycle(100 - g)
    led[2].ChangeDutyCycle(100 - b)

# alle Farben aller LEDs setzen
def setColoursAllLeds(r, g, b):
    for led in leds:
        led[0].ChangeDutyCycle(100 - r)
        led[1].ChangeDutyCycle(100 - g)
        led[2].ChangeDutyCycle(100 - b)

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

# Fehler nicht anzeigen
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

print('before')
# Server starten
serverLoop = threading.Thread(target=server.run_forever)
serverLoop.start()
print('after')

# Endlosschleife, Länge der Pause
stopped = False
delay = 0.05

while not stopped:
    # Phase (für Trig. Funktionen) nach Zeit, nicht abhängig von Durchlaufszeit einer Iteration
    phase = 20 * clock()
    if mode == 'loading':
        setColourRipple(0, phase, 100)
        setColourAllLeds(1, 0)
        setColourRipple(2, phase + 1, 100)
        delay = 0.05
    elif mode == 'menu':
        setColourRipple(0, phase, 100)
        setColourRipple(1, phase + 0.2, 50)
        setColourRipple(2, phase + 1, 100)
        delay = 0.05
    elif mode == 'off':
        setColoursAllLeds(0, 0, 0)
        delay = 0.5
    elif mode == 'white':
        setColoursAllLeds(100, 100, 100)
        delay = 0.5
    elif mode == 'green':
        setColourAllLeds(1, 100)
        setColourRipple(0, phase, 50)
        setColour(2, phase, 50)
        delay = 0.05
    elif mode == 'red_white':
        setColourAllLeds(0, 100)
        setColourRipple(1, phase, 100)
        setColourRipple(2, phase, 100)
        delay = 0.05
    elif mode == 'blue_white':
        setColourAllLeds(2, 100)
        setColourRipple(0, phase, 100)
        setColourRipple(1, phase, 100)
        delay = 0.05
    elif mode == 'yellow_white':
        setColourAllLeds(0, 100)
        setColourAllLeds(1, 100)
        setColourRipple(2, phase, 100)
        delay = 0.05
    elif mode == 'pink':
        setColourAllLeds(0, 100)
        setColourAllLeds(1, 0)
        setColourRipple(2, phase, 100)
        delay = 0.05
    elif mode == 'purple':
        setColourAllLeds(2, 100)
        setColourAllLeds(1, 0)
        setColourRipple(0, phase, 100)
        delay = 0.05
    elif mode == 'red_blue':
        setColourAllLeds(1, 0)
        setColourRipple(0, phase, 100)
        setColourRipple(2, phase + 0.8, 100)
        delay = 0.05
    elif mode == 'damage':
        for k in range(10):
            setColoursAllLeds(100 - k * 10, 0, 0)
            sleep(0.05)
            mode = previousMode
    else:
        mode = previousMode

    previousMode = mode
    sleep(delay)

GPIO.cleanup()

