![Screenshot 2024-03-02 135203](https://github.com/NemroNeno/MERN_ChatApp/assets/138875480/3cc5b946-2811-4b2e-80de-da86d67a1d06)
![Screenshot 2024-03-02 135243](https://github.com/NemroNeno/MERN_ChatApp/assets/138875480/7fc8f16b-26bb-4dfe-9bdf-589b1d5d597a)
![Screenshot 2024-03-02 135337](https://github.com/NemroNeno/MERN_ChatApp/assets/138875480/039f3821-718b-4977-bcb1-b7a341966abf)
![Screenshot 2024-03-02 135443](https://github.com/NemroNeno/MERN_ChatApp/assets/138875480/8fefc3c3-d8a2-4346-989e-023ea67017d6)
![Screenshot 2024-03-02 135718](https://github.com/NemroNeno/MERN_ChatApp/assets/138875480/27bc2533-95e3-4da1-a76e-62e417c38f9a)
![Screenshot 2024-03-02 135747](https://github.com/NemroNeno/MERN_ChatApp/assets/138875480/5ef7e729-fb4c-48e6-8045-e3a4b70ef700)
![Screenshot 2024-03-02 135854](https://github.com/NemroNeno/MERN_ChatApp/assets/138875480/0784a815-edcd-44fa-8c90-e32a174c3848)


# MERN Stack Chat Application

A simple chat application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Client](#client)
  - [Server](#server)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a chat application that uses the MERN stack for its development. It includes a React-based frontend for the client-side and an Express.js backend for the server-side and Includes the leverage of Web sockets
to bring Real-time Response.

## Prerequisites

Before running the application, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (Make sure MongoDB server is running)

## Installation

### Client

Navigate to the `Client` folder:

```bash
step 1: command:cd Client
step 2: command:npm install
step 3:command: npm start

This will start the React development server, and you can access the client application at http://localhost:3000.



### Server

Navigate to the `Server` folder:

```bash
step 1:command:cd Server
step 2:  command:npm install
step 3: add .env file with the following data intit:
::

MONGO_URL="YOUR MONGODB CONNECTION STRING"
JWT_SECRET="ANY STRING KEY"
::

step 4: command: nodemon app.js

This will start the express server, and you can access the api application at http://localhost:3200.


### Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. Contributions are always welcome!
There are still many areas for improvement in this app.

License
This project is licensed under the MIT License.
