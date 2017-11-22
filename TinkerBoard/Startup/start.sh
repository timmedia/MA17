#! /bin/bash
xrandr --newmode "800x480_60.00"   29.50  800 824 896 992  480 483 493 500 -hsync +vsync;
xrandr --addmode HDMI-1 "800x480_60.00";
xrandr --output HDMI-1 --mode "800x480_60.00";
sudo python3 MA17/TinkerBoard/WebSocketServer/script.py

# send IP Address to Telegram
# ip addr show wlan0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
ip=$(ip route get 8.8.8.8 | awk 'NR==1 {print $NF}')
curl http://projects.tim-media.com/telegram/sendTimMessage.php?message=$ip

exec bash
