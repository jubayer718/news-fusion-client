# 📰 News Fusion

## 🚀 Introduction
**News Fusion** is a modern, feature-rich news platform where users can explore the latest articles, trending news, and premium content. The platform supports multiple publishers and provides an engaging user experience with interactive elements.

## 📑 Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Dependencies](#-dependencies)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features
- Browse the latest news articles from multiple publishers.
- Interactive elements for an engaging user experience.
- Secure authentication via Firebase.
- Payment integration with **Stripe** for premium content.
- Real-time updates using React Query.
- Responsive UI with **React Slick** and **Awesome Slider**.
- Data visualization with **Google Charts**.
- Form validation with **React Hook Form**.

## 📥 Installation
### Prerequisites
- Node.js (v16+ recommended)
- NPM or Yarn installed

### Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/news-fusion.git
   cd news-fusion
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**  
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   VITE_apiKey=YOUR_FIREBASE_API_KEY
   VITE_authDomain=YOUR_AUTH_DOMAIN
   VITE_projectId=YOUR_PROJECT_ID
   VITE_storageBucket=YOUR_STORAGE_BUCKET
   VITE_messagingSenderId=YOUR_MESSAGING_SENDER_ID
   VITE_appId=YOUR_APP_ID
   VITE_url=YOUR_BACKEND_URL
   VITE_IMAGE_HOSTING_KEY=YOUR_IMAGE_HOSTING_KEY
   VITE_Payment_Gateway_PK=YOUR_STRIPE_PUBLIC_KEY
   ```
4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables
| Variable                     | Description                         |
|------------------------------|-------------------------------------|
| `VITE_apiKey`                | Firebase API key                   |
| `VITE_authDomain`            | Firebase authentication domain     |
| `VITE_projectId`             | Firebase project ID                |
| `VITE_storageBucket`         | Firebase storage bucket            |
| `VITE_messagingSenderId`     | Firebase messaging sender ID       |
| `VITE_appId`                 | Firebase app ID                    |
| `VITE_url`                   | Backend API URL                    |
| `VITE_IMAGE_HOSTING_KEY`     | Image hosting service API key      |
| `VITE_Payment_Gateway_PK`    | Stripe payment gateway public key  |

## 🛠 Usage
- Open the app and browse through news categories.
- Register or log in using Firebase authentication.
- Subscribe to premium content via Stripe payment gateway.
- Interact with dynamic charts and interactive news sections.

## 📦 Dependencies
The project uses the following major dependencies:
- **React** (`18.3.1`)
- **React Router DOM** (`7.1.1`)
- **React Query** (`5.64.1`)
- **Axios** (`1.7.9`)
- **Firebase** (`11.1.0`)
- **Stripe** (`@stripe/react-stripe-js`, `@stripe/stripe-js`)
- **React Hook Form** (`7.54.2`)
- **React Slick** & **Slick Carousel** (for carousels)
- **React Google Charts** (for data visualization)
- **SweetAlert2** (for alert modals)

For the complete list, check [`package.json`](./package.json).

## ⚙️ Configuration
- The frontend fetches news articles from the backend API defined in `.env` (`VITE_url`).
- Firebase is used for authentication and storage.
- Stripe is used for handling payments.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to your branch (`git push origin feature-name`).
5. Open a pull request.

## 📜 License
This project is licensed under the **MIT License**.


## Live URL
* [Live site](https://newfusion-f31a5.web.app)
