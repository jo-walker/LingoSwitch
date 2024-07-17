# LingoSwitch
The project aims to create a multi-language, dynamic web application with a centralized system for managing UI strings. This approach not only improves maintainability and scalability but also enhances the user experience by providing seamless language switching capabilities.

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
* GET /api/strings: Retrieve strings
* POST /api/strings: Add a new string

#### Usage example
* GET request:
```curl http://localhost:5000/api/strings?language=en&url=/home 
```
* POST request: 
```curl -X POST -H "Content-Type: application/json" -d '{"value":"Hello World","language":"en","urls":["/home"]}' http://localhost:5000/api/strings
```
## Efficieny of the code
## UI Design
* better layout/design
* responsiveness
* angular material for css

## Security 
* implement env vars for sensitive info
* deploy over https
* use authentication and authorization
// Example: Using environment variables
require('dotenv').config();
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

