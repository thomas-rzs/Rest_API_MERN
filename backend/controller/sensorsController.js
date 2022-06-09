const asyncHandler = require('express-async-handler')


const sensors = [
    {id:1, type:'alpha', datas:[1,2,3]},
    {id:2, type:'beta', datas:[1,2,3], metrics:false},
    {id:3, type:'omega', datas:{a:1,b:2}},
]

const getSensors = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'Get sensors'})
})

const getSensorsId = asyncHandler(async(req, res) => {
    //check if exist
    for (var i = 0; i < sensors.length; i++){
        //get object
    }
    res.status(200).json({sensor: `${sensors[req.params.id-1].id}`,
                          type: `${sensors[req.params.id-1].type}`,
                          datas: `${sensors[req.params.id-1].datas}`})
})

const setSensors = asyncHandler(async(req, res) => {
    if (!req.body.id){
        res.status(400)
        throw new Error('Add a id')
    }
    //check if exist
    sen = {id:req.body.id, type:req.body.type, datas:req.body.datas}
    sensors.push(sen)
    res.status(201).json({message: `Added sensor`})
})

const updateSensor = asyncHandler(async(req, res) => {
    //update
    res.status(200).json({message: `Update sensor ${req.params.id}`})
})

const deleteSensors = asyncHandler(async(req, res) => {
    //check if exist
    sensors.splice(req.params.id-1,req.params.id-1)
    res.status(200).json({message: `Deleted sensor ${req.params.id}`})
})

module.exports = {
    getSensors,
    getSensorsId,
    setSensors,
    updateSensor,
    deleteSensors,
}