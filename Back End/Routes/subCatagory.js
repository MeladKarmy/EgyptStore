const express = require('express');
const subCatagory = require('../Controllers/subCatagory');
const validator = require('../utilles/validaitor/subCatagory')
const router = express.Router()


router.route('/')
    .get(subCatagory.getAllSubCatagory)
    .post(validator.createSubCatagoryValidation, subCatagory.createSubCatagory)
router.route('/:id')
    .get(validator.getSubCatagoryValidation, subCatagory.getSubCatagoryById)
    .delete(validator.deleteSubCatagoryValidation, subCatagory.deleteSubCatagory)
    .put(validator.updateSubCatagoryValidation, subCatagory.updateSubCatagory)


module.exports = router