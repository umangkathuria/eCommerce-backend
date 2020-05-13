# eCommerce-backend

This is a sample project for backend implementation for a eCommerce website. 
This project exposes 4 APIs-

- /api/login : To perform login operation
- /api/prod : API to fetch all the products from backend
- /api/{username}/addToCart : API to add product to a cart  
- /api/{username}/cart/{cartId} : API endpoint to show cart for a username

## Get Started

To get started, clone the project and add a .env file with following data- 

```
SERVER_PORT=3000
SERVER_HOST=localhost
AUTH_KEY = secret

```
Port and host are the configuration for server
Auth key contains the secret key for JWT Authentication


Also, a sample database is also added in the repository which is a relational DB based on SQLITE. 
