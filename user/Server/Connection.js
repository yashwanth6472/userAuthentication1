const mongoose = require('mongoose')

const Connection = (url) =>{
    mongoose.connect(url, {useNewUrlParser: true})
    .then((result)=>console.log("conected to database success"))
    .catch((error)=>console.log(error.message))
}

module.exports = Connection