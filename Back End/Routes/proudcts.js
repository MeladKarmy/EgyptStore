const express = require('express');
const proudcts = require('../Controllers/proudcts');
const validator = require('../utilles/validaitor/proudcts')
const router = express.Router()
const upload = require('../utilles/handelImages');
const Auth = require('../Controllers/Auth')

router.route('/')
    .get(Auth.checkAuthClient, proudcts.getAllProudcts)
    .post(Auth.checkAuthAdmin, upload.any(), validator.createProudctValidation, proudcts.createProudct)
router.route('/:id')
    .get(Auth.checkAuthClient, validator.getProudctValidation, proudcts.getProudctsById)
    .put(Auth.checkAuthAdmin, upload.any(), validator.updateProudctValidation, proudcts.updateProudct)
    .delete(Auth.checkAuthAdmin, validator.deleteProudctValidation, proudcts.deleteProudct)


module.exports = router