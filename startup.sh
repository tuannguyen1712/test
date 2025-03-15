#!bin/bash
sudo systemctl restart hostapd
sudo systemctl restart dnsmasq
sudo systemctl restart dhcpcd

source .venv/bin/activate
while ! ip a show | grep -q "192.168.4.1"; do
	echo "Wait config access point ..."
	sleep 2
done
python3 /home/ubuntu/Quadcopter/test/mqtt_server.py

