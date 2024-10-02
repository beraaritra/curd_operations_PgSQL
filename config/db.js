const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'aritra007bera', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

const connections = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!'.bgGreen);
    } catch (error) {
        console.error('Unable to connect to the database:'.bgRed, error);
    }
}

connections();
module.exports = sequelize;
