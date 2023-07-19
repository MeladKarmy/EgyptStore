const mongoose = require('mongoose');



// creat Schema
const catagorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            require: [true, "Catagory Name is Require"],
            unique: [true, "Catagory Name already Found"],
            minlength: [5, 'Catagory Name is too short'],
            maxlength: [20, 'Catagory Name is too long'],
        },
        slug: {
            type: String,
            lowercase: true
        },
        image: {
            type: String,
            trim: true,
            require: [true, "Image Is Require"],
        },
        status: {
            type: Boolean,
            default: true
        }

    }, { timestamps: true })


//Creat Model
const catagoryModel = mongoose.model('catagory', catagorySchema)

module.exports = catagoryModel;