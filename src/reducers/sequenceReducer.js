import * as TYPES from '../actions'

// const initialState = {
//     id: 0,
//     bars: [
//         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//         [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//     ]
// }

const initialState = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]




export default function(state = initialState, action) {
    console.log('sequence Reducer action', action)
    switch (action.type){
        case TYPES.ADD_BAR:
            // return {...state,
            //             id: action.trackId, 
            //             bars: action.steps
            //         }
            return [...state, action.value]
        case TYPES.REMOVE_BAR:
            return state.filter((b, i) => i !== action.index)
        case TYPES.UPDATE_SEQUENCES:
            const { trackId, barId, stepId, isOn } = action.value
            return state.map((bar, i) => {
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
        default: 
            return state
        
    }
}