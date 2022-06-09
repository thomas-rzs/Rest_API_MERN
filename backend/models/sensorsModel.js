const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    id: Number,
    type: String,
    datas: Array,
    metrics: Boolean
})

module.exports = mongoose.model('Sensors', sensorSchema)