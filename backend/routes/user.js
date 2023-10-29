const express = require('express');
const router = express.Router();
const { 
    registerUser,
    getUserProfile,
    loginUser,
    logoutUser,
    updatePassword,
} = require('../controllers/UserController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', isAuthenticatedUser, getUserProfile)
router.post('/logout', logoutUser);
router.put('/password/update', isAuthenticatedUser,  updatePassword);


module.exports = router;
