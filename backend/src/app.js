const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Models
const User = require('./models/user');
const BookSeat = require('./models/seat_booking');
const CancelBooking = require('./models/cancel_booking');

const authRoute = require('./routes/auth.route');

const adminRoute = require('./routes/admin.route');

const bookSeatRoute = require('./routes/book-seat.route');

const seat_info_route= require('./routes/seats_info.route')

const generate_seat_route=require('./routes/generate_seat.route')

const { httpLogStream } = require('./utils/logger');

//Database
const sequelize = require ('./utils/database')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
const corsOptions = { 
    // origin:'https://abc.onrender.com',
    AccessControlAllowOrigin: '*',  
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
  }
app.use(cors(corsOptions));

app.disable('x-powered-by');

// Middleware to set Access-Control-Allow-Methods header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    next();
});

app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "*");
if (req.method === "OPTIONS") {
    res.header("Access-COntrol-Allow-Methods", "PUT,POST,GET,PATCH,DELETE");
    return res.status(200).json({});
}
next();
});

app.use('/admin',adminRoute)
// app.use(bookSeatRoute);
app.use('/api/auth', authRoute);
app.use('/seats_info',seat_info_route);
app.use('/generate_seat',generate_seat_route);


app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});
sequelize.sync().then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
})

module.exports = app;