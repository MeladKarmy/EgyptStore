const users = require('../Models/user');
const ErrorHandling = require('../utilles/err');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utilles/cloudinary');
const slugify = require('slugify');

login = (request, response, next) => {
    let { email, password } = request.body;

    users.findOne({ email }).then((user) => {
        if (!user) { return response.status(400).json({ data: 'Please sign up' }) }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) { return response.status(401).json({ data: 'password Invalid' }) }
            let token = jwt.sign({ name: user.firstName, userId: user._id }, process.env.SECRET_KEY_JWT, { expiresIn: "1h" });
            response.status(200).json({ data: { image: user.image, name: user.firstName, fav: user.favorits, comment: user.comments }, Massage: "success login", token });
        });
    }).catch(err => next(err));
};

signUp = (req, res, next) => {
    let { firstName, lastName, email, password, phone, gender, image, age } = req.body;
    let fullName = firstName + " " + lastName;
    let slug = slugify(fullName)
    users.findOne({ email: req.body.email })
        .then((user) => {
            if (user) { throw new ErrorHandling('Email Already Exists', 400) }
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
            res.status(201).json({ data: "Welcome to Egypt Store .. Your data created", status: "completed" });
        })
        .catch(err => next(err));
}

checkAuthAdmin = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { token = req.headers.authorization.split(' ')[1] }
    if (!token) { throw new ErrorHandling('you are not Authorization', 400) }
    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)

    users.findById(decoded.userId).then((user) => {
        if (decoded.userId !== user.id) { throw new ErrorHandling('user not found', 404) }
        if (user.Role == 'client') { throw new ErrorHandling('No Authorization to you', 404) }
        if (user.Role == 'admin')
            next()
    }).catch(err => next(err));
}


checkAuthClient = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { token = req.headers.authorization.split(' ')[1] }
    if (!token) { throw new ErrorHandling('you are not Authorization', 400) }
    let decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)

    users.findById(decoded.userId).then((user) => {
        if (decoded.userId !== user.id) { throw new ErrorHandling('user not found', 404) }
        next()
    }).catch(err => next(err));
}



module.exports = {
    login,
    signUp,
    checkAuthAdmin,
    checkAuthClient
}