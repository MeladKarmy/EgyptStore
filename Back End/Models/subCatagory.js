const mongoose = require('mongoose')

const sucCatagorySchma = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: [true, "subCatagory Is Require"],
        unique: [true, "subCatagory Name already Found"],
        minlength: [5, 'Catagory Name is too short'],
        maxlength: [20, 'Catagory Name is too long'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catagory',
        require: [true, "subCatagory must be belong to Catagory Name"],
    }
}, { timestamps: true })

const subCatagoryModel = mongoose.model('subCatagory', sucCatagorySchma);

module.exports = subCatagoryModel