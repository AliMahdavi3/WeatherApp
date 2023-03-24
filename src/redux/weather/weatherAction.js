import { RECEIVE_WEATHER_ERROR, RECEIVE_WEATHER_RESPONSE, SEND_WEATHER_REQUEST } from "./weatherType"
import axios from "axios"

const sendWeatherRequest = () =>{
    return {
        type: SEND_WEATHER_REQUEST
    }
}

const receiveWeatherResponse = (data) =>{
    return {
        type: RECEIVE_WEATHER_RESPONSE,
        payload: data
    }
}

const receiveWeatherError = (error) =>{
    return {
        type: RECEIVE_WEATHER_ERROR,
        payload: error
    }
}

const getWeatherInfo = (query) =>{
    return dispatch =>{
        dispatch(sendWeatherRequest())
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=3b3f83e57a56d02066c7445c416fa41c`)
        .then(res =>{
            dispatch(receiveWeatherResponse(res.data))
        }).catch(err =>{
            dispatch(receiveWeatherError(err.message))
        })
    }
}

export default getWeatherInfo;