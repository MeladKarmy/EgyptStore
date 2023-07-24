const express = require('express');
const subCatagory = require('../Controllers/subCatagory');
const validator = require('../utilles/validaitor/subCatagory')
const router = express.Router()
const upload = require('../utilles/handelImages');
const Auth = require('../Controllers/Auth')


router.route('/')
    .get(Auth.checkAuthClient, subCatagory.getAllSubCatagory)
    .post(Auth.checkAuthAdmin, upload.single('image'), validator.createSubCatagoryValidation, subCatagory.createSubCatagory)
router.route('/:id')
    .get(Auth.checkAuthClient, validator.getSubCatagoryValidation, subCatagory.getSubCatagoryById)
    .put(Auth.checkAuthAdmin, upload.single('image'), validator.updateSubCatagoryValidation, subCatagory.updateSubCatagory)
    .delete(Auth.checkAuthAdmin, validator.deleteSubCatagoryValidation, subCatagory.deleteSubCatagory)
module.exports = router