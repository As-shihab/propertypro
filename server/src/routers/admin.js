const admin = require('express').Router();
const UserController = require('../controllers/UserController');
const user = new UserController();
// Users
admin.get('/users', user.getUsers);
// admin.get('/users/:id', user.getUserById);
admin.post('/users', user.createUser);
// admin.put('/users/:id', user.updateUser);
admin.get('/user/logout',user.logOut)
admin.post('/users/login', user.login);

module.exports = admin;                        