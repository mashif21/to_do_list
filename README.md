# Getting Started with To Do List App
> Todo list where user can create list of todo, view and note as completed

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Run In Local (Mac)

In the project directory, you need to install package files and can run:

### `npm run start` or `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# To Run in Production (Cloud)
  We have deployment script in file deploy.sh 
  Through that script it is going to execute aws s3 sync which will bundle and upload our app to aws s3 bucket and deliver page using cloud front
  We will be following semantic versioning for deployment which we can get using the command ~ git describe
  If we have any development channel like slack we using notify post deployment information using curl command webhook


### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### Overall Approach

# Code Structure
   In this project code is basically organised using a domain manner
   
# Below are the domanis and its features (Modular pattern)
  - API = Handles all actions related to api transactions and updating redux store
  - Auth = Handles flow for user authentication
  - To Do List = Handles all component and flow needed for todo list page and details page
  - Users - Handles flow for users data
 
# Componenets and other elements
  - Basic routing configurations are handled in router.js and components/App.js
  - All the public routes pages are under components folders
  - Basic app headers and primary menu are unders elements folder

# Design Pattern
  Followed flux architecture using redux store. (Observer pattern to catch application state changes)
  Followed modular design pattern to categorize code based its function
  Followed facade design patterm for basic structure components

### Features i have completed
  - Register new user / Login flow
  - Create / Update todo list
  - View created list / Filter list based on completed status / Delete it
  - Can view user information (Email/name/age)  

### What else i would have liked to complete and how long it would have taken
  - User data update / Profile pic update 
  - UI Improvements and responsiveness
  - Pagination in to do list  
  - Test cases
    Time needed for the above mentioned features are around 6 hours.
    I Can even finish it quicker but i believe quality is more important than quantity


### What i would like to complete to make this application more robust
  - Implementing secure cookie storage for authentication token and getting it from there
  - Redux persist storage
  - Drag and drop feature to align card position
  - UI Improvements and responsive
  - Analytics and funneling features
  - Test cases to verify stableness 
  


