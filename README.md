# Earthquake Project

This project is a **monorepo** built with **NX**, which contains both the **frontend** and **backend** parts. The backend handles **GraphQL API** with **Apollo Server v4** and **Express**, while the frontend is built using **Next.js** and **HeroUI** for the UI.

## Prerequisites for Running This Project

### **1. Node.js**
- **Node.js** is required to run both the backend (Express, Apollo Server) and frontend (Next.js).
- **Version Used**: Node.js **v18.x** or later
- **Installation**: You can download and install Node.js from [here](https://nodejs.org/).

### **2. PNPM (Package Manager)**
- **PNPM** is used for managing project dependencies in this monorepo.
- **Version Used**: PNPM **v7.x** or later
- **Installation**: Install PNPM globally on your system:
  ```bash
  npm install -g pnpm
  ```

### **3. MongoDB**
- MongoDB is used to store earthquake data. You can either use a **local MongoDB instance** or **MongoDB Atlas** (cloud).
- **MongoDB Version**: MongoDB **5.x**
- **Installation**: To install **MongoDB** locally:
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community@5.0
  ```

### **4. NX**
- **NX** is used to manage multiple applications and libraries in a **monorepo**.
- **Version Used**: NX **v15.x** or later
- **Installation**: The NX CLI is typically installed globally:
  ```bash
  npm install -g nx
  ```

---

## Setting up and Running the Project

Once you have **Node.js**, **PNPM**, and **MongoDB** installed, follow these steps to get the project running.

### **1. Clone the Repository**
If you haven't already, clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

### **2. Install Dependencies**
The dependencies are already set up for both the frontend and backend. You need to install them separately for each project.

#### Install Frontend Dependencies
Go to the **frontend** folder and install its dependencies:
   ```bash
    cd frontend
    pnpm install
   ```

#### Install Frontend Dependencies
Go to the **frontend** folder and install its dependencies:
   ```bash
    cd ../backend
    pnpm install
   ```

## Running the Project
### **3. Run the Backend**
The backend uses **Apollo Server v4**, **Express**, and **MongoDB**. It downloads and imports initial earthquake data from a **CSV file** into MongoDB.

To start the backend, run the following command from the **backend** directory:
   ```bash
    pnpm run serve
   ```
This will run the backend on port _4000_. You can access the app by visiting _http://localhost:4000/graphql_.
Ensure **MongoDB** is running (locally or using **MongoDB Atlas**). The backend will perform **CRUD operations** on the earthquake data, with validations for **longitude, latitude, magnitude, and date**.
### **4. Run the Frontend**
The frontend uses **Next.js** and serve for UI components. It also communicates with the backend GraphQL API using **Apollo Client**.

To start the frontend, run the following command from the **frontend** directory:
   ```bash
    pnpm run serve
   ```
This will start the frontend on port _3000_. You can access the app by visiting _http://localhost:3000_.
