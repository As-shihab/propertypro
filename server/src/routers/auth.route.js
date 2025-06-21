const express = require('express');
const auth = express.Router();
const { verifyToken } = require('../helpers/jsonwebtoken');
const UserController = require('../controllers/UserController');
const userController = new UserController();

auth.get('/users', userController.getUsers);
auth.get('/users/:id', userController.getUserById);
auth.post('/create-user', userController.createUser);
auth.put('/users/:id', userController.updateUser);
auth.get('/logout', userController.logOut);
auth.post('/login', userController.login);

module.exports = auth;