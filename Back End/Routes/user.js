const express = require('express');
const user = require('../Controllers/user');
const validator = require('../utilles/validaitor/user')
const router = express.Router()
const upload = require('../utilles/handelImages')

router.route('/')
    .get(user.getAllUsers)
    .post(upload.single('image'), validator.createUserValidation, user.createUser)

router.route('/:id')
    .get(validator.getProudctValidation, user.getUserById)
    .put(upload.single('image'), validator.updateProudctValidation, user.updateUser)
    .delete(validator.deleteUserValidation, user.deleteUser)


module.exports = router