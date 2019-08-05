import { combineReducers } from 'redux'
import controller from './controllerReducer'
import tracks  from './tracksReducer'

const rootReducer = combineReducers({
    // loader,
    controller,
    tracks,
    // sequences,
    // mixer,
    // reverb,
    // delay,
    // compressor
})

export default rootReducer