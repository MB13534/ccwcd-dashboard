# Getting Started

The Starterkit is setup as a Github Template Repository. This makes it super easy to create a new repository using the Starterkit as starting point. To get started, login to Github with the LRE account (credentials are in the server inventory workbook. After logging in, use the interface to create a new repository. When filling out the form to create a new repository, you will notice that there is a section called "Repository Template." Select "lrewater/lre-starterkit" from the dropdown menu and continue filling out the form. At the end you will be asked if you want the new repository to be public or private, make sure to select private.

Next, you will need to clone the new repository to your local machine using Github Desktop. If you are not familiar with Git, Github, how to clone a repository, or run into any issues please contact Ben Tyler.

## Installing Dependencies

The Starterkit relies on node package manager (npm) to manage and install all of the required dependencies for the project. The first step is to install all of our application dependencies for both the application frontend and backend. After you have the repository cloned open in it up in your text editor of choice (my personal preference is VS Code (https://code.visualstudio.com/)). You will notice that there is a frontend and backend directory. In VS Code, open up a new terminal window by clicking on the terminal menu option and selecting `new terminal`.

### Install Frontend Dependencies

Navigate into to the frontend directory by typing `cd frontend` and then type `npm install`. This will install all of the project dependencies for the frontend application.

### Install Backend Dependencies
Next, in the terminal navigate into the backend directory and install the project dependencies by typing `npm install`.
