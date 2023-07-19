const express = require('express')
const Auth = require('../Controllers/Auth')
const validator = require('../utilles/Auth')
const router = express.Router()
const upload = require('../utilles/handelImages');


router.route('/login/')
    .post(validator.loginValidation, Auth.login)
router.route('/signup/')
    .post(upload.single('image'), validator.signUpValidation, Auth.signUp)

module.exports = router