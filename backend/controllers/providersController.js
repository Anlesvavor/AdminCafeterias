const Provider = require('../models/provider');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');


function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let provider = new Provider({
        _name : req.body.name,
        _contact : req.body.concat,
        _telephoneNumber: req.body.telephoneNumber,
        _email :req.body.email,
        _rfc :req.body.rfc,
        _PC :req.body.PC,
        _street :req.body.street,
        _number :req.body.number,
        _extNumber :req.body.extNumber,
        _colony :req.body.colony,
    });

    provider.save()
        .then(obj => {
            return res.status(200).json({
                errors:[],
               data:obj
           })
        })
        .catch(err => {
            return res.status(500).json({
                errors:[{message: 'Something went wrong on create'}],
                data:[err]
            })
        });
}

function listAll(req, res, next) {

    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 20,
        select: '_name _concat _telephoneNumber _email _rfc _PC _street _number _extNumber _colony'
    };

    Provider.paginate({}, options)
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
    Provider.find((err, providers) => {
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
    Provider.findById(req.params.id, (err, provider) => {
        res.status(200).json({
            errors:[],
            data: provider
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    Provider.findById(req.params.id)
        .then((obj) => {
            obj.name = req.body.name;
            obj.contact = req.body.contact;
            obj.telephoneNumber = req.body.telephoneNumber;
            obj.email = req.body.email;
            obj.rfc = req.body.rfc;
            obj.PC = req.body.PC;
            obj.street = req.body.street;
            obj.number = req.body.number;
            obj.extNumber = req.body.extNumber;
            obj.colony = req.body.colony;

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
    Provider.findByIdAndRemove({_id: req.params.id})
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