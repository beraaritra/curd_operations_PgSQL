const request = require('supertest');
const app = require('../server'); // Make sure you have a proper import for the Express app
const sequelize = require('../config/db'); // Correct the path if needed
const User = require('../models/userModel'); // Ensure this points to the correct model

describe('User API', () => {
  // Reset database before all tests
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Clean up after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  // Test POST /api/users/create
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users/create')
      .send({
        name: 'Aritra Bera',
        email: 'aritrabera69@gmail..com',
        address: 'Baishnab Chak, Purba Medinipur, 721158',
        gender: 'male',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
  });

  // Test GET /api/users/read
  it('should return all users', async () => {
    const response = await request(app).get('/api/users/read');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /api/users/:id
  it('should get a user by ID', async () => {
    const user = await User.create({
      name: 'Aritra Bera',
      email: 'aritrabera69@gmail..com',
      address: 'Baishnab Chak, Purba Medinipur, 721158',
      gender: 'male',
    });

    const response = await request(app).get(`/api/users/read/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Jane Doe');
  });

  // Test PUT /api/users/update/:id
  it('should update a user by ID', async () => {
    const user = await User.create({
      name: 'Aritra Bera',
      email: 'aritrabera67@gmail..com',
      address: 'Baishnab Chak, Purba Medinipur, 721158',
      gender: 'male',
    });

    const response = await request(app)
      .put(`/api/users/update/${user.id}`)
      .send({
        name: 'Samuel Doe',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Samuel Doe');
  });

  // Test DELETE /api/users/delete/:id
  it('should delete a user by ID', async () => {
    const user = await User.create({
      name: 'Aritra Bera',
      email: 'aritrabera67@gmail..com',
      address: 'Baishnab Chak, Purba Medinipur, 721158',
      gender: 'male',
    });

    const response = await request(app).delete(`/api/users/delete/${user.id}`);

    expect(response.status).toBe(204);

    // Check if the user was really deleted
    const checkResponse = await request(app).get(`/api/users/${user.id}`);
    expect(checkResponse.status).toBe(404);
  });
});
