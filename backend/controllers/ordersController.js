const Order = require('../models/order');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');

function create(req, res, next) {


    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let order = new Order({
        _cantidad: req.body.cantidad,
        _unidad: req.body.unidad,
        _producto: req.body.producto
    });

    order.save()
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
        select: '_cantidad _unidad _producto'
    }

    Order.paginate({}, options)
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
    Order.findById(req.params.id, (err, order) => {
        res.status(200).json({
            errors:[],
            data: order
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    Order.findById(req.params.id)
        .then((obj) => {
            obj.cantidad = req.body.cantidad ? req.body.cantidad : obj.cantidad;
            obj.unidad = req.body.unidad ? req.body.unidad : obj.unidad;
            obj.producto = req.body.producto ? req.body.producto : obj.producto;

            obj.save()
                .then(obj => {
                    res.json({ data : obj });
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
    Order.findByIdAndRemove({_id: req.params.id})
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
