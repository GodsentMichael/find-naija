# Find Naija API

Find Naija API is a capstone project developed by AltSchool Africa. It is built using TypeScript and Express, running on Node.js. The API provides endpoints for searching regions, states, and LGAs (Local Government Areas) in Nigeria.

## Features

- **Search**: Retrieve information about regions, states, and LGAs in Nigeria.
- **Authorization**: Secure API endpoints using an API key (`X-API-KEY` header).

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation and Usage

1. Clone the repository:

   ```shell
   git clone https://github.com/godsentmichael/find-naija.git
2. Navigate to the project directory:
   ```shell
   cd find-naija
3. Install the dependencies/packages.
   ```shell
   npm install

4. Provide the following in your enviroment file.
   ```shell
   REDIS_USERNAME=<redis_username>
   REDIS_PORT=<redis_port>
   REDIS_HOST=<redis_host>
   REDIS_PASSWORD=<redis_password>
P.S- Replace <redis_username>, <redis_port>, <redis_host>, and <redis_password> with your Redis server configuration.

5. Start the server
   ```shell
   npm start
P.S- The server will start running on http://localhost:5050.

## API Documentation
The API is documented using Swagger. You can access the API documentation by navigating to http://localhost:5050/api-docs in your browser.

The documentation provides details about the available endpoints, request parameters, request bodies, and response schemas.

To access protected endpoints, make sure to include the X-API-KEY header with a valid API key.
This API Key is generated as soon as you sign up.
P.S- Save your key and protect it safely.

## Contact
If you have any questions or feedback regarding the project, feel free to reach out to:

Name: Gosent Michael
Email: godsentpaulyerobiri@gmail.com
GitHub: godsentmichael



