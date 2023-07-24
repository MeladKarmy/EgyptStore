const { body, validationResult } = require('express-validator');
const ErrorHandling = require('./err');

const error = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
    next()
}

exports.signUpValidation =
    [
        body('firstName').notEmpty().withMessage('First Name is Require').isString().withMessage('First Name must be String')
            .isLength({ min: 5 }).withMessage("First Name is too short")
            .isLength({ max: 15 }).withMessage("First Name is too long"),
        body('lastName').notEmpty().withMessage('Last Name is Require').isString().withMessage('Last Name must be String')
            .isLength({ min: 5 }).withMessage("Last Name is too short")
            .isLength({ max: 15 }).withMessage("Last Name is too long"),
        body('phone').notEmpty().withMessage('phone is Require').isMobilePhone('ar-EG').withMessage('phone number Invalid'),
        body('email').notEmpty().withMessage('Email is Require').isEmail().withMessage('Email invalid'),
        body("gender").notEmpty().withMessage("Gender is required").isString(),
        body('password').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("password is too short"),
        body('configPassword').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("configPass is too short")
            .custom((value, { req }) => {
                if (value !== req.body.password) { throw new ErrorHandling("configPass not match password", 400) }
                return true;
            }),
        body('age').isNumeric().notEmpty().withMessage('age is Numeric')
            .isLength({ min: 2 }).withMessage("age is above 10")
            .isLength({ max: 2 }).withMessage("age is under 100"),

        error
    ]
exports.loginValidation =
    [
        body('email').notEmpty().withMessage('Email is Require').isEmail().withMessage('Email invalid'),
        body('password').isString().notEmpty().withMessage('Password is Require')
            .isLength({ min: 8 }).withMessage("password is too short"),

        error
    ]
