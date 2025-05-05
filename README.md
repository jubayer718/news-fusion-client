
# 📰 News Fusion

## Project Overview

**News Fusion** is a modern, responsive web application built for managing and publishing news articles. It allows users to submit their own news stories while incorporating an admin approval process to maintain content quality and control. The platform ensures user privacy and secure access control, making it suitable for collaborative or community-driven journalism.

---

## Which purpose this web site?

* First of all it use for news related Work and Activities.
* Here any person submit his/her News Article.
* User can read latest news that's added just now.


## 🌟 Features

* 🧑‍💻 User-friendly interface with responsive design
* 🔐 Secure user authentication and access control
* 🚫 Users cannot delete or edit others' articles
* ✅ Admin-only approval process for new submissions
* 📝 Articles remain in a “pending” state until approved
* 🧭 Safe and private browsing for all users
* 🔒 Role-based routes for admin and regular users
* 📄 Approved articles appear in the public listings

---

## 🛠 Tech Stack

* **Frontend**: React.js
* **State Management**: React Context / Hooks
* **UI Components**: `react-select`, `SweetAlert2`
* **Authentication**: Firebase Authentication
* **Database**: Firebase Firestore
* **Deployment**: Firebase Hosting

---

## 🚀 Live Project

🔗 [View the live site](https://newfusion-f31a5.web.app)

---

## 🧪 Setup & Installation

Follow these steps to set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/jubayer718/news-fusion-client.git

   cd news-fusion
   ```

2. **Install dependencies**
 npm i firebase
   ```bash
   npm install
   ```

3. **Configure Firebase**

   * Add your Firebase project credentials to a `.env` file:

     ```
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
     ```

4. **Run the development server**

   ```bash
   npm start
   ```

## 👨‍💻 Contributors

* Your Name ([jubayer](https://github.com/jubayer718))


---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

