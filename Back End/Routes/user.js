const express = require('express');
const user = require('../Controllers/user');
const validator = require('../utilles/validaitor/user')
const router = express.Router()
const upload = require('../utilles/handelImages')
const Auth = require('../Controllers/Auth')
router.route('/')
    .get(Auth.checkAuthAdmin, user.getAllUsers)
    .post(Auth.checkAuthAdmin, upload.single('image'), validator.createUserValidation, user.createUser)

router.route('/:id')
    .get(Auth.checkAuthAdmin, validator.getProudctValidation, user.getUserById)
    .put(Auth.checkAuthAdmin, upload.single('image'), validator.updateProudctValidation, user.updateUser)
    .delete(Auth.checkAuthAdmin, validator.deleteUserValidation, user.deleteUser)


module.exports = router