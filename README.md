# Health Wealth

## Description
[Project Name] is a [brief description of the project]. It is designed to [explain its purpose and functionality]. This project [aims to solve/addresses] [specific problem or need].

## Deployment Instructions
Deploying Health Wealth in requires 3 terminals to contain the model interface, express application, and react app.

Below the steps to from clone to deploy are shown. 

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


3. **Configure Environment Variables:** 
   Copy the `.env.example` file to `.env` and fill in the necessary environment variables.

4. **Run the Application:** 
   ```bash
   npm start
   ```

5. **Access the Application:** 
   Once the application is running, you can access it at `http://localhost:3000` (or any other specified port).

## User Guide
[Project Name] is straightforward to use. Here are the main functionalities:

- [Functionality 1]: [Description of how to use it]
- [Functionality 2]: [Description of how to use it]
- [Functionality 3]: [Description of how to use it]

Below are some usage examples:

1. **Example 1:** [Describe the scenario and steps to perform]
2. **Example 2:** [Describe the scenario and steps to perform]
3. **Example 3:** [Describe the scenario and steps to perform]

## Known Issues
- [Issue 1]: [Description of the issue]
- [Issue 2]: [Description of the issue]
- [Issue 3]: [Description of the issue]

If you encounter any issues not listed here, please report them in the issue tracker.

## Contributors
- [Contributor 1](https://github.com/contributor1)
- [Contributor 2](https://github.com/contributor2)

## License
This project is licensed under the [License Name]. See the [LICENSE](LICENSE) file for details.
