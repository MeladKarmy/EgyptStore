const users = require('../Models/user');
const ErrorHandling = require('../utilles/err');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utilles/cloudinary');
const slugify = require('slugify');

login = (req, res, next) => {
    let { email, password } = req.body;

    users.findOne({ email }).then((user) => {
        if (!user) return res.json('Please sign up')
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.json('password or Email Invalid ')
            let token = jwt.sign({ name: user.firstName, userId: user._id, image: user.image, fav: user.favorits, comments: user.comments }, process.env.SECRET_KEY_JWT, { expiresIn: "1h" });
            res.status(200).json({ data: "success login", token });
        });
    }).catch(err => next(err));
};

signUp = (req, res, next) => {
    let { firstName, lastName, email, password, phone, gender, image, age } = req.body;
    let fullName = firstName + " " + lastName;
    let slug = slugify(fullName)
    users.findOne({ email: req.body.email })
        .then((user) => {
            if (user) { return res.json('Email Already Exists') }
            return users.findOne({ phone: req.body.phone })
        })
        .then((user) => {
            if (user) { return res.json('Phone Already Exists') }
            return cloudinary.uploader.upload(req.file.path, { folder: "EgyptStore/users" });
        })
        .then((data) => {
            image = data.url;
            return users.create({
                firstName,
                lastName,
                fullName,
                slug,
                email,
                password,
                phone,
                age,
                image,
                gender,
            });
        })
        .then((createuser) => {
            return res.status(201).json("Welcome to Egypt Store");
        })
        .catch(err => next(err));
}

checkAuthAdmin = (req, res, next) => {
    let token;
    console.log(req.headers.Authorization)
    if (req.headers.Authorization && req.headers.Authorization.startsWith('Bearer')) { token = req.headers.Authorization.split(' ')[1] }
    if (!token) return res.json('you are not Authorization')
    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)

    users.findById(decoded.userId).then((user) => {
        if (decoded.userId !== user.id) return res.json('Admin not found')
        if (user.Role == 'client') return res.json('No Authorization')
        if (user.Role == 'admin')
            next()
    }).catch(err => next(err));
}


checkAuthClient = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { token = req.headers.authorization.split(' ')[1] }
    if (!token) return res.json('you are not Authorization')
    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)

    users.findById(decoded.userId).then((user) => {
        if (decoded.userId !== user.id) return res.json('user not found')
        next()
    }).catch(err => next(err));
}



module.exports = {
    login,
    signUp,
    checkAuthAdmin,
    checkAuthClient
}