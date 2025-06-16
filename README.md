# RFID Inventory Ninja

A modern inventory management system using RFID technology for efficient tracking and management of items.

## Project Structure

This project is organized into three main components:

### Frontend
Located in the `frontend` branch, this contains the React-based user interface that provides:
- Real-time inventory tracking
- User-friendly dashboard
- Interactive data visualization
- Responsive design for all devices

### Backend
Located in the `backend` branch, this contains the server-side implementation featuring:
- Flask-based REST API
- RFID reader integration
- Database management
- Authentication and authorization

### Arduino
Located in the `arduino` branch, this contains the hardware implementation featuring:
- RFID reader code for Arduino Mega
- Serial communication setup
- Hardware wiring instructions

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python 3.8 or higher
- Arduino IDE (v1.8.x or higher)
- RFID reader hardware (MFRC522 module)
- Arduino Mega (or compatible board)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/rfid-inventory-ninja.git
```

2. Frontend Setup:
```bash
git checkout frontend
npm install
npm start
```

3. Backend Setup:
```bash
git checkout backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python server.js
```

4. Arduino Setup:
```bash
git checkout arduino
```
Then follow the instructions in `arduino/README.md` to:
- Install required libraries
- Wire the RFID reader
- Upload the code to your Arduino

## Features

- Real-time RFID scanning
- Inventory tracking and management
- User authentication
- Data visualization
- Export/Import functionality
- Mobile responsive design
- Hardware integration with Arduino

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/rfid-inventory-ninja
