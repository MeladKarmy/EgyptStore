const catagory = require('../Models/catagory');
const slugify = require('slugify');
const ErrorHandling = require('../utilles/err');
const cloudinary = require('../utilles/cloudinary')
getAllCatagory = (req, res, next) => {

    catagory.find({}, { __v: 0 }).then((catagory) => {
        if (!catagory.length) { return res.status(200).json({ data: "No Catagory Existed" }) }
        res.status(200).json({ data: catagory })
    }).catch((err) => { next(err) })
}
getById = (req, res, next) => {
    let id = req.params.id
    catagory.findById(id, { __v: 0 }).then((oneCatagory) => {
        if (!oneCatagory) { throw new ErrorHandling('ID is Not Found' + " " + id, 404) }
        res.status(200).json({ data: oneCatagory })
    }).catch((err) => next(err))
}

createCatagory = (req, res, next) => {
    let { name } = req.body
    catagory.findOne({ name }).then((n) => {
        if (n) { return res.status(201).json({ data: "Catagory Already used" }) }
        cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/catagory" })
            .then((data) => {
                let image = data.url
                catagory.create({ name, slug: slugify(name), image })
            }).then(() => {
                res.status(201).json({ data: "Catagory Created successfuly" })
            }).catch((err) => next(err));

    })
}


updateCatagory = (req, res, next) => {
    let id = req.params.id;
    let { name } = req.body;
    catagory.findById(id)
        .then((existingCategory) => {
            if (!existingCategory) { return res.status(404).json({ error: "Category not found" }) }
            return catagory.findOne({ name })
                .then((existingName) => {
                    if (existingName && existingName._id.toString() !== id) { return res.status(409).json({ error: "Category name already exists" }) }
                    return cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/catagory" })
                        .then((result) => {
                            existingCategory.name = name;
                            existingCategory.slug = slugify(name);
                            existingCategory.image = result.url;
                            return existingCategory.save();
                        })
                        .then((updatedCategory) => {
                            return res.status(200).json({ data: "Category updated successfully" });
                        });
                });
        })
        .catch((err) => {
            console.error(err);
            return next(err);
        });
}
deleteById = (req, res, next) => {
    let id = req.params.id
    catagory.findById(id).then((ctag) => {
        if (!ctag) { return res.status(404).json({ data: "Catagory ID is not found" }) }
        if (ctag.status == true) {
            ctag.status = false
        } else {
            ctag.status = true
        }
        return ctag.save()
    }).then((data) => {
        return res.status(200).json({ data: "Done" })
    })
}

module.exports = {
    createCatagory,
    getAllCatagory,
    getById,
    updateCatagory,
    deleteById
}
