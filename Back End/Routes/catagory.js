const express = require('express')
const catagory = require('../Controllers/catagory')
const validator = require('../utilles/validaitor/catagory')
const router = express.Router()
const upload = require('../utilles/handelImages');
const Auth = require('../Controllers/Auth')


router.route('/')
    .get(Auth.checkAuthClient, catagory.getAllCatagory)
    .post(Auth.checkAuthAdmin, upload.single('image'), validator.createCatagoryValidation, catagory.createCatagory)
router.route('/:id')
    .get(Auth.checkAuthClient, validator.getCatagoryValidation, catagory.getById)
    .put(Auth.checkAuthAdmin, upload.single('image'), validator.updateCatagoryValidation, catagory.updateCatagory)
    .delete(Auth.checkAuthAdmin, validator.deleteCatagoryValidation, catagory.deleteById)


module.exports = router