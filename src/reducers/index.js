import { combineReducers } from 'redux'
import controller from './controllerReducer'
import sequencer from './sequencerReducer'
import tracks  from './tracksReducer'

const rootReducer = combineReducers({
    // loader,
    controller,
    sequencer,
    tracks,
    // mixer,
    // reverb,
    // delay,
    // compressor
})

export default rootReducer