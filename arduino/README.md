# RFID Reader Arduino Setup

This directory contains the Arduino code for the RFID reader component of the RFID Inventory Ninja project.

## Hardware Requirements

- Arduino Mega (or compatible board)
- MFRC522 RFID-RC522 module
- RFID cards/tags
- Jumper wires

## Wiring Instructions

Connect the MFRC522 module to the Arduino Mega as follows:

```
MFRC522    ->   Arduino Mega
SDA        ->   D10 (SS_PIN)
SCK        ->   D52 (SCK)
MOSI       ->   D51 (MOSI)
MISO       ->   D50 (MISO)
GND        ->   GND
RST        ->   D9 (RST_PIN)
3.3V       ->   3.3V
```

## Software Requirements

1. Arduino IDE (version 1.8.x or later)
2. Required Libraries:
   - MFRC522 (install via Arduino Library Manager)

## Installation Steps

1. Install Arduino IDE from [arduino.cc](https://www.arduino.cc/en/software)
2. Open Arduino IDE
3. Go to Tools -> Manage Libraries
4. Search for "MFRC522" and install the library by "GithubCommunity"
5. Open the `rfid_reader.ino` sketch
6. Select your board (Arduino Mega 2560) from Tools -> Board
7. Select the correct port from Tools -> Port
8. Click Upload to flash the code to your Arduino

## Testing

1. After uploading, open the Serial Monitor (Tools -> Serial Monitor)
2. Set the baud rate to 9600
3. Present an RFID card to the reader
4. You should see the card's UID printed in the Serial Monitor

## Troubleshooting

- If the reader is not detecting cards:
  - Check all wiring connections
  - Ensure the MFRC522 library is properly installed
  - Verify the correct board and port are selected
  - Check if the RFID card is compatible with the MFRC522 reader

## Integration with Backend

The Arduino sends the RFID UID over Serial at 9600 baud. The backend server reads this serial data and forwards it to the frontend application. 