const { body, param, validationResult } = require('express-validator');

const error = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
    next()
}
//post validaition
exports.createCatagoryValidation =
    [
        body('name').isString().notEmpty().withMessage('Catagory Name is Require')
            .isLength({ min: 5 }).withMessage("Catagory Name is too short")
            .isLength({ max: 20 }).withMessage("Catagory Name is too long"),
        error
    ]

// get validation
exports.getCatagoryValidation =
    [
        body('name').isString().notEmpty().withMessage('Catagory Name is Require')
            .isLength({ min: 5 }).withMessage("Catagory Name is too short")
            .isLength({ max: 20 }).withMessage("Catagory Name is too long"),
        error
    ]

// update validation
exports.updateCatagoryValidation =
    [
        param('id').notEmpty().withMessage('ID is Require').isLength({ min: 5 }).withMessage('too short'),
        body('name').isString().notEmpty().withMessage('Catagory Name is Require')
            .isLength({ min: 5 }).withMessage("Catagory Name is too short")
            .isLength({ max: 20 }).withMessage("Catagory Name is too long"),
        error
    ]
// Delete validation
exports.deleteCatagoryValidation =
    [
        param('id').isMongoId().notEmpty().withMessage('Catagory ID is Require'),
        error
    ]

