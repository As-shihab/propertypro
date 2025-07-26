const express = require('express');
const auth = express.Router();
const { verifyToken } = require('../helpers/jsonwebtoken');
const UserController = require('../controllers/UserController');
const userController = new UserController();

auth.get('/users', userController.getUsers);
auth.post("/create-profile",  userController.createProfile);
auth.post('/create-user', userController.createUser);
auth.put('/users/:id', userController.updateUser);
auth.get('/logout', userController.logOut);
auth.post('/login', userController.login);
auth.post('/google-login', userController.googleLogin);


// get google client id 
auth.get('/google-client-id', (req, res) => {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    return res.status(500).json({ error: 'Google Client ID not configured' });
  }
  res.status(200).json({ googleClientId });
});
module.exports = auth;