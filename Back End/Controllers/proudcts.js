const proudcts = require('../Models/proudcts');
const slugify = require('slugify');
const ErrorHandling = require('../utilles/err');
const { json } = require('express');


getAllProudcts = (req, res, next) => {

    let page = req.query.page * 1 || 1
    let limit = req.query.limit * 1 || 5
    let skip = (page - 1) * limit
    let q = JSON.stringify(req.query)
    let queryString = q.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`)
    proudcts.find(JSON.parse(queryString), { _id: 0, __v: 0, slug: 0 }).skip(skip).limit(limit).populate({ path: 'category', select: 'name -_id' }).then((proudcts) => {
        res.status(200).json({
            result: proudcts.length, page,
            data: proudcts
        })
    }).catch(err => next(err))
}
getProudctsById = (req, res, next) => {
    let proudctId = req.params.id
    proudcts.find({ proudctId }).then((oneproudct) => {
        if (!oneproudct) { throw new ErrorHandling(` ID : ${id}  not found `, 404) }
        res.status(200).json({ data: oneproudct })
    }).catch(err => next(err))
}
createProudct = (req, res, next) => {
    // let { title, proudctId, description, price, discountPercentage, brand, category, subCategory, ImageCover, images, stock, statusStock, rating, comments } = req.body;
    // proudcts.create({ title, description, price, discountPercentage, proudctId, brand, category, ImageCover, images, stock, subCategory, statusStock, rating, comments, slug: slugify(title) }).then((newObj) => {
    req.body.slug = slugify(req.body.title)
    proudcts.create(req.body).then((newObj) => {
        res.status(201).json({ data: newObj })
    }).catch(err => next(err))
}

updateProudct = (req, res, next) => {
    let proudctId = req.params.id;
    // let { title, description, price, discountPercentage, brand, category, subCategory, ImageCover, images, stock, statusStock } = req.body;
    // proudcts.findOneAndUpdate({ proudctId }, { title, description, price, discountPercentage, brand, category, subCategory, ImageCover, images, stock, statusStock, slug: slugify(title) }, { new: true })
    req.body.slug = slugify(req.body.title)
    proudcts.findOneAndUpdate({ proudctId }, req.body, { new: true })
        .then((objUpdate) => {
            if (!objUpdate) { throw new ErrorHandling('ID is Not Found : ' + " " + proudctId, 404) }
            res.status(200).json({ data: objUpdate });
        }).catch((err) => next(err));
};
deleteProudct = (req, res, next) => {
    let proudctId = req.params.id
    proudcts.findOneAndDelete({ proudctId }).then((deleteObj) => {
        if (!deleteObj) { throw new ErrorHandling('ID is Not Found : ' + " " + proudctId, 404) }
        res.status(200).json({ Massage: "Object Is Deleted" })
    }).catch((err) => next(err))
}




module.exports = {
    getAllProudcts,
    getProudctsById,
    createProudct,
    updateProudct,
    deleteProudct
}