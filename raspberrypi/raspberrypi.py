import socket
import serial
sensor = serial.Serial(port = '/dev/serial/by-id/usb-1a86_USB_Serial-if00-port0', baudrate = 9600)

def crash_detection():
    data = sensor.readline()
    if data == b'1\r\n':
        print("ALERT: CRASH DETECTED")
        return 1
    else: return 0

def node_init():
    node = socket.socket()
    print("Socket created successfully")
    port = 8000
    node.bind(('192.168.87.102', port))
    print("socket has been binded to port 8000")
    node.listen(5)
    c, addr = node.accept()
    print("got connection from ", addr)
    return c


def send_alert(c):
    while True:
        try:
            c.send("ALERT: EMERGENCY".encode())
            c.send("VEHICLE 1 in distress".encode())
        except BrokenPipeError:
            print("Disconnected")
        break

def main():
    server = node_init()
    while True:
        if crash_detection() == 1:
            send_alert(server)
    
if __name__=="__main__":
    main()