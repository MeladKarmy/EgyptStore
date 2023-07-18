const users = require('../Models/user');
const slugify = require('slugify');
const ErrorHandling = require('../utilles/err');
const cloudinary = require('../utilles/cloudinary');
const user = require('../Models/user');
getAllUsers = (req, res, next) => {
    users.find({}, { __v: 0 }).then((Users) => {
        res.status(200).json({ data: Users })
    }).catch(err => next(err))
}
getUserById = (req, res, next) => {
    let id = req.params.id
    users.findOne({ email: req.body.email }, { __v: 0 }).then((oneUser) => {
        if (!oneUser) { throw new ErrorHandling(` ID : ${id}  not found `, 404) }
        res.status(200).json({ data: oneUser })
    }).catch(err => next(err))
}
createUser = (req, res, next) => {
    let { firstName, lastName, email, password, phone, gender, image, age } = req.body;
    let fullName = firstName + " " + lastName
    users.findOne({ email: req.body.email }).then(user => {
        if (user) { return res.status(400).json({ data: ` Email  : ${req.body.email}  Already used ` }) }
        cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/users" }, (err, result) => {
            if (err) { return next(err); }
        }).then((x) => {
            users.create({
                firstName,
                lastName,
                fullName,
                slug: slugify(fullName),
                email,
                password,
                phone,
                age,
                image: x.url,
                gender,
            })

        }).then((newUser) => {
            res.status(201).json({ data: "Welcome to Egypt Store .. Your data created", status: "completed" })
        }).catch(err => next(err))
    })
}

updateUser = (req, res, next) => {
    let id = req.params.id;
    if (req.body.firstName && req.body.lastName) {
        req.body.fullName = req.body.firstName + " " + req.body.lastName;
        req.body.slug = slugify(req.body.fullName);
    }
    users.findById({ _id: id })
        .then((user) => {
            if (!user) { throw new ErrorHandling(` ID : ${id}  not found `, 404) }
            else {

                users.findOne(req.email).then((email) => {
                    if (email) { return res.status(400).json({ data: 'Email Already used' }) }

                    users.findOneAndUpdate({ _id: id }, req.body, { new: true })
                        .then((data) => {
                            res.status(200).json({ message: "Done" });
                        })
                })
            }
        }).catch((err) => next(err));
};
deleteUser = (req, res, next) => {
    let id = req.params.id
    users.findOneAndUpdate({ _id: id }, { status: false }, { new: true }).then((deleteObj) => {
        if (!deleteObj) { throw new ErrorHandling('ID is Not Found : ' + " " + id, 404) }
        res.status(200).json({ Massage: "user Is Deleted" })
    }).catch((err) => next(err))
}




module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}