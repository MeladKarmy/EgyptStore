const mongoose = require('mongoose');


const commentsSchema = new mongoose.Schema({
    proudctId: {
        type: Number,
        ref: "proudcts",
        require: [true, "proudct ID is Require"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: [true, "user ID is Require"]
    },
    text: {
        type: String,
        trim: true,
        require: [true, "Comment is Require"]
    }

}, { id: false })
const proudctsSchema = new mongoose.Schema({
    proudctId: {
        type: Number,
        unique: [true, "ID aready used"],
        require: [true, "ID Is already used"],
    },
    title: {
        type: String,
        trim: true,
        require: [true, "Title Is Require"],
        minlength: [5, 'Title Name is too short'],
        maxlength: [20, 'Title Name is too long'],

    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        require: [true, "Title Is Require"],
        minlength: [20, 'Title Name is too short'],
        maxlength: [200, 'Title Name is too long'],
    },
    price: {
        type: Number,
        trim: true,
        require: [true, "Price Is Require"],
    },
    discountPercentage: {
        type: Number,
        trim: true,
        require: [true, "Price Is Require"],

    },
    brand: {
        type: String,
        trim: true,
        minlength: [5, 'Title Name is too short'],
        maxlength: [20, 'Title Name is too long'],


    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catagory',
        require: [true, "Proudct must be belong to Catagory"],

    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCatagory',

    },
    ImageCover: {
        type: String,
        trim: true,
        require: [true, "Title Is Require"],
    },
    images: [String],
    stock: {
        type: Number,
        require: [true, "Price Is Require"],
    },
    solid: {
        type: Number,
        default: 0,
    },
    statusStock: {
        type: Boolean,
        default: true,
        require: [true, "statusStock Is Require"],
    },
    rating: {
        type: Number,
        minl: [1, "rating min"],
        max: [5, "rating max 5 "]
    },
    usersRating: {
        type: Number,
        default: 0
    },
    comments: {
        type: [commentsSchema],
    }
}, { timestamps: true })


const proudctsModel = mongoose.model('proudcts', proudctsSchema)

module.exports = proudctsModel