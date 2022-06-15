import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import sensorService from './sensorService'

const initialState = {
    sensors: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new goal 
export const createSensor = createAsyncThunk('sensors/create', async(sensorData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await sensorService.createSensor(sensorData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)        
    }
})

export const sensorSlice = createSlice({
    name: 'sensor',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createSensor.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createSensor.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.sensors.push(action.payload)
        })
        .addCase(createSensor.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = sensorSlice.actions
export default sensorSlice.reducer