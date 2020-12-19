const express = require('express'); //Framework de node para el Backend 
const app = express(); 
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');

var session = require('express-session'),
    bodyParser = require('body-parser');

// DATABASE SETTINGS.
const mongoose = require('./config/database');

//Settings 
app.set('port',  process.env.PORT || 3000); //Elige un puerto automatico o me asigna el puerto 3000 si esta disponible


//Middlewares 
app.use(morgan('dev')); //Con esto podemos ver las peticiones HTTP por la consola (GET, POST, PUT...);
app.use(express.json()); //permitimos que el servidor pueda entender todos los datos que vengan en formato Json, ya que MongoDb y Angular va a trabajar con JSON 

app.use(cors({origin:'http://localhost:4200'}));  //Sincronizamos el servidor del back en este caso 3000 de Node con el del front en este caso 4200 de Angular

//Middlewares para Passport
app.use(express.static("public"));
app.use(session({
    secret: "amine",
    resave: false,
    saveUninitialized:false
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
    app.locals.signUpError = req.flash('signUpError');
    next();
});
require('./config/passport');

//ROUTES 
app.use('/api/user', require('./routes/authenticateRoutes/athenticate.user.routes'));
app.use('/api/user', require('./routes/userRoutes/user.routes'));
app.use('/api/comunidades', require('./routes/accionesRoutes/comunidad.routes'));

app.get('/', (req,res) => {
    res.send('Hello World')
})

//Starting the Server
const port = app.get('port');
app.listen(port, () => {
    console.log(`Server Working at http://localhost:${port}`)
})