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
const deliveryTrucksRouter = require('./routes/deliveryTrucks')
const rolesRouter = require('./routes/roles');
const deliverRouter = require('./routes/delivers');

const app = express();

const router = express.Router();

//app.use(cors());
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}));
app.use(bodyParser.json({limit: '10mb', extended: true}));



mongoose.connect('mongodb://admin:admin1234@ds015995.mlab.com:15995/admin-cafeterias');

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

function verifyToken(req, res, next) {

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized request');
  }
  let payload = jwt.verify(token, 'secretKey');
  if (!payload) {
    return res.status(401).send('Unauthorized request');
  }
  req.userId = payload.subject;
  next();

}

app.get('/', verifyToken, indexRouter);
app.use('/login', verifyToken, loginRouter);
app.use('/users', verifyToken, usersRouter);
app.use('/units', verifyToken, unitsRouter);
app.use('/providers', verifyToken, providersRouter);
app.use('/products', verifyToken, productsRouter);
app.use('/diningRooms', verifyToken, diningRoomsRouter);
app.use('/orders', verifyToken, ordersRouter);
app.use('/categories', verifyToken, categoriesRouter);
app.use('/requisitions', verifyToken, requisitionsRouter);
app.use('/roles', verifyToken, rolesRouter);
app.use('/deliveryTrucks', verifyToken, deliveryTrucksRouter);
app.use('/deliver', verifyToken, deliverRouter);

const port = 4444;
app.listen(port, () => console.log('Expresss running on port ' + port));
