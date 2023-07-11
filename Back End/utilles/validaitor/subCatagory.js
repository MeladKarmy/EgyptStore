const { body, param, validationResult } = require('express-validator');

exports.createSubCatagoryValidation =
    [
        body('name').notEmpty().isString().withMessage('subCatagory Is Require')
            .isLength({ min: 5 }).withMessage('Catagory Name is too short').isLength({ max: 20 })
            .withMessage('Catagory Name is too long'),
        body('catagory').isMongoId().withMessage('ID Is not ObjectId').notEmpty()
            .withMessage('subCatagory must be belong to Catagory'),
        (req, res, next) => {
            let error = validationResult(req);
            if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
            next()
        }
    ]
exports.getSubCatagoryValidation =
    [
        param('id').notEmpty().withMessage('subCatagory ID Is Require')
            .isMongoId().withMessage('subCatagory ID Is ObjectId'),
        (req, res, next) => {
            let error = validationResult(req);
            if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
            next()
        }
    ]
exports.updateSubCatagoryValidation =
    [
        param('id').notEmpty().withMessage('subCatagory ID Is Require')
            .isMongoId().withMessage('subCatagory ID Is ObjectId'),
        body('name').notEmpty().isString().withMessage('subCatagory Is Require')
            .isLength({ min: 5 }).withMessage('Catagory Name is too short').isLength({ max: 20 })
            .withMessage('Catagory Name is too long'),
        body('catagory').isMongoId().withMessage('ID Is not ObjectId').notEmpty()
            .withMessage('subCatagory must be belong to Catagory'),
        (req, res, next) => {
            let error = validationResult(req);
            if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
            next()
        }
    ]
exports.deleteSubCatagoryValidation =
    [
        param('id').notEmpty().withMessage('subCatagory ID Is Require')
            .isMongoId().withMessage('subCatagory ID Is ObjectId'),
        (req, res, next) => {
            let error = validationResult(req);
            if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
            next()
        }
    ]