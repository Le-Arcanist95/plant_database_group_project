// This file contains the allowed origins for the CORS policy
const allowedOrigins = [
    'http://localhost:3000', // React dev server
    'htttps://plant-database-group-project.herokuapp.com', // Heroku deployment
    'https://trefle.io', // Trefle API
    'http://127.0.0.1:3000', // VS Code Live Server
];

module.exports = allowedOrigins;