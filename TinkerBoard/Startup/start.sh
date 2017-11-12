#! /bin/bash

xrandr --newmode "800x480_60.00"   29.50  800 824 896 992  480 483 493 500 -hsync +vsync &&
xrandr --addmode HDMI-1 "800x480_60.00" &&
xrandr --output HDMI-1 "800x480_60.00" &&
sudo python3 MA17/TinkerBoard/WebSocketServer/script.py
