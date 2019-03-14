const Requisition = require('../models/requisition');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');

function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let requisition = new Requisition({
        _diner : req.body.diner,
        _orders: req.body.orders,
        _status: req.body.status,
        _date: new Date(),
        _approvedBy: req.body._approvedBy,
        _dateApproved: req._dateApproved,
        _requisitionOrig: req._requisitionOrig
    });

    requisition.save()
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
        select: '_diner _date _orders _status _approvedBy _dateApproved _requisitionOrig'
    };

    Requisition.paginate({}, options)
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
    Requisition.findById(req.params.id, (err, requisition) => {
        res.status(200).json({
            errors:[],
            data: requisition
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    Requisition.findById(req.params.id)
        .then((obj) => {
            obj.diner = req.body.diner ? req.body.diner : obj.diner;
            obj.orders = req.body.orders ? req.body.orders : obj.orders;
            obj.status = req.body.status ? req.body.status : obj.status;
            obj.approvedBy = req.body.approvedBy ? req.body.approvedBy : obj.approvedBy;
            obj.dateApproved = req.body.dateApproved ? req.body.dateApproved : obj.dateApproved;
            obj.requisitionOrig = req.body.requisitionOrig ? req.body.requisitionOrig : obj.requisitionOrig;

            obj.save()
                .then(obj => {
                    res.json({requisition : obj});
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
    Requisition.findByIdAndRemove({_id: req.params.id})
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
};
