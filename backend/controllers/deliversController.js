const Deliver = require('../models/deliver');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');

function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let deliver = new Deliver({
        _dinnerId : req.body.dinnerId,
        _dateSent: req.body.dateSent,
        _dateReceived: req.body.dateReceived,
        _orderSent: req.body.orderSent,
        _orderReceived: req.body.orderReceived,
        _observations: req.body.observations,
        _status: req.body.status,
        _truckId: req.body.truckId,


    });

    deliver.save()
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
}

function listAll(req, res, next) {

    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 20,
        select: '_dinnerId _dateSent _dateReceived _orderSent _orderReceived _observations'
    };

    Deliver.paginate({}, options)
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
    Deliver.findById(req.params.id, (err, deliver) => {
        res.status(200).json({
            errors:[],
            data: deliver
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    Deliver.findById(req.params.id)
        .then((obj) => {
            obj.dinnerId = req.body.dinnerId ? req.body.dinnerId : obj.dinnerId;
            obj.dateSent = req.body.dateSent ? req.body.dateSent : obj.dateSent;
            obj.dateReceived = req.body.dateReceived ? req.body.dateReceived : obj.dateReceived;
            obj.orderSent = req.body.orderSent ? req.body.orderSent : obj.orderSent;
            obj.orderReceived = req.body.orderReceived ? req.body.orderReceived : obj.orderReceived;
            obj.observations = req.body.observations ? req.body.observations : obj.observations;
            obj.status = req.body.status ? req.body.status : obj.body.status;
            obj.truckId = req.body.truckId ? req.body.truckId : obj.truckId;


            obj.save()
                .then(obj => {
                    res.json({deliver : obj});
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
    Deliver.findByIdAndRemove({_id: req.params.id})
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
    drop,
};
