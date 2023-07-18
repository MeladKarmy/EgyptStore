const express = require('express')
const catagory = require('../Controllers/catagory')
const validator = require('../utilles/validaitor/catagory')
const router = express.Router()
const upload = require('../utilles/handelImages');


router.route('/')
    .get(catagory.getAllCatagory)
    .post(upload.single('image'), validator.createCatagoryValidation, catagory.createCatagory)
router.route('/:id')
    .get(validator.getCatagoryValidation, catagory.getById)
    .put(validator.updateCatagoryValidation, catagory.updateCatagory)
    .delete(validator.deleteCatagoryValidation, catagory.deleteById)


module.exports = router