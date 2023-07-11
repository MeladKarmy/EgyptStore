const express = require('express');
const proudcts = require('../Controllers/proudcts');
const validator = require('../utilles/validaitor/proudcts')
const router = express.Router()


router.route('/')
    .get(proudcts.getAllProudcts)
    .post(validator.createProudctValidation, proudcts.createProudct)
router.route('/:id')
    .get(validator.getProudctValidation, proudcts.getProudctsById)
    .put(validator.updateProudctValidation, proudcts.updateProudct)
    .delete(validator.deleteProudctValidation, proudcts.deleteProudct)


module.exports = router