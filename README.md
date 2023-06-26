# Find Naija API

Find Naija API is a capstone project developed by AltSchool Africa. It is built using TypeScript and Express, running on Node.js. The API provides endpoints for searching regions, states, and LGAs (Local Government Areas) in Nigeria.

 **Table of Contents**
- Introduction
- API Endpoints
- Getting Started
- Authentication
- Error Handling
- Pagination
- Sorting
- Filtering.
- 
# Introduction
The Find Naija API allows users to retrieve information about regions, states, and LGAs in Nigeria. It provides various endpoints to facilitate searching and retrieving data. The API is implemented using Express and TypeScript, and it communicates with a MongoDB database.

## API Endpoints
# Search
**Get all regions**
- URL: /api/search/regions
- Method: GET
- Description: Retrieves a list of all regions in Nigeria.
- Authorization: Requires an API key (X-API-KEY header).

  
**Get states by region**
  
- URL: /api/search/state-by-region/{region}
- Method: GET
- Description: Retrieves a list of states in the specified region.
- Parameters:
- region (path parameter): The name of the region.
- Authorization: Requires an API key (X-API-KEY header).
  
**Get LGAs by state**
- URL: /api/search/lga-by-state/{state}
- Method: GET
- Description: Retrieves a list of LGAs in the specified state.
- Parameters:
- state (path parameter): The name of the state.
- Authorization: Requires an API key (X-API-KEY header).

  
**Get all states with pagination**
- URL: /api/search/states
- Method: GET
- Description: Retrieves all states with pagination support.
- Parameters:
- sortBy (query parameter, optional): Sort states by field(s) (comma-separated). Use "-" prefix for descending order.
- fields (query parameter, optional): Specify fields to include (comma-separated).
- Authorization: Requires an API key (X-API-KEY header).

  
**Get information about a specific state**
- URL: /api/search/state/{state}
- Method: GET
- Description: Retrieves information about a specific state.
- Parameters:
- state (path parameter): The name of the state.
- Authorization: Requires an API key (X-API-KEY header).

  
**Get all LGAs with pagination, sorting, and filtering**
- URL: /api/search/lgas
- Method: GET
- Description: Retrieves all LGAs with pagination, sorting, and filtering support.
- Parameters:
- page (query parameter, optional): The page number for pagination.
- perPage (query parameter, optional): The number of items per page for pagination.
- sortBy (query parameter, optional): Sort LGAs by field(s) (comma-separated). Use "-" prefix for descending order.
- filter (query parameter, optional): Filter LGAs by name (case-insensitive).
- Authorization: Requires an API key (X-API-KEY header).

  
**Get information about a specific LGA**
- URL: /api/search/lgas/{lga}
- Method: GET
- Description: Retrieves information about a specific LGA.
- Parameters:
- lga (path parameter): The name of the LGA.
- Authorization: Requires an API key (X-API-KEY header).

## Getting Started
To get started with the Find Naija API, follow these steps:

# Features

- **Search**: Retrieve information about regions, states, and LGAs in Nigeria.
- **Authorization**: Secure API endpoints using an API key (`X-API-KEY` header).

# Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)

# Installation and Usage

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

## Authentication
To access the Find Naija API, authentication is required. Include your API key in the request headers using the X-API-KEY field.
         ```shell
          X-API-KEY: your-api-key

## Error Handling
The API follows a consistent error handling approach. Errors are returned as JSON objects with the following structure:
      ```shell
      {
        "status": "error",
        "statusCode": 404,
        "message": "Resource not found"
      }
   
## Pagination
The API supports pagination for certain endpoints. The following query parameters can be used to control pagination:

page (optional): The page number to retrieve (default: 1).
perPage (optional): The number of items per page (default: 10).     
   ```shell
   /api/search/lgas?page=2&perPage=20

This will retrieve the second page of LGAs with 20 items per page.

P.S- Save your key and protect it safely.
## Sorting
Sorting is supported for endpoints that return lists of items. To specify the sorting order, use the sortBy query parameter.
```shell
/api/search/states?sortBy=name,-population

This will sort the states by name in ascending order, and then by population in descending order.

## Filtering
Filtering is supported for endpoints that return lists of items. To filter the results, use the filter query parameter.
```shell
/api/search/lgas?filter=lagos

## Contact
If you have any questions or feedback regarding the project, feel free to reach out to:

Name: Gosent Michael
Email: godsentpaulyerobiri@gmail.com
GitHub: godsentmichael



