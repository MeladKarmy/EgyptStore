const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    }

}, { id: false })

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        require: [true, "First Name Is Require"],
        minlength: [5, "First Name Is too short"],
        maxlength: [15, "First Name Is too long"],
    },
    lastName: {
        type: String,
        trim: true,
        require: [true, "First Name Is Require"],
        minlength: [5, "First Name Is too short"],
        maxlength: [15, "First Name Is too long"],
    },
    fullName: {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
        require: true,
        unique: [true, "Phone is already used"],
        min: [11, "phone Number not correct"],
        max: [11, "phone Number not correct"]
    },
    email: {
        type: String,
        trim: true,
        require: [true, "First Name Is Require"],
        unique: [true, "Email aready used"],
    },
    gender: {
        type: String,
        trim: true,
        enum: ['male', 'famale'],
        require: [true, "Gender is Require"]
    },
    password: {
        type: String,
        trim: true,
        require: [true, "password Is Require"],
        min: [8, "password Is too short"],
    },
    status: Boolean,
    comments: {
        type: commentsSchema,
    },
    slug: {
        type: String,
        lowercase: true
    },
    Role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client'
    },
    image: {
        type: String,
        require: [true, "Image Is Require"],
        trim: true
    }


}, { timestamps: true })

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('user', userSchema)