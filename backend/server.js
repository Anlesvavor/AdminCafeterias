const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const unitsRouter = require('./routes/units');
const providersRouter = require('./routes/providers');
const productsRouter = require('./routes/products');
const diningRoomsRouter = require('./routes/diningRooms');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');
const loginRouter = require('./routes/login');
const requisitionsRouter = require('./routes/requisitions');

const app = express();

const router = express.Router();

//app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost:27017/users');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

app.get('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/units', unitsRouter);
app.use('/providers', providersRouter);
app.use('/products', productsRouter);
app.use('/diningRooms', diningRoomsRouter);
app.use('/orders', ordersRouter);
app.use('/categories', categoriesRouter);
app.use('/requisitions', requisitionsRouter);

const port = 4444;
app.listen(port, () => console.log('Expresss running on port ' + port));
