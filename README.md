# 💧 Water Price Management System

## Project Overview
Water Price Management is a web application developed for the Indore Municipal Corporation to optimize water supply and pricing. The project aims to reduce expenses by simulating and analyzing key parameters such as pipeline cost, distance, and temperature, which directly and indirectly affect water distribution costs.

## Key Features
- **Price Optimization:** Simulates parameters to help set optimized water prices within budget constraints.
- **Heatmap Visualization:** Displays complaint density for each area, aiding in targeted management.
- **User Interface:** Allows administrators to visualize data and adjust parameters in real-time.


![Project objective screenshot](https://github.com/user-attachments/assets/3aea90d7-71fb-41fb-acfb-c34da509e55b)

---


### 🎯 Key Features

- 📊 **Predictive Analytics** - ML-powered water pricing and supply forecasting
- 📝 **Complaint Management** - Multi-channel user feedback system
- 🗺️ **Regional Analytics** - Distribution pattern analysis and insights
- ⚡ **Resource Optimization** - Data-driven allocation recommendations

### 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| 🧠 **Machine Learning** | XGBoost + scikit-learn |
| ⚙️ **Backend** | Node.js + Express + MongoDB |
| 💻 **Web Frontend** | React + Vite + Tailwind CSS |
| 📱 **Mobile** | Flutter (iOS & Android) |
| 🔧 **Model Serving** | Flask / FastAPI |

---

## 🏗️ Architecture

```
water-price-management/
│
├── 🧠 XGBoost/              # ML training pipeline
├── ⚙️ server/               # Express REST API
├── 💻 client/               # React web application
└── 📱 water_project/        # Flutter mobile app
```

### 🔄 System Flow

```
┌─────────────┐
│   Mobile    │──┐
│     App     │  │
└─────────────┘  │
                 ├──► ┌─────────────┐      ┌──────────────┐
┌─────────────┐  │    │   Express   │      │              │
│     Web     │──┼───►│     API     │─────►│   MongoDB    │
│   Frontend  │  │    │   Server    │      │              │
└─────────────┘  │    └─────────────┘      └──────────────┘
                 │           │
┌─────────────┐  │           │
│   Admin     │──┘           ▼
│   Portal    │         ┌──────────────┐
└─────────────┘         │  ML Model    │
                        │   Service    │
                        └──────────────┘
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- 🐍 **Python** 3.8 or higher
- 📦 **Node.js** 16 or higher
- 🎯 **Flutter** 3.0 or higher
- 🗃️ **MongoDB** (Local or Atlas)

### ⚡ Quick Setup

#### 1️⃣ Clone Repository
```bash
git clone <repository-url>
cd water-price-management
```

#### 2️⃣ Python Environment
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .\.venv\Scripts\Activate.ps1
```

#### 3️⃣ Install Dependencies
```bash
pip install -r XGBoost/requirements.txt
cd server && npm install
cd ../client && npm install
```

---

## 🤖 Machine Learning Pipeline

### 📂 Directory Structure

```
XGBoost/
├── 📄 app.py                    # Training script
├── 📊 Training_Data_1.xlsx      # Sample dataset
├── 📋 requirements.txt          # Dependencies
└── 🎯 xgboost_model.pkl        # Trained model (generated)
```

### 🎓 Training Process

The ML pipeline uses **XGBoost** with automated preprocessing for optimal predictions.

#### 📦 Required Dependencies
- pandas (≥1.5.0)
- scikit-learn (≥1.2.0)
- xgboost (≥1.7.0)
- joblib (≥1.2.0)
- numpy (≥1.23.0)
- openpyxl (≥3.0.0)

#### 🔧 Training Steps

1. 📥 Prepare your dataset in Excel format
2. ✏️ Update dataset path in `app.py`
3. ▶️ Run training
4. ✅ Model artifact generated

#### 📤 Output
- **Trained Model**: `xgboost_model.pkl`
- **Console Reports**: Sample predictions & feature importance

### 🌐 Model Serving

Deploy as a microservice for production-ready inference.

#### 🎯 Deployment Options
- **Flask** - Lightweight and simple
- **FastAPI** - Modern, fast, with auto documentation
- **Docker** - Containerized deployment

#### 🚦 Starting Inference Server
```bash
python XGBoost/inference_api.py
```

---

## 🔌 Backend API

### 📍 Location
`server/`

### 🎯 Core Capabilities
Express.js REST API providing authentication, complaint management, and analytics.

### 🛣️ API Endpoints

| Method | Endpoint | Description | 🔐 Auth |
|--------|----------|-------------|---------|
| 📝 POST | `/api/auth/signup` | User registration | ❌ |
| 🔑 POST | `/api/auth/login` | User authentication | ❌ |
| 📮 POST | `/api/complaints/submit` | Submit complaint + image | ✅ |
| 📊 GET | `/api/complaints/regions` | Regional statistics | ✅ |
| 🗺️ GET | `/parameters/:subRegion` | Regional parameters | ✅ |

### ⚙️ Configuration

**Environment Variables** (`.env` in `server/`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/water_management
JWT_SECRET=your_secret_key_here
ML_API_URL=http://localhost:5001
```

### ▶️ Starting Server
```bash
cd server
npm install
npm start
```

---

## 🌐 Web Frontend

### 📍 Location
`client/`

Modern React application with beautiful UI and responsive design.

### ✨ Key Features

- 🔐 **Authentication** - Secure user login/signup
- 👤 **Profile Management** - User dashboard
- 🗺️ **Regional Visualization** - Interactive water supply maps
- 📝 **Complaint System** - Easy submission with image upload
- 📊 **Real-time Dashboards** - Live data insights
- 📱 **Responsive Design** - Works on all devices

### ⚙️ Configuration

**Environment Variables** (`.env` in `client/`)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 🚀 Development
```bash
cd client
npm install
npm run dev
```

### 📦 Production Build
```bash
npm run build
```

---

## 📱 Mobile Application

### 📍 Location
`water_project/`

Cross-platform mobile solution for iOS and Android.


### 🏗️ Building
```bash
cd water_project
flutter pub get
flutter run
```

---


## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 🔄 Workflow

1. 🍴 Fork the repository
2. 🌿 Create feature branch (`feature/improvement`)
3. ✏️ Commit your changes
4. 📤 Push to your branch
5. 🎯 Open a Pull Request

### 📏 Code Standards

- 🐍 **Python**: Follow PEP 8
- 📜 **JavaScript**: Use ESLint config
- 🎯 **Dart/Flutter**: Follow official style guide
- ✅ **Testing**: Write unit tests for features
- 📚 **Documentation**: Update docs for changes

---




<div align="center">

### 🌟 Project Status

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Last Updated**: October 2025

---

Made with 💙 for better water management

</div>
