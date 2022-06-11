const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    type: String,
    datas: Array,
    metrics: Boolean
})

module.exports = mongoose.model('Sensors', sensorSchema)