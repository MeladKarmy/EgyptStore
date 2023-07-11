const subCatagory = require('../Models/subCatagory');
const slugify = require('slugify');
const ErrorHandling = require('../utilles/err');


getAllSubCatagory = (req, res, next) => {
    subCatagory.find({}, { _id: 0, __v: 0, slug: 0 }).populate({ path: 'catagory', select: 'name -_id' }).then((subcatagory) => {
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
    // if (name.trim == "" && name.trim.length > 4) { throw new ErrorHandling('Name is Not  white space ', 404) }
    subCatagory.create({ name, slug: slugify(name), catagory }).then((newObj) => {
        res.status(201).json({ data: newObj })
    }).catch(err => next(err))
}

updateSubCatagory = (req, res, next) => {
    let id = req.params.id;
    let { name, catagory } = req.body;
    subCatagory.findOneAndUpdate({ _id: id }, { name, slug: slugify(name), catagory }, { new: true })
        .then((objUpdate) => {
            if (!objUpdate) { throw new ErrorHandling('ID is Not Found' + " " + id, 404) }
            res.status(200).json({ data: objUpdate });
        }).catch((err) => next(err));
};
deleteSubCatagory = (req, res, next) => {
    let id = req.params.id
    subCatagory.findOneAndDelete({ _id: id }).then((deleteObj) => {
        if (!deleteObj) { throw new ErrorHandling('ID is Not Found' + " " + id, 404) }
        res.status(200).json({ Massage: "Object Is Deleted" })
    }).catch((err) => next(err))
}




module.exports = {
    getAllSubCatagory,
    getSubCatagoryById,
    createSubCatagory,
    updateSubCatagory,
    deleteSubCatagory
}