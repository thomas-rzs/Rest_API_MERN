import axios from 'axios'

const API_URL = '/api/sensors/'

// Create nex sensor
const createSensor = async(sensorData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, sensorData, config)

    return response.data
}

const sensorService = {
    createSensor,
}

export default sensorService