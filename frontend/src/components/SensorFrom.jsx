import React from "react"
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createSensor} from '../features/sensors/sensorSlice'

function SensorForm () {
    const [type, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createSensor({type}))
        setText('')
    }

    return <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Sensor</label>
                <input type="text" name="type" id="type" placeholder="type" value={type} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Add Sensor
                </button>
            </div>
        </form>
    </section>
}

export default SensorForm