const { body, param, validationResult } = require('express-validator');

const error = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) { return res.status(400).json({ error: error.array() }) }
    next()
}

exports.createProudctValidation =
    [
        body('proudctId').notEmpty().withMessage('ProudctId is Require').isNumeric().withMessage('proudctId must be Numeber '),
        body('title').notEmpty().withMessage('Title Is Require').isString().withMessage('Title is Require')
            .isLength({ min: 5 }).withMessage("Title is too short")
            .isLength({ max: 20 }).withMessage("Title is too long"),
        body('description').isString().notEmpty().withMessage('description is Require')
            .isLength({ min: 20 }).withMessage("description is too short")
            .isLength({ max: 200 }).withMessage("description is too long"),
        body('price').isNumeric().notEmpty().withMessage('Price is Require & Number'),
        body('discountPercentage').optional().isNumeric().withMessage('Discount is Number'),
        body('brand').isString().optional().withMessage('brand is String')
            .isLength({ min: 5 }).withMessage("brand is too short")
            .isLength({ max: 20 }).withMessage("brand is too long"),
        body('category').notEmpty().withMessage('category is Require')
            .isMongoId().withMessage('category ID is Object of 16 chrachter'),
        body('subCategory').optional().isMongoId().withMessage('category ID is Object of 16 chrachter'),
        body('ImageCover').notEmpty().isString().withMessage('Image Proudct is Require'),
        body('images').notEmpty().isArray().withMessage('Image Proudct is Require'),
        body('solid').optional().isNumeric().withMessage('solid is Number'),
        body('stock').isNumeric().notEmpty().withMessage('stock is Require & Number'),
        body('statusStock').isBoolean().notEmpty().withMessage('statusStock is Require boolean'),
        body('rating').isNumeric().optional(),
        body('usersRating').isNumeric().default().optional(),
        body('comments').isObject().optional(),
        error
    ]

// get validation
exports.getProudctValidation =
    [
        param('id').notEmpty().withMessage('ProudctId is Require').isNumeric().withMessage('proudctId must be Numeber '),
        error
    ]

// update validation
exports.updateProudctValidation =
    [
        param('id').notEmpty().withMessage('ID is Require').isNumeric().withMessage('proudctId must be Numeber '),
        body('proudctId').notEmpty().withMessage('ProudctId is Require').isNumeric().withMessage('proudctId must be Numeber '),
        body('title').notEmpty().withMessage('Title Is Require').isString().withMessage('Title is Require')
            .isLength({ min: 5 }).withMessage("Title is too short")
            .isLength({ max: 20 }).withMessage("Title is too long"),
        body('description').isString().notEmpty().withMessage('description is Require')
            .isLength({ min: 20 }).withMessage("description is too short")
            .isLength({ max: 200 }).withMessage("description is too long"),
        body('price').isNumeric().notEmpty().withMessage('Price is Require & Number'),
        body('discountPercentage').optional().isNumeric().withMessage('Discount is Number'),
        body('brand').isString().optional().withMessage('brand is String')
            .isLength({ min: 5 }).withMessage("brand is too short")
            .isLength({ max: 20 }).withMessage("brand is too long"),
        body('category').notEmpty().withMessage('category is Require')
            .isMongoId().withMessage('category ID is Object of 16 chrachter'),
        body('subCategory').optional().isMongoId().withMessage('category ID is Object of 16 chrachter'),
        body('ImageCover').notEmpty().isString().withMessage('Image Proudct is Require'),
        body('images').notEmpty().isArray().withMessage('Image Proudct is Require'),
        body('solid').optional().isNumeric().withMessage('solid is Number'),
        body('stock').isNumeric().notEmpty().withMessage('stock is Require & Number'),
        body('statusStock').isBoolean().notEmpty().withMessage('statusStock is Require & Number'),
        body('rating').isObject().optional(),
        body('usersRating').isNumeric().default().optional(),
        body('comments').isObject().optional(),
        error
    ]
// Delete validation
exports.deleteProudctValidation =
    [
        param('id').notEmpty().withMessage('ID is Require').isNumeric().withMessage('proudctId must be Numeber '),
        error
    ]

