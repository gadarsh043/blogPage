For hands-on experience: <a href="https://g-adarsh-sonu.netlify.app/" target="_blank">Blog Page</a>

# Blogging Application

I am happy to introduce you to my page which was developed for the users to create, modify and administrate their blog entries with no sweat. The simple layout contributes to the ease of some of the functions such as the blog posting, deleting or editing. I made this with the intention to express my thoughts.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Conclusion](#conclusion)

## Features

- **User Authentication:** Users can log in, register, and reset their passwords.
- **Blog Management:** Users can create, edit, delete, and view blog posts.
- **Responsive Design:** The application is mobile-friendly and adjusts to different screen sizes.
- **Admin Features:** Admins can manage users and have additional functionalities for blog management.

## Technologies Used

- **Frontend:**
  - Vue.js
  - Vue Router
  - Firebase for authentication and data storage
  - Vuex for state management
  - HTML, CSS, and JavaScript

## Installation

To get started with this application, follow these steps:

1. Clone the repository:
   git clone https://github.com/yourusername/blogging-application.git
   cd blogging-application
2. Install the required dependencies:
    npm install
3. Set up Firebase:
    Create a Firebase project and configure the Firestore database.
    Update the firebaseConfig in your code with your Firebase project's credentials.
4. Run the application:
    npm run serve
5. Open your browser and go to http://localhost:8080.

## Usage

After setting up and running the application, users can navigate through the various features. They can register, log in, and access the blog management section where they can create, edit, and delete blog posts. Admin users will have additional options to manage other users and their permissions.

## Project Structure

blogging-application/
├── src/
│   ├── assets/              # Contains image and icon assets
│   ├── components/          # Reusable Vue components
│   ├── firebase/            # Firebase-related code
│   ├── router/              # Vue Router for navigation
│   ├── store/               # Vuex store for state management
│   ├── views/               # Vue components representing different views
│   ├── App.vue              # Main App component
│   └── main.js              # Entry point for Vue
├── public/                  # Static files
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
└── package.json             # Project metadata and dependencies


## How It Works

User Registration/Login: Users can register and log in using Firebase Authentication.
Blog Management: Authenticated users can create new blog posts, edit existing ones, and delete posts they no longer want.
Admin Functionality: Admin users can manage other users and have access to additional blog management features.

## Conclusion
I created this to grow my skills in front-end web application building using Vue.js and firebase. It was very challenging but at the same time – very exciting. It was basically for the purpose of encouraging my brother to put out thoughts on different matters. Thanks to external sources like Stack Overflow and YouTube for concepts😁.
