const admin = require('express').Router();
const UserController = require('../controllers/UserController');
const user = new UserController();
// Users
admin.get('/users', user.getUsers);
admin.get('/users/:id', user.getUserById);
admin.post('/users', user.createUser);
admin.put('/users/:id', user.updateUser);








module.exports = admin;
