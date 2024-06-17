const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/user.route')
const EmployeeRoutes = require('./routes/emp.route')
const { specs, swaggerUi } = require('./swagger');
const session = require('express-session');

const app = express();


dotenv.config();
const PORT = process.env.PORT || 4000;


// Middlewares
app.use(morgan('common'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use('/api/user',UserRoutes)
app.use('/api/emp', EmployeeRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));//swagger

//session
app.use(session({
    secret: 'yoursecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,  // Enable only for HTTPS
        sameSite: 'strict'  // Prevent client-side access to cookies
    }
}));



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
