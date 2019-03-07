const DiningRoom = require('../models/diningRoom');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');

function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let diningRoom = new DiningRoom({
      _name : req.body.name,
      _user : req.body.user,
      _description: req.body.description
    });

    diningRoom.save()
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
        select: '_name _user _description'
    }

    DiningRoom.paginate({}, options)
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
}

function listOne(req, res, next) {
    DiningRoom.findById(req.params.id, (err, diningRoom) => {
        res.status(200).json({
            errors:[],
            data: diningRoom
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    DiningRoom.findById(req.params.id)
        .then((obj) => {
            obj.name = req.body.name ? req.body.name : obj.name;
            obj.user = req.body.user ? req.body.user : obj.user;
            obj.description = req.body.description ? req.body.description : obj.description;

            obj.save()
                .then(obj => {
                    res.json({diningRoom : obj});
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
    DiningRoom.findByIdAndRemove({_id: req.params.id})
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
