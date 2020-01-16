# Deploying

### Deploying the Frontend
We will use the service [Netlify](https://www.netlify.com/) to host the application frontend. Netlify is an awesome hosting provider that makes hosting static sites a breeze. You can connect a Github repo to their services and anytime updates are pushed to the repo, Netlify will automatically deploy your updated site.

To host a site on Netlify navigate to [https://www.netlify.com/](https://www.netlify.com/) and login using the credentials found in the Service Passwords tab of the Cloud Server Inventory Google Sheet. After logging in, you will be redirected to the account dashboard. Click on "New Site from Git". On the next page, click on the Github icon and select the repository that you would like to deploy to Netlify. On the next screen click "Deploy Site."

This first deploy will not work because we need to setup some custom settings. On the next screen, click on "Site Settings". Find where it says "Change Site Name". Change your site name to something reasonable and save your changes. Then in the sidebar click on the "Build and Deploy" section. Next click on "Edit Settings" in the Build Settings section and fill out the settings as follows. For Base Directory enter "frontend", for Build Command enter "npm run-script build", and for Publish Directory enter "build". Save your changes.

The last step will be setting up our environment variables. When we started developing locally we had to create the .env file for storing sensitive information like our credentials. Because the .env file is not included as part of the repository, we will have to setup these environment variables in the Netlify environment as well. Click on "Environment" in the Build and Deploy sidebar menu and then click "Edit Variables" in the Environment Variables section. Create a key/value pair for each variable that is present in the .env file that you have in the frontend directory on your local machine. The only differences will be the values for the "REACT_APP_LOGOUTURL" key, the "REACT_APP_ENVIRONMENT" key, and the "REACT_APP_ENDPOINT" key. For the logouturl key, set the value equal to whatever you renamed your Netlify site too. For the "REACT_APP_ENVIRONMENT" key, set the value equal to "production". We will return later to set the "REACT_APP_ENDPOINT" key after we have deployed the backend application. Click save.

### Deploying the Backend
We will use a service called Heroku to deploy the backend application. Navigate to [https://id.heroku.com/login](https://id.heroku.com/login) and login using the credentials found in the Service Passwords tab of the Cloud Server Inventory Google Sheet. After logging in you will be redirected to the Heroku Account Dashboard. Click on the button that says "New" and select "Create new app". On the next page, give your application a name and click "Create app".

Next, minimize your browser and open up a terminal. Type `heroku login`. This should open up a prompt that will let you login via the command line using the same credentials you used earlier. After you are logged in, type `ctrl + c` to kill the Heroku process that is running in your terminal. Navigate to the your project directory in the terminal (i.e cd Cd:/Documents/Github/REPO_NAME) and then run the `heroku git:remote -a YOUR_HEROKU_APP_NAME`. The last step to deploy the application to Heroku is to run `git subtree push --prefix backend heroku master`.

If the above steps completed successfully the last steps will be to configure the environment variables for the backend application in the Heroku Environment. Open up your application in the Heroku dashboard in your browser again and click on the application "Settings" tab. On the next page, click "Reveal Config Vars" and enter the environment variables as key/value pairs as they are found in the .env file in the backend directory on your local machine. The only key/value pairs that will be different from the ones in your local .env file is "ORIGIN". For this value, type in whatever the url is for the Netlify site you setup in the previous step.

Lastly, make note of the url of your Heroku application (you can find this by clicking the "Open App" button on your application dashboard) and then login back into Netlify and set the "REACT_APP_ENDPOINT" environment variable value equal to the Heroku Application URL.

You should now have a deployed frontend and backend application! Please contact Ben Tyler if run into any issues during this process.

### Error Tracking with Sentry

To setup error tracking on this project, please reach out to Ben Tyler


