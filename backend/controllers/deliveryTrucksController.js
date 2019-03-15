const DeliveryTruck = require('../models/deliveryTrucks');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');

function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let deliveryTruck = new DeliveryTruck({
      _name : req.body.name,
      _driver : req.body.driver,
      _plateNumber : req.body.plateNumber,
      _driverPhoneNumber : req.body.driverPhoneNumber,
      _capacity : req.body.capacity
    });

    deliveryTruck.save()
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
        select: '_name _driver _plateNumber _driverPhoneNumber _capacity' 
    }

    DeliveryTruck.paginate({}, options)
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
    DeliveryTruck.findById(req.params.id, (err, deliveryTruck) => {
        res.status(200).json({
            errors:[],
            data: deliveryTruck
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    DeliveryTruck.findById(req.params.id)
        .then((obj) => {
            console.log(req.body);
            obj.name = req.body.name ? req.body.name : obj.name;
            obj.driver = req.body.driver ? req.body.driver : obj.driver;
            obj.plateNumber = req.body.plateNumber ? req.body.plateNumber : obj.plateNumber;
            obj.driverPhoneNumber = req.body.driverPhoneNumber ? req.body.driverPhoneNumber : obj.driverPhoneNumber;
            obj.capacity = req.body.capacity ? req.body.capacity : obj.capacity;

            obj.save()
                .then(obj => {
                    res.json({deliveryTruck : obj});
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
    DeliveryTruck.findByIdAndRemove({_id: req.params.id})
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
