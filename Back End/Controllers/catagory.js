const catagory = require('../Models/catagory');
const slugify = require('slugify');
const ErrorHandling = require('../utilles/err');
const upload = require('../utilles/handelImages');
const cloudinary = require('../utilles/cloudinary')
getAllCatagory = (req, res, next) => {
    // const page = req.body.page *1 || 1;
    // const limit = req.body.limit *1 || 2;
    // const skip = (page-1) *5
    catagory.find({}, { _id: 0, __v: 0, slug: 0 }).then((catagory) => {     //.skip(skip).limit(limit)
        res.status(200).json({ data: catagory })
    }).catch((err) => { next(err) })
}
getById = (req, res, next) => {
    let id = req.params.id
    catagory.findById(id, { _id: 0, __v: 0, slug: 0 }).then((oneCatagory) => {
        if (!oneCatagory) { throw new ErrorHandling('ID is Not Found' + " " + id, 404) }
        res.status(200).json({ data: oneCatagory })
    }).catch((err) => next(err))
}

createCatagory = (req, res, next) => {
    let { name } = req.body
    cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/catagory" }, (err, result) => {
        if (err) { return next(err); }
    }).then((x) => {

        catagory.create({ name, slug: slugify(name), image: x.url })
    }).then((ne) => res.status(201).json({ data: ne }))
        .catch((err) => next(err));
}

updateCatagory = (req, res, next) => {
    let id = req.params.id;
    let { name, image } = req.body;
    catagory.findOneAndUpdate({ _id: id }, { name, slug: slugify(name), image }, { new: true })
        .then((objUpdate) => {
            if (!objUpdate) { throw new ErrorHandling('ID is Not Found' + " " + id, 404) }
            res.status(200).json({ data: objUpdate });
        })
        .catch((err) => next(err));
};

deleteById = (req, res, next) => {
    let id = req.params.id
    catagory.findOneAndDelete({ _id: id }).then((deleteObj) => {
        if (!deleteObj) { throw new ErrorHandling('ID is Not Found' + " " + id, 404) }
        res.status(200).json({ Massage: "Object Is Deleted" })
    }).catch((err) => next(err))

}

module.exports = {
    createCatagory,
    getAllCatagory,
    getById,
    updateCatagory,
    deleteById
}
