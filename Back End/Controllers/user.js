const users = require('../Models/user');
const slugify = require('slugify');
const cloudinary = require('../utilles/cloudinary');
const ErrorHandling = require('../utilles/err');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../Models/user');


getAllUsers = (req, res, next) => {
    users.find({}, { __v: 0 }).then((Users) => {
        if (!Users.length) { return res.status(200).json({ data: "No Users Existed" }) }
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
    let fullName = firstName + " " + lastName;
    users.findOne({ email: req.body.email })
        .then((user) => {
            if (user) { throw new Error('Email Already Exists'); }
            return users.findOne({ phone: req.body.phone })
        })
        .then((user) => {
            if (user) { throw new Error('Phone Already Exists') }
            return cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/users" });
        })
        .then((data) => {
            image = data.url;
            return users.create({
                firstName,
                lastName,
                fullName,
                slug: slugify(fullName),
                email,
                password,
                phone,
                age,
                image,
                gender,
            });
        })
        .then((createuser) => {
            let token = jwt.sign({ name: createuser.firstName, userId: createuser._id }, process.env.SECRET_KEY_JWT, { expiresIn: "1h" })
            res.status(201).json({ data: "Welcome to Egypt Store .. Your data created", status: "completed", token });
        })
        .catch(err => next(err));
}

updateUser = (req, res, next) => {
    let id = req.params.id;
    req.body.fullName = req.body.firstName + " " + req.body.lastName
    users.findById({ _id: id })
        .then((user) => {
            if (!user) { throw new ErrorHandling(`user ID : ${id}  not found `, 404) }
            return users.findOne({ email: req.body.email })
        })
        .then((userByEmail) => {
            if (userByEmail && userByEmail._id.toString() !== id) { throw new ErrorHandling('Email Already Used', 400) }

            if (req.body.file) {
                return cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/users" })
                    .then((imageCloudiary) => {
                        req.body.image = imageCloudiary.url;
                        req.body.slug = slugify(req.body.fullName);
                        return users.findOneAndUpdate({ _id: id }, req.body, { new: true });
                    });
            } else {
                req.body.slug = slugify(req.body.fullName);
                return users.findOneAndUpdate({ _id: id }, req.body, { new: true });
            }
        })
        .then((updatedUser) => {
            res.status(200).json({ data: "Data updated successfully" });
        })
        .catch((err) => next(err));
};


updateUser = (req, res, next) => {
    let id = req.params.id;
    if (req.body.firstName && req.body.lastName) {
        req.body.fullName = req.body.firstName + " " + req.body.lastName;
        req.body.slug = slugify(req.body.fullName);
    }
    users.findById({ _id: id })
        .then((user) => {
            if (!user) {
                throw new ErrorHandling(`user ID : ${id}  not found `, 404);
            }
            return users.findOne({ email: req.body.email });
        })
        .then((userByEmail) => {
            if (userByEmail && userByEmail._id.toString() !== id) { throw new ErrorHandling('Email Already Used', 400) }

            if (req.file) {
                return cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/users" })
                    .then((imageCloudiary) => {
                        req.body.image = imageCloudiary.url;
                        req.body.password = bcrypt.hashSync(req.body.password, 12);
                        return users.findOneAndUpdate({ _id: id }, req.body, { new: true });
                    })
            } else {
                req.body.password = bcrypt.hashSync(req.body.password, 12);
                return users.findOneAndUpdate({ _id: id }, req.body, { new: true })
            }

        }).then((updatedUser) => {
            res.status(200).json({ data: "Data updated successfully" });
        }).catch((err) => next(err));
}

deleteUser = (req, res, next) => {
    let id = req.params.id
    users.findOneAndUpdate({ _id: id }, { status: false }, { new: true }).then((deleteObj) => {
        if (!deleteObj) { throw new ErrorHandling('ID is Not Found : ' + " " + id, 404) }
        res.status(200).json({ data: "Done" })
    }).catch((err) => next(err))
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}