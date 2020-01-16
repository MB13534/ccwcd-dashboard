# Authentication Setup

Now that all of the project dependencies are installed, we need to setup a authentication and authorization using the Identity-as-a-Service provider Auth0.

## Setting up the Frontend application on Auth0

Navigate to https://auth0.com/ and login using the LRE credentials found in the "services" tab of the Server Inventory Google Sheet. Once logged in, click the large button that reads "Create Application." This will open up a modal window where you will want to give your application a name and select "Single Page Web Applications." Then click "Create."

After creating the application, you will be redirected to the settings page for your new app. Click on the "Settings" tab and add these values to the following sections and save your changes:

* in the `Allowed Callack URLs` section add `http://localhost:3000,http://localhost:3000/callback`
* in the `Allowed Web Origins` section add `http://localhost:3000`
* in the `Allowed Logout URLs` section add `http://localhost:3000`

## Setting up the Backend application on Auth0

Return to the Auth0 Dashboard and select "APIs" from the sidebar. Once on that page click the large button that reads "Create API." This will open up a modal window where you will want to give your application a name, an Identifier, and a signing algorithm. You can leave the signing algorithm as RS256. Then click "Create."

## Configure Users and Roles for the Applications

### Create your own account

From the Auth0 Dashboard, select the users page from the sidebar menu. Search the list to see if you already have a user setup for yourself. If you do not, click the "Create User" button and fill out the form to create a user for yourself.

### Create an admin role

From the Auth0 Dashboard, select the roles page from the sidebar menu. Create a new admin role for you application giving it a name that makes it clear which application it is associated with (i.e. Denver Water Admin).

### Assign User to Role

Select the role you just created and click on the users tab. Click the "Add User" button and select your user from the dropdown list and click "Assign."

### Assign Permissions

Auth0 allows us to define permissions that can be assigned to users and roles. Permissions allow us to be very granular with controlling what portions of the application each user/role have access to. The starterkit is setup to use permissions that are already setup with the LRE Auth0 account. These permissions are `read:list-tables` and `write:list-tables`. To assign these permissions select the new role you created and click on the "Permissions" tab. Next, click the "Add Permissions" button to assign the `read:list-tables` and `write:list-tables` permissions to the role.

Congrats! You have just completed setting up authorization.