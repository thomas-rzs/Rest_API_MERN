const asyncHandler = require('express-async-handler')

const Sensor = require('../models/sensorsModel')

const sensors = [
    {id:1, type:'alpha', datas:[1,2,3]},
    {id:2, type:'beta', datas:[1,2,3], metrics:false},
    {id:3, type:'omega', datas:{a:1,b:2}},
]

const getSensors = asyncHandler(async(req, res) => {
    const sensors = await Sensor.find()
    res.status(200).json(sensors)
})

const getSensorsId = asyncHandler(async(req, res) => {
    const sensor = await Sensor.findById(req.params.id)
    if(!sensor){
        res.status(400)
        throw new Error('Sensor not found')
    }
    res.status(200).json(sensor)
})

const setSensors = asyncHandler(async(req, res) => {
    if (!req.body.id){
        res.status(400)
        throw new Error('Add a id')
    }
    const sensor = await Sensor.create({
        type: req.body.type,
        datas: req.body.datas,
        metrics: req.body.metrics
    })
    res.status(201).json(sensor)
})

const updateSensor = asyncHandler(async(req, res) => {
    const sensor = await Sensor.findById(req.params.id)
    if(!sensor){
        res.status(400)
        throw new Error('Sensor not found')
    }
    const updatedSensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedSensor)
})

const deleteSensors = asyncHandler(async(req, res) => {
    const sensor = await Sensor.findById(req.params.id)
    if(!sensor){
        res.status(400)
        throw new Error('Sensor not found')
    }

    await sensor.remove()
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getSensors,
    getSensorsId,
    setSensors,
    updateSensor,
    deleteSensors,
}