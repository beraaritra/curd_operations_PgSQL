const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.Routes');
const sequelize = require('./config/db');
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const colors = require('colors');


const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

PORT = 8000;

// Load Swagger YAML file
const swaggerDocument = yaml.load('./swagger/swagger.yaml');

// Swagger API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Use user routes
app.use('/api/users', userRoutes);

(async () => {
    try {
        await sequelize.sync();
        app.listen(8000, () => {
            console.log(`Server is running on port ${PORT}`.bgBlue);
            console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`.bgMagenta);
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
    }
})();


module.exports = app;  // Export app for testing
