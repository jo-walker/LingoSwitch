# LingoSwitch

The project aims to create a multi-language, dynamic web application with a centralized system for managing UI strings. This approach not only improves maintainability and scalability but also enhances the user experience by providing seamless language switching capabilities.
## Features

- Add new strings with associated language and URLs.
- View a list of all strings with their details.
- Manage strings (add, update, mark as deleted).

## Technologies Used

- **Frontend**: Angular 17, Angular Material
- **Backend**: Node.js 20, Express.js
- **Database**: MongoDB
- **Styling**: Angular Material, CSS

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Angular CLI

## Setup Instuction:

1. Clone repo
   ```bash
   git clone https://github.com/jo-walker/LingoSwitch.git
   ```
2. Navigate to server dir and install dependencies:
   ```
   cd server
   npm install
   ```
3. start the server
   ```
   node app.js
   ```
4. navigate to the client dir and install dependencies:
   ```
   cd ../client
   npm install
   ```
5. start the Angular application
   ```
   ng serve
   ```

## API Documentation:

### Endpoints
1. Get all strings:`GET /api/strings`
URL: /api/strings
Method: GET
Description: Retrieve all strings from the database.

2. Add a new string:`POST /api/strings`
URL: /api/strings
Method: POST
Description: Add a new string to the database.
Request Body:
{
  "value": "Hello World",
  "language": "en",
  "urls": ["/home"]
}


## Screenshots
### Web UI
![Web UI](./server/screenshots/webui.png)
### Postman GET request
![Postman GET Request](./server/screenshots/postmangetrequest.png)

### Postman POST Request
![Postman POST Request](./server/screenshots/postmanpostrequest.png)
- better layout/design
- responsiveness
- angular material for css

##Meeting Project Requirements

1. Database Structure

- MongoDB is used to store strings with keys, values, languages, and URLs.
- Schema is defined in server/models/String.js.

2. Coding Style
- Followed JavaScript and Angular style guides.
- Used ESLint and Prettier for code formatting.

3. Error Handling
- Implemented error handling in Express routes.
- Frontend displays error messages using Angular Material Snackbar.

4. Documentation of Code
- Code is well-documented with comments explaining functionality.
- README.md provides comprehensive setup and usage instructions.

5. Efficiency of Code
- Used Mongoose for efficient database interactions.
- Optimized Angular components for performance.

6. UI Design
- Used Angular Material for a consistent and responsive design.
- Form and list views are styled for clarity and usability.

7. Use of GitHub

- Code is hosted on GitHub with proper commit messages.
- Project can be cloned and run as described in the README.

8. Security
- Used Helmet, xss-clean, and express-mongo-sanitize to enhance security.
- Validated inputs to prevent common vulnerabilities.
- Implemented env vars for sensitive info

## Contributing
Feel free to open issues or submit pull requests for any improvements or bug fixes.

