# Project Title

This project consists of a web application built using Vite, React for the client-side, Express for the backend, and PostgreSQL with Sequelize for database management.

## Get Started

Follow these steps to run the project on your local machine after cloning:

### Prerequisites

- Node.js and npm: Make sure you have Node.js (v14 or later) and npm installed.

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/your-project.git
   cd your-project
   npm install
    ```


2. **Install dependencies:**

   # Install client dependencies
   ```sh
     cd client
     npm install
    ```

   # Install server dependencies and run migrations

   -make sure you have postgresql installed and running on your machine
 
   ```sh
     cd ../server
     npm install
     npx sequelize-cli db:migrate
    ```

3. **Run the application:**

  # Go to the root directory and run the application

  ```sh
     cd ../
     npm run dev
    ```



