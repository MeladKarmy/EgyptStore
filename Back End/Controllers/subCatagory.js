const subCatagory = require('../Models/subCatagory');
const Catagory = require('../Models/catagory');
const slugify = require('slugify');
const ErrorHandling = require('../utilles/err');
const cloudinary = require('../utilles/cloudinary')


getAllSubCatagory = (req, res, next) => {
    subCatagory.find({}, { __v: 0 }).populate({ path: 'catagory', select: 'name _id' }).then((subcatagory) => {
        if (!subcatagory.length) { return res.status(200).json({ data: "No subcatagory Existed" }) }
        res.status(200).json({ data: subcatagory })
    }).catch(err => next(err))
}
getSubCatagoryById = (req, res, next) => {
    let id = req.params.id
    subCatagory.findById(id, { _id: 0, __v: 0, slug: 0 }).populate({ path: 'catagory', select: 'name -_id' }).then((oneSubCatagory) => {
        if (!oneSubCatagory) { throw new ErrorHandling(`SubCatagory ID : ${id}  not found `, 404) }
        res.status(200).json({ data: oneSubCatagory })
    }).catch(err => next(err))
}
createSubCatagory = (req, res, next) => {
    let { name, catagory } = req.body;
    Catagory.findById(catagory)
        .then((ctag) => {
            if (!ctag) { return res.status(404).json({ data: "Catagory not found" }); }
            return subCatagory.findOne({ name });
        })
        .then((subCtag) => {
            if (subCtag) { throw new ErrorHandling("subCatagory name already exists", 404); }
            return cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/subcatagory" })
        })
        .then((cloudinaryImage) => {
            let image = cloudinaryImage.url;
            return subCatagory.create({ name, slug: slugify(name), catagory, image });
        })
        .then((newSubCtag) => {
            return res.status(201).json({ data: "subCatagory created successfully" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(409).json({ error: err.message });
        });
}




updateSubCatagory = (req, res, next) => {
    let id = req.params.id;
    let { name, catagory } = req.body;
    subCatagory.findById(id)
        .then((existingSubCategory) => {
            if (!existingSubCategory) { res.status(404).json({ data: "subCategory ID not found" }) }
            return subCatagory.findOne({ name })
                .then((existingName) => {
                    if (existingName && existingName._id.toString() !== id) { res.status(409).json({ error: "subCategory name already exists" }) }
                    Catagory.findById(catagory).then((ctag) => {
                        if (!ctag) { res.status(404).json({ data: "Category ID not found" }) }
                        return cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/subcatagory" })
                    }).then((result) => {
                        existingSubCategory.name = name;
                        existingSubCategory.slug = slugify(name);
                        existingSubCategory.image = result.url;
                        existingSubCategory.save();
                    }).then((updatedCategory) => {
                        res.status(200).json({ data: "Subcategory updated successfully" });
                    });
                })
        }).catch((err) => next(err));
}
// updateSubCatagory = (req, res, next) => {
//     let id = req.params.id;
//     let { name, catagory } = req.body;
//     subCatagory.findOneAndUpdate({ _id: id }, { name, slug: slugify(name), catagory }, { new: true })
//         .then((objUpdate) => {
//             if (!objUpdate) { throw new ErrorHandling('ID is Not Found' + " " + id, 404) }
//             res.status(200).json({ data: objUpdate });
//         }).catch((err) => next(err));
// };



deleteSubCatagory = (req, res, next) => {
    let id = req.params.id
    subCatagory.findById(id).then((subCtag) => {
        if (!subCtag) { return res.status(404).json({ data: "Catagory ID is not found" }) }
        if (subCtag.status == true) {
            subCtag.status = false
        } else {
            subCtag.status = true
        }
        return subCtag.save()
    }).then((data) => {
        return res.status(200).json({ data: "Done" })
    })
}




module.exports = {
    getAllSubCatagory,
    getSubCatagoryById,
    createSubCatagory,
    updateSubCatagory,
    deleteSubCatagory
}