const { body, param, validationResult } = require('express-validator');

const error = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
    next()
}

exports.createUserValidation =
    [
        body('firstName').notEmpty().withMessage('First Name is Require').isString().withMessage('First Name must be String')
            .isLength({ min: 5 }).withMessage("First Name is too short")
            .isLength({ max: 15 }).withMessage("First Name is too long"),
        body('lastName').notEmpty().withMessage('Last Name is Require').isString().withMessage('Last Name must be String')
            .isLength({ min: 5 }).withMessage("Last Name is too short")
            .isLength({ max: 15 }).withMessage("Last Name is too long"),
        body('phone').notEmpty().withMessage('phone is Require').isMobilePhone("ar-EG").withMessage('phone number Invalid')
            .isLength({ min: 11 }).withMessage("phone number not correct")
            .isLength({ max: 11 }).withMessage("phone number not correct"),
        body('email').notEmpty().withMessage('Email is Require').isEmail().withMessage('Email invalid')
            .isLength({ min: 5 }).withMessage("Catagory Name is too short")
            .isLength({ max: 20 }).withMessage("Catagory Name is too long"),
        body("gender").notEmpty().withMessage("Gender is required"),
        body('password').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("description is too short"),
        body('configPass').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("description is too short").custom((configPass) => { }),
        body('status').notEmpty().withMessage('status is Require').isBoolean().withMessage('status is Boolean'),
        body('comments').optional().isObject(),
        body('payment').optional().isObject(),
        body('image').notEmpty().isString().withMessage('Image is Require'),
        error
    ]

// get validation
exports.getProudctValidation =
    [
        param('id').notEmpty().withMessage('ID is Require').isMongoId().withMessage('ID must be Object of 16 cherachters '),
        error
    ]

// update validation
exports.updateProudctValidation =
    [
        param('id').notEmpty().withMessage('ID is Require').isMongoId().withMessage('ID must be Object of 16 cherachters '),
        body('firstName').notEmpty().withMessage('First Name is Require').isString().withMessage('First Name must be String')
            .isLength({ min: 5 }).withMessage("First Name is too short")
            .isLength({ max: 15 }).withMessage("First Name is too long"),
        body('lastName').notEmpty().withMessage('Last Name is Require').isString().withMessage('Last Name must be String')
            .isLength({ min: 5 }).withMessage("Last Name is too short")
            .isLength({ max: 15 }).withMessage("Last Name is too long"),
        body('phone').notEmpty().withMessage('phone is Require').isMobilePhone("ar-EG").withMessage('phone number not correct')
            .isLength({ min: 11 }).withMessage("phone number not correct")
            .isLength({ max: 11 }).withMessage("phone number not correct"),
        body('email').notEmpty().withMessage('Email is Require').isEmail().withMessage('Email invalid')
            .isLength({ min: 5 }).withMessage("Catagory Name is too short")
            .isLength({ max: 20 }).withMessage("Catagory Name is too long"),
        body('password').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("description is too short"),
        body('status').notEmpty().withMessage('status is Require').isBoolean().withMessage('status is Boolean'),
        body('comments').optional().isObject(),
        body('payment').optional().isObject(),
        body('image').notEmpty().isString().withMessage('Image is Require'),
        error
    ]
// Delete validation
exports.deleteUserValidation =
    [
        param('id').notEmpty().withMessage('ID is Require').isMongoId().withMessage('ID must be Object of 16 cherachters '),
        error
    ]

