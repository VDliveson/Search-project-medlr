const mongoose = require('mongoose');
const mongoUrl = 'mongodb://127.0.0.1:27017'

const connectToMongo = () => {
    mongoose.connect(mongoUrl)
    .then(()=>{
        console.log('Connected to mongoDB successfully')
    })
    .catch((err) =>{
        console.log(err);
    })
}

module.exports = connectToMongo;