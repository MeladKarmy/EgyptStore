const express = require('express');
const user = require('../Controllers/user');
const validator = require('../utilles/validaitor/user')
const router = express.Router()


router.route('/')
    .get(user.getAllUsers)
    .post(validator.createUserValidation, user.createUser)

router.route('/:id')
    .get(validator.getProudctValidation, user.getUserById)
    .put(validator.updateProudctValidation, user.updateUser)
    .delete(validator.deleteUserValidation, user.deleteUser)


module.exports = router