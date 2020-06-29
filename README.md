# CCWCD Dashboard Map

> Please refer to the overview and instructions below prior to starting development on this project for the first time.

The CCWCD Dashboard web application was developed using the LRE Starter Kit. This starter kit represents a common structure for a web application and consists of backend API (server side) and frontend single page application (client side). The backend API that handles all of the data while the frontend is the actual application that the user interacts with in their web browser.

## Key Technologies Used

### Frontend

- **React** - A JavaScript library for building user interfaces (https://reactjs.org/)
- **Material UI** - A React component library for implementing Material Design (https://material-ui.com/)
- **Material Table** - A React component library for implementing robust Material Design Tables (https://material-table.com/)
- **Recharts** - A composable charting library built on React components. (https://recharts.org/en-US/)
- **Axios** - Promise based HTTP client for the browser and node.js (https://github.com/axios/axios)
- **Netlify** - Easy and cheap hosting platform used to host the application frontend. (https://www.netlify.com/)

### Backend

- **Node.js** - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. (https://nodejs.org/en/)
- **Express** - Fast, unopinionated, minimalist web framework for Node.js. (https://expressjs.com/)
- **PostgreSQL** - Open source relational database. (https://www.postgresql.org/)
- **Sequelize** - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. (https://sequelize.org/)
- **Axios** - Promise based HTTP client for the browser and node.js (https://github.com/axios/axios)
- **Heroku** - Easy and cheap hosting platform used to host the application backend. (https://heroku.com)

## Getting Started

To run this application locally or to start developing, clone this repository to you own machine. After you have the repository cloned to local machine, open in it up in your text editor of choice (my personal preference is VS Code (https://code.visualstudio.com/)). You will notice that there is a frontend and backend directory. In VS Code, open up a new terminal window by clicking on the terminal menu option and selecting `new terminal`.

### Install Frontend Dependencies

From the terminal, run `cd frontend && npm install`. This will navigate you into the frontend directory and install all of the project dependencies for the frontend application. If you see a message after install regarding vulnerabilities with the suggestion to run `npm audit fix`, take their advice and run `npm audit fix`.

### Install Backend Dependencies

From the terminal, navigate back to the root of the project by typing `cd ..` and hitting enter. Next, run `cd backend && npm install`. This will navigate you into the backend directory and install all of the project dependencies for the backend application. If you see a message after install regarding vulnerabilities with the suggestion to run `npm audit fix`, take their advice and run `npm audit fix`.

### Configure Environment Variables.

Now that all of the project dependencies are installed, you will need to create two new files to store some application environment variables. These files will be used to store sensitive information about our frontend and backend applications such as credentials and API keys. You will notice that there is a `.env.example` file in the root of the frontend and backend directories. Create a copy of each, renaming the files to `.env`.

Open up your new `.env` files and start replacing the `{POPULATE_ME}` placeholder values. If you are unsure of what values you should be filling in, please contact Ben Tyler at ben.tyler@lrewater.com.

You are now ready to start the application!

## Starting the Application

Congrats! Everything should be good to go at this point and you should be ready to start both the frontend and backend.

### Starting the Frontend

Navigate into the `frontend` directory and run `npm start`. This will boot up the application and will open up the application frontend in a new browser window at `localhost:3000`. The application will automatically reload any time you make changes to a file. For more information about how the local development environment works, please refer to the Create React App docs at https://create-react-app.dev/.

### Starting the Backend

Navigate into the `backend` directory and run `npm run dev`. This will boot up the application and start it running on `localhost:3005`. The application will automatically reload any time you make changes to a file.

## Publishing Changes and Deploying the Application

This application relies on Git and Github for version control. To publish changes to the application, commit your changes with a helpful commit message and then push the commit. Easy as that!

### Deploying the Frontend

The application frontend is hosted on Netlify (https://www.netlify.com/) which makes hosting and deploying an application about as easy as it can be. Changes to the frontend are automatically redeployed whenever a commit is pushed to the Github repository. No additional work required.

### Deploying the Backend

The application backend is hosted on Heroku (https://heroku.com). After making your changes to the backend application, commit your changes with a helpful commit message and then push the commit. Next, open up a new terminal and navigate into the root of the backend directory and run the following command:

`git subtree push --prefix backend/ heroku master`

This will kick off a deploy. All you need to do at this point is sit back and wait for the re-deploy to complete.
