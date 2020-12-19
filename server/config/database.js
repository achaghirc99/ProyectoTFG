const mongoose = require('mongoose');

const URL = 'mongodb://localhost/NBAManagerDB';

mongoose.connect(URL, {
    useUnifiedTopology:true,
    useNewUrlParser: true, 
    })
    .then(db => console.log('DB is Connect'))
    .catch(err => console.log(err))

module.exports = mongoose;