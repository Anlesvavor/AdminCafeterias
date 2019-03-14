const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;
const {validationResult} = require('express-validator/check');

function create(req, res, next) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        });
    }

    let product = new Product({
      _name : req.body.name,
      _unities: req.body.unities,
      _category: req.body.category,
      _description: req.body.description,
      _price: req.body.price,
      _provider: req.body.provider
    });

    product.save()
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
        select: '_name _unities _category _description _price _provider'
    };

    Product.paginate({}, options)
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

function listAllByCategory(req, res, next) {

    Product.find({ _category: {$eq: req.params.id}}, (err, obj) => {
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
    });
}


function listOne(req, res, next) {
    Product.findById(req.params.id, (err, product) => {
        res.status(200).json({
            errors:[],
            data: product
        });
    }).catch((err) => {
        res.status(500).json({
            errors:[{message:'something gone wrong'}],
            data: []
        });
    });
}

function update(req, res, next) {
    Product.findById(req.params.id)
        .then((obj) => {
            obj.name = req.body.name ? req.body.name : obj.name;
            obj.unities = req.body.unities ? req.body.unities : obj.unities;
            obj.category = req.body.category ? req.body.category : obj.category;
            obj.description = req.body.description ? req.body.description : obj.description;
            obj.price = req.body.price ? req.body.price : obj.price;
            obj.provider = req.body.provider ? req.body.provider : obj.provider;

            obj.save()
                .then(obj => {
                    res.json({product : obj});
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
    Product.findByIdAndRemove({_id: req.params.id})
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
    listAllByCategory
};
