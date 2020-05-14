# eCommerce-backend

This is a sample project for backend implementation for a eCommerce website. 
This project exposes 4 APIs-

- /api/login : To perform login operation
- /api/prod : API to fetch all the products from backend
- /api/{username}/addToCart : API to add product to a cart  
- /api/{username}/cart/{cartId} : API endpoint to show cart for a username

## Technology Stack
APIs- NodeJS, HapiJS
Database- Sqlite 

## Get Started

To get started, clone the project and add a .env file with following data- 

```
SERVER_PORT=3000
SERVER_HOST=localhost
AUTH_KEY = secret

```
Port and host are the configuration for server
Auth key contains the secret key for JWT Authentication

and then run th following to start the server- 
```
npm install
rpm start

```

Also, a sample database is also added in the repository which is a relational DB based on SQLITE. 


## Implementation Notes

#### Login API
- HTTP Method- POST
- Description: This API performs the User validation using two fields username and password and upon successful validation returns a JWT Token.  
- Input Body: {
username: "",
password: ""
}
- Username/Password are checked from stored values in Database which maintains a Users table.
- Sample response: 
    {
    status: "Ok",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODkzNzM0NzcsImV4cCI6MTU4OTM3NzA3N30.beW8Axi49YH_javPW08TQNzntbwbNBV7-6uQyzr25i4" // JWT Token string
    }
- Columns/Fields in Users table
  - id integer NOT NULL PRIMARY KEY
  - username text NOT NULL UNIQUE
  - password text NOT NULL
  - cart_id integer

#### Get All Products API
- HTTP Method- GET
- Description: This API performs a Select query on the existing products in the database and returns the list of products available in the response. 
- No authentication is needed for this API. 
- Sample response- 
``` javascript
{
    "result": [
        {
            "prod_id": 1,
            "name": "Nikon D103",
            "description": "Camera Description Sample",
            "price": 40000,
            "make": 2010
        },
        {
            "prod_id": 2,
            "name": "Nikon D5500",
            "description": "Camera Description Sample",
            "price": 35000,
            "make": 2015
        }
    ]
}
```
- SQL Table fields
  - prod_id integer PRIMARY KEY
  - name text NOT NULL
  - description text NOT NULL
  - price REAL NOT NULL
  - make INTEGER NOT NULL
