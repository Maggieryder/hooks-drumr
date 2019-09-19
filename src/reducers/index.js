import { combineReducers } from 'redux'
import auth from './authReducer'
import controller from './controllerReducer'
import sequencer from './sequencerReducer'
import tracks  from './tracksReducer'

const rootReducer = combineReducers({
    auth,
    controller,
    sequencer,
    tracks
})

export default rootReducer