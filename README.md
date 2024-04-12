# Health Wealth

## Description
Health Wealth is a medical and financial technology project that aims to give users accurate predictons on cardiovascular risk and budget requirements. It is designed for ECE493, the Computer Engineering Software Capstone Course at the Univerity of Alberta.

## Deployment Instructions
Deploying Health Wealth in requires 3 terminals to contain the model interface, express application, and react app.

Below the steps to from clone to deploy are shown. Steps are done assuming that Python3.8 is installed as well as node 21.7.1.

The following instructions assume the project is being deployed on a Linux/Mac OS system. 

### Environment Setup
1. **Clone the Repository:** 
   ```bash
   git clone https://github.com/yihe2/ECE-493-Capstone-.git
   ```
   
2. **Create .env variables** 
Assuming you are starting in outside the application run the following:
    ```bash
    $ cd ECE-493-Capstone-/express-app
    $ touch .env
    ```

Add the following variables within the newly created .env file. 
    ```bash
    API_KEY=mlsn.54b8c8077a4da4e83d3dc3b3a35fa73c728d053a6dfccb5d86afa7f5c4d73f97
    EMAIL=info@trial-ynrw7gyqer242k8e.mlsender.net
    SERVER_CERT=<ABSOLUTE_PATH_TO>/express-app/server.cert
    SERVER_KEY=<ABSOLUTE_PATH_TO>/express-app/server.key
    ```

### Disease Prediction Setup
1. **Run the follwing commands from the project root to set up virtual environment in the correct Repo.**
    ```bash
    $ cd Disease\ Prediction\ Model/
    $ Python3 -m venv venv
    $ source venv/bin/activate
    ```

2. **Install all pip packages with the following commands** 
    ```bash
    $ pip install -r requirements.txt
    ```

3. **Run the Following command to begin the Flask service** 
    Assuming the previous packages installed with no errors, run the following command to deploy the microservice. 
   ```bash
   $ Python3 app.py
   ```

### Express App Setup
1. **Run the following commands from the root directoru to set install the node packages for the express application**
    ```bash
    $ cd express-app
    $ npm i
    ```

2. **Run the Following command to deploy the Express Application** 
    ```bash
    $ node app.js
    ```

    Once the messages of `DB Connection Successful from authroutes` and `DB Connection Successful` appear in the terminal the backend has been deployed.
### React App Setup
1. **Run the follwing commands from the project root to install needed packages for the front end.**
    ```bash
    $ cd front-end/health-yeah/
    $ npm i
    ```
2. **Run the following command to deploy the react applcation on 127.0.0.1:3000** 
    ```bash
    $ npm run start
    ```

At this point the application has been deployed and a login page should be available at http://localhost:3000/

## User Guide
Health Wealth is straightforward to use once deployed. Connect to http://localhost:3000/. 

From here, user functionality described in the SRS is available. Our system is secure and information sent to mongoDB is encrypted. However, it is not advisable to input sensitive personal information into our application at the prototype phase. False information for purpose of inference will suffice. 

## Test Instructions
Our tests are located within the modules they test. This was done to emulate a distrubuted production environment. Run the following commands to execute the automated unit tests from the root directory assuming needed services are running:

1. Flask Tests
It is assumed the venv is active with all needed packages. 
    ```bash
    $ cd Disease\ Prediction\ Model/
    $ Python3 -m coverage run --branch -m unittest test_flask_app.py
    ```
2. Model Tests
It is assumed that all needed packages are installed.
    ```bash
    $ cd Disease\ Prediction\ Model/
    $ Python3 -m coverage run --branch -m unittest test_model_interface.py
    ```
3. Express Tests
It is assumed that all needed packages are installed.
    ```bash
    $ cd express-app
    $ npm test mongo.test.js
    ```

## Known Issues

There are two know issues within our code that may impact a users ability to interact with the system to the fullest extent. 

1. Email service: The email service of the application is working and has been tested. We have hit the unique domain limit for the number of email addresses we can send to on a free tier account. An error should appear in the express terminal upon new account creation outlining this exception. Our team can provide a paper trail of signup with a known email or provide a live demonstration of this feature if needed. 
- Refresh required after prediction: After a prediction is generated a user may be unable to save their information to the database. This is a frontend issue but we are unsure on the solution. A workaround is to refresh the application and input the updated financial/health information.

If you encounter any issues not listed here, please report them to our team for future fixes. 

## Contributors
- [Yihe Wang](https://github.com/yihe2)
- [Arjun Mehta](https://github.com/ArjunMehta01)
- [Saif Husnain](https://github.com/2Bronze)
