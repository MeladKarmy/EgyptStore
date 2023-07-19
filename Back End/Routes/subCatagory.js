const express = require('express');
const subCatagory = require('../Controllers/subCatagory');
const validator = require('../utilles/validaitor/subCatagory')
const router = express.Router()
const upload = require('../utilles/handelImages');


router.route('/')
    .get(subCatagory.getAllSubCatagory)
    .post(upload.single('image'), validator.createSubCatagoryValidation, subCatagory.createSubCatagory)
router.route('/:id')
    .get(validator.getSubCatagoryValidation, subCatagory.getSubCatagoryById)
    .delete(validator.deleteSubCatagoryValidation, subCatagory.deleteSubCatagory)
    .put(upload.single('image'), validator.updateSubCatagoryValidation, subCatagory.updateSubCatagory)


module.exports = router