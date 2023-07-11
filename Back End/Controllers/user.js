const users = require('../Models/user');
const slugify = require('slugify');
const ErrorHandling = require('../utilles/err');

getAllUsers = (req, res, next) => {
    users.find({}, { __v: 0 }).then((Users) => {
        res.status(200).json({ data: Users })
    }).catch(err => next(err))
}
getUserById = (req, res, next) => {
    let id = req.params.id
    users.findById({ _id: id }, { __v: 0 }).then((oneUser) => {
        if (!oneUser) { throw new ErrorHandling(` ID : ${id}  not found `, 404) }
        res.status(200).json({ data: oneUser })
    }).catch(err => next(err))
}
createUser = (req, res, next) => {
    // let { firstName, lastName, email, password, status, payment, comments, Role } = req.body;
    // users.create({ firstName, lastName, email, password, status, payment, fullName, Role, slug: slugify(fullName), comments }).then((newObj) => {
    req.body.fullName = firstName + " " + lastName
    req.body.slug = slugify(fullName)
    users.create(req.body).then((newObj) => {
        res.status(201).json({ data: newObj })
    }).catch(err => next(err))
}

updateUser = (req, res, next) => {
    let id = req.params.id;
    // let { firstName, lastName, email, password, status, payment, comments, Role } = req.body;
    // let fullName = firstName + " " + lastName
    // users.findOneAndUpdate({ _id: id }, { firstName, lastName, email, password, Role, status, payment, fullName, slug: slugify(fullName), comments }, { new: true })
    req.body.fullName = firstName + " " + lastName
    req.body.slug = slugify(fullName)
    users.findOneAndUpdate({ _id: id }, req.body, { new: true })
        .then((objUpdate) => {
            if (!objUpdate) { throw new ErrorHandling('ID is Not Found : ' + " " + id, 404) }
            res.status(200).json({ data: objUpdate });
        }).catch((err) => next(err));
};
deleteUser = (req, res, next) => {
    let id = req.params.id
    users.findOneAndDelete({ _id: id }).then((deleteObj) => {
        if (!deleteObj) { throw new ErrorHandling('ID is Not Found : ' + " " + id, 404) }
        res.status(200).json({ Massage: "Object Is Deleted" })
    }).catch((err) => next(err))
}




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}