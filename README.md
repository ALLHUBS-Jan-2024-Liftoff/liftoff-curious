# liftoff-curious (Project - Coders' Quiz)

Welcome to the GitHub repo of our project, where we build a hosted quiz application named 'Coders' Quiz.' This app offers quizzes on programming topics that users can play in a test-like environment and receive immediate feedback. This platform helps learners and developers reinforce their coding knowledge and evaluate specific coding skills—completely free and without the hassle of registration or login. An authenticated admin panel allows selected quizmasters to curate the question bank for the quizzes. A cloned version of this repo is hosted online: [https://quiz.codenil.online/](https://quiz.codenil.online/)

## Table of Contents
1. [Project Overview](#project-overview)
2. [Folder Structure](#folder-structure)
3. [UI (Frontend)](#ui-frontend)
4. [API (Backend)](#api-backend)
5. [Installation and Usage](#installation-and-usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Project Overview

The web application is built using React and Bootstrap for the frontend, and Java Spring Boot for the backend, with MySQL as the database. The project is structured to maintain clear separation between the UI and API components, ensuring ease of development and scalability. Additionally, the app includes a feature called 'Trivia,' which uses an external API to present short quizzes on various non-coding topics. The cloned repository is hosted online using Netlify (for frontend) and Heroku (for backend) with ClearDB (for the MySQL database).

## Folder Structure

- **quiz-ui/**: Contains the React front-end code.
- **quiz-api/**: Contains the Java Spring Boot back-end code.
- **.gitignore**: Contains the list of libraries and modules that are not uploaded in the repo.
- **README.md**: This file, providing an overview of the project and setup instructions.

## UI (Frontend)

The front-end of the application is built using React and Bootstrap. It features a modern, responsive design that ensures a great user experience across devices.

### Key Features:

- **Responsive Design**: The website, including the quiz environment, is fully responsive to mobile and other handheld devices.
- **Routing**: Managed with `react-router-dom`.
- **State Management**: Utilizes React's built-in state management, Context API, and browser local storage for authenticated user details.
- **Dark Mode Support**: Available only in the quiz environment (test environment) for distraction-free test-taking.
- **Text-to-Speech**: Users can read aloud the question text and answer options.
- **PDF Download**: Users can download the feedback of their quiz as a PDF file and keep records.
- **Email Sending**: Users can email (in HTML format, without attachments) a copy of the quiz feedback to themselves.

## API (Backend)

The back-end is powered by Java Spring Boot, providing robust and scalable RESTful API services. It connects to a MySQL database and handles all business logic through the controller files only (not using any backend service).

### Key Features:

- **Authentication**: Implements session-based authentication—this is only for admin users. To restrict the registration process to a selected group, we have implemented a secret code system required during registration, shared upon request.
- **Database**: MySQL database integration with Spring Data JPA - used for seamless database interactions.
- **RESTful APIs**: Clean and well-structured APIs for all application features.
- **CRUD Functionalities**: Manages topics, questions, user profiles, website comments/feedback (from the contact form), etc.

## Installation and Usage

### Prerequisites

- Node.js and npm (for UI)
- Java 17+ (for API)
- MySQL (for database)

### Steps

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/liftoff-curious.git
   cd liftoff-curious
   ```

2. **Setup MySQL**

    To use the schema name, username, and passwords as we have done, do the following step. 
    
    A. *Create a Database:*

    - Open MySQL Workbench and connect to your MySQL server (e.g., localhost at port 3306).
    - In the 'Schemas' tab, right-click and select 'Create Schema'.
    - Name the schema quiz and confirm the creation.
    
    B. *Create a User and Assign Privileges:*

    - Go to the 'Administration' tab, then 'Users & Privileges'.
    - Click 'Add Account' and fill in the details:
    - Login Name: quiz
    - Authentication Type: Standard
    - Limit to Hosts Matching: localhost
    - Password: quiz
    - Under 'Schema Privileges', add a new entry for the quiz schema.
    - Assign all privileges to the user for this schema and apply the changes.

    Or if you use your own custom credentials, be sure to update the following lines in your application.properties file (or equivalent configuration file): 

    ```
    spring.datasource.url=jdbc:mysql://localhost:3306/quiz
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
    Note: Replace your_username and your_password with the credentials you created.

3. **Navigate to the API directory and start the backend server:**

    ```
    cd quiz-api
    ./gradlew bootRun
    ```

4. **Navigate to the UI directory and start the frontend development server:**

    ```
    cd ../quiz-ui
    npm install
    npm start
    ```

5. **Access the application:**

    Frontend: http://localhost:3000
    Backend: http://localhost:8080

## Contributing

Contributions are welcome! Please fork the repository and create a pull request to propose changes.

## License

License details to be added soon
<!-- This project is licensed under the MIT License. See the LICENSE file for details. -->

## Contact

For questions or support, please reach out to [quizcoders@gmail.com](mailto:quizcoders@gmail.com).
