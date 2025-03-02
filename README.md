# Water Price Management

## Project Overview
Water Price Management is a web application developed for the Indore Municipal Corporation to optimize water supply and pricing. The project aims to reduce expenses by simulating and analyzing key parameters such as pipeline cost, distance, and temperature, which directly and indirectly affect water distribution costs.

## Key Features
- **Price Optimization:** Simulates parameters to help set optimized water prices within budget constraints.
- **Heatmap Visualization:** Displays complaint density for each area, aiding in targeted management.
- **User Interface:** Allows administrators to visualize data and adjust parameters in real-time.

![Screenshot 2024-07-28 105122](https://github.com/user-attachments/assets/3aea90d7-71fb-41fb-acfb-c34da509e55b)

## Tech Stack
- **Frontend:** React.js, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Machine Learning:** Python (Flask), Attention BiLSTM + CNN Model

## Project Structure
- `/frontend`: Contains the React.js application.
- `/backend`: Node.js API for data management and processing.
- `/model`: Machine learning model for price and supply optimization.


## How It Works
1. User selects an area from the web interface.
2. Backend fetches related data and runs the ML model.
3. Heatmap and optimized pricing are displayed.

## Installation
```bash
# Clone the repository
git clone [repository_url]

# Navigate to project directory
cd WaterPriceManagement

# Install backend dependencies
cd server
npm install

# Start backend server
npm start

# Install frontend dependencies
cd ../client
npm install

# Start frontend server
npm start
```

## Usage
- Navigate to `http://localhost:3000`.
- Select an area to view water distribution and pricing details.
- Admins can modify parameters and visualize impact on the heatmap.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.
