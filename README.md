#  Article Management API

##  Introduction

This project is a simple and effective backend REST API for managing articles. It allows users to perform CRUD (Create, Read, Update, Delete) operations. The API is built using **Node.js**, **Express.js**, and **MySQL**.

---

##  Technologies Used

- **Node.js** – Server-side JavaScript runtime
- **Express.js** – Web framework for Node.js
- **MySQL** – Relational database management system
- **mysql2** – MySQL client for Node.js with promise support
- **dotenv** – Loads environment variables from `.env` file
- **VS Code REST Client** – For API testing directly within the editor

---

##  Project Implementation

- Initialized Node.js project with `npm init`.
- Installed required dependencies: `express`, `mysql2`, `cors`, and `dotenv`.
- Created Express server and connected it to MySQL database.
- Used `.env` file for storing secure DB credentials.
- Designed and created an `articles` table with appropriate fields.
- Implemented CRUD API endpoints:
  - `POST /articles` – Add a new article
  - `GET /articles` – Retrieve all articles
  - `GET /articles/:id` – Retrieve article by ID
  - `PUT /articles/:id` – Update status and rating
  - `DELETE /articles/:id` – Delete an article
- Tested all endpoints using REST Client inside Visual Studio Code.

---

##  API Endpoints

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| POST   | `/articles`      | Create a new article               |
| GET    | `/articles`      | Get all articles                   |
| GET    | `/articles/:id`  | Get article by ID                  |
| PUT    | `/articles/:id`  | Update article's rating and status|
| DELETE | `/articles/:id`  | Delete an article                  |

---

##  Database Setup

To set up the database, run the following SQL script:

```sql
CREATE DATABASE articles_db;

USE articles_db;

CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  author VARCHAR(255),
  status VARCHAR(50),
  rating FLOAT
);

---

##  Running the Server 
npm install

## Run the development server
npm run dev

---
