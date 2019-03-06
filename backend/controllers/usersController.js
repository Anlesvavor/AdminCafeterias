const User = require('../models/user');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');

function create(req, res, next) {


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let user = new User({
        _email: req.body.email,
        _password: req.body.password,
        _firstName: req.body.firstName,
        _lastName: req.body.lastName,
        _role: req.body.role
    });

    user.save()
        .then((obj) => {
            return res.status(200).json({
                errors:[],
                data:obj
            })
        })
        .catch((err) => {
            return res.status(500).json({
                errors:[{message: 'Something went wrong on create'}],
                data:[err]
            })
        })
};

function listAll(req, res, next) {

    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 20,
        select: '_email _password _firstName _lastName _role'
    }

    User.paginate({}, options)
        .then(obj => {
            res.status(200).json({
                errors:[],
                data:obj
            });
        })
        .catch(err => {
            res.status(500).json({
                errors:[{message: 'Something went wrong'}],
                data: []
            });
        })

    /*
    User.find((err, users) => {
        res.status(200).json({
            errors:[],
            data: obj
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
*/
}

function listOne(req, res, next) {
    User.findById(req.params.id, (err, user) => {
        res.status(200).json({
            errors:[],
            data: user
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    User.findById(req.params.id)
        .then((obj) => {
            obj.email = req.body.email;
            obj.password = req.body.password;
            obj.firstName = req.body.firstName;
            obj.lastName = req.body.lastName;
            obj.role = req.body.role;

            obj.save()
                .then(obj => {
                    res.json('Update done');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                })
        })
        .catch((err) => {
        res.status(500).json({
            errors: [{ message: 'somethign gone wrong'}],
            data: []
        })
    })
}

function drop(req, res, next) {
    User.findByIdAndRemove({_id: req.params.id})
        .then( obj => {
            res.status(200).json({
                errors:[],
                data: obj
            });
        })
        .catch( err => {
            res.status(500).json({
                errors: [{ message: 'Something went wrong'}],
                data : []
            })
        })
}

module.exports = {
    create,
    listOne,
    listAll,
    update,
    drop
}