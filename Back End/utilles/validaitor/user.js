const { body, param, validationResult } = require('express-validator');
const ErrorHandling = require('../err');

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
        body('email').notEmpty().withMessage('Email is Require').isEmail().withMessage('Email invalid'),
        body("gender").notEmpty().withMessage("Gender is required").isString(),
        body('password').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("password is too short"),
        body('configPass').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("configPass is too short")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new ErrorHandling("configPass not match password", 400);
                }
                return true;
            }),
        body('age').isNumeric().optional().withMessage('age is Numeric')
            .isLength({ min: 2 }).withMessage("age is above 10")
            .isLength({ max: 2 }).withMessage("age is under 100"),
        body('comments').optional(),
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
        body('firstName').optional().isString().withMessage('First Name must be String')
            .isLength({ min: 5 }).withMessage("First Name is too short")
            .isLength({ max: 15 }).withMessage("First Name is too long"),
        body('lastName').optional().isString().withMessage('Last Name must be String')
            .isLength({ min: 5 }).withMessage("Last Name is too short")
            .isLength({ max: 15 }).withMessage("Last Name is too long"),
        body('phone').optional().isMobilePhone("ar-EG").withMessage('phone number Invalid')
            .isLength({ min: 11 }).withMessage("phone number not correct")
            .isLength({ max: 11 }).withMessage("phone number not correct"),
        body('email').optional().isEmail().withMessage('Email invalid'),
        body("gender").optional().isString(),
        body('password').isString().optional()
            .isLength({ min: 8 }).withMessage("password is too short"),
        body('configPass').isString().optional()
            .isLength({ min: 8 }).withMessage("configPass is too short")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new ErrorHandling("configPass not match password", 400);
                }
                return true;
            }), body('age').isNumeric().optional().withMessage('age is Numeric')
                .isLength({ min: 2 }).withMessage("age is above 10")
                .isLength({ max: 2 }).withMessage("age is under 100"),
        body('comments').optional(),
        error
    ]
// Delete validation
exports.deleteUserValidation =
    [
        param('id').notEmpty().withMessage('ID is Require').isMongoId().withMessage('ID must be Object of 16 cherachters '),
        error
    ]

