# Main Concepts

### Frontend
The frontend (client side) is the portion of the application that the user interacts with in their web browser. The frontend is a Single Page Application (SPA) meaning that the application load a single HTML page and dynamically updates that page as the user interacts with the app. This application is built using the populate framework React (https://reactjs.org/) and the popular themeing library Material-UI (https://material-ui.com/).

### Backend (API)
The backend (server side) handles all things data in our application and is built using Node.js and the framework Express. Express allows us to quickly spin up an API with endpoints for all of our data reading/writing needs. The backend of the application allows us to interface with our database and handles how the frontend can read/write/update/delete data from the database. For this example, we are using a PostgreSQL database and the node module Sequelize to interface with the database. Sequelize (http://docs.sequelizejs.com/) is ORM (object-relational mapper) that makes it very easy to perform CRUD operations and interface with any relational database (PostgreSQL, MySQL, MariaDB, SQLite and Microsoft SQL Server) through a Node.js application. The backend API is setup to serve as a good starting point for most use cases.



