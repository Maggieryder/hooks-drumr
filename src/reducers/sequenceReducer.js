import * as TYPES from '../actions'

const initialState = {
    id: null,
    sequence: [],
    clipboard: []
}

const getSteps = (steps) => Array.apply(null, {length: steps}).map(() => 0)


const getSequence = (steps, bars) => Array.apply(null, {length: bars}).map(() => getSteps(steps))  


export default function(state = initialState, action) {
    // console.log('sequence Reducer action', action)
    switch (action.type){
        case TYPES.ADD_SEQUENCE:
            console.log('ADD_SEQUENCE',getSequence(action.value.numSteps, action.value.numBars))
            return {
                ...state,
                id: action.value.trackId,
                sequence: getSequence(action.value.numSteps, action.value.numBars)
            }
        case TYPES.ADD_BARS:
            return {
                ...state,
                sequence: [...state.sequence, getSteps(action.value.numSteps), getSteps(action.value.numSteps)]
            }
        case TYPES.REMOVE_BARS:
            return {
                ...state,
                sequence: state.sequence.filter((b,i) => i < state.sequence.length-2)
            }
        case TYPES.UPDATE_NUMSTEPS:
            return {
                ...state,
                sequence: getSequence(action.value.numSteps, action.value.numBars)
            }
        case TYPES.UPDATE_SEQUENCES:
            const { trackId, barId, stepId, isOn } = action.value
            if (state.id !== trackId) return state
  
            return {
                ...state,
                sequence: state.sequence.map((bar, i) => {
                    if(i === barId) {
                        return bar.map((step, j) => {
                            if(j === stepId) {
                                return isOn ? 1 : 0
                            }
                            return step
                        })
                    }
                    return bar
              })
            }
            // return [                // make a new array
            //     ...state.slice(0, barId), // copy the first items up to barId unchanged
            //     // insert the new item
            //     [
            //         ...state[stepId].slice(0, stepId), // copy the first items up to stepId unchanged
            //         // insert the new item
            //         isOn ? 1 : 0,
            //         ...state[stepId].slice(stepId) // copy the rest, starting at index stepId
            //     ],              
            //     ...state.slice(barId)     // copy the rest, starting at index barId
            // ]
        case TYPES.COPY_SEQUENCE:
            console.log('TYPES.COPY_SEQUENCE', action.value)
            return {
                ...state,
                clipboard: state.sequence.slice(action.value.firstBar, action.value.numberOfBars)
            }
        case TYPES.PASTE_SEQUENCE:
            console.log('TYPES.PASTE_SEQUENCE', state.clipboard)
            const { firstBar, numberOfBars } = action.value
            return {
                ...state,
                sequence: [ 
                    // copy the first items up to firstBar unchanged
                    ...state.sequence.slice(0, firstBar),
                    // insert the new item
                    ...state.clipboard,
                    // copy the rest, starting at end index
                    ...state.sequence.slice(firstBar + numberOfBars) 
                ],
                clipboard: []
            }
        default: 
            return state
        
    }
}