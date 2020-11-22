const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');
const url = process.env.CONNECTION_URL;
console.log("url is",url);
function mongoDBConnection(){
    return new Promise(function(resolve, reject){
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((response)=>{
            console.log('MongoDB Connect');
            resolve(response.connections[0]);
        })
        .catch((err)=>{
            console.log('MongoDB connection failed');
            console.log(err);
            reject(err);
        })
    })
}

module.exports = {
    mongoDBConnection : mongoDBConnection
}