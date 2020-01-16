# Configure Environment Variables

Now that all of the project dependencies are installed, we need to create two new files. These files will be used to store sensitive data about our frontend and backend applications such as credentials and API keys. The majority of the information that will be stored in the `.env` files is related to the Identity-as-a-Service provider, Auth0, that we use to manage users and roles our applications. These files are not included as part of the repository initially because `.env` files and similar files that contain application credentials and other sensitive information should never be stored as part of the repository.

### Frontend Environment Variables

At the root of the frontend directory, create a new file called `.env` and paste in the following, changing the values in brackets to match the values for your Auth0 application.`,

```
REACT_APP_ENDPOINT=http://localhost:3005
REACT_APP_CLIENTID={CLIENTID}
REACT_APP_DOMAIN=lre-water.auth0.com
REACT_APP_AUDIENCE={AUTH0 BACKEND APPLICATION URL}
REACT_APP_LOGOUTURL=http://localhost:3000
REACT_APP_ENVIRONMENT=development
```

The `REACT_APP_CLIENTID` can be found in the settings tab of the frontend application on Auth0, while the `REACT_APP_AUDIENCE` value can be found under the settings tab of your backend application on Auth0.

### Backend Environment Variables

At the root of the backend directory, create a new file called `.env` and paste in the following, changing the values in brackets to match the values for your Auth0 application.`,

```
PG_USERNAME={DB USER}
PG_PASSWORD={DB PASSWORD}
PG_PORT=5432
PG_HOST='localhost'
PG_DATABASE={DB NAME}
AUTH0_DOMAIN=lre-water.auth0.com
AUDIENCE={AUTH0 BACKEND APPLICATION URL}
ORIGIN=http://localhost:3000
```

The `REACT_APP_CLIENTID` can be found in the settings tab of the frontend application on Auth0, while the `REACT_APP_AUDIENCE` value can be found under the settings tab of your backend application on Auth0. Update the `PG_USERNAME`, `PG_PASSWORD`, and `PG_DATABASE` values to match the database that you are using.
