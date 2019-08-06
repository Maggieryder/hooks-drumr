import * as TYPES from '../actions'

const initialState = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
]


export default function(state = initialState, action) {
    console.log('sequence Reducer action', action)
    switch (action.type){
        case TYPES.ADD_BAR:
            return [...state, action.steps ]
        case TYPES.REMOVE_BAR:
            return state.filter((b, i) => i !== action.index)
        case TYPES.UPDATE_SEQUENCES:
            const { barId, stepId, isOn } = action.value
            return [                // make a new array
                ...state.slice(0, barId), // copy the first items up to barId unchanged
                // insert the new item
                [
                    ...state[stepId].slice(0, stepId), // copy the first items up to stepId unchanged
                    // insert the new item
                    isOn ? 1 : 0,
                    ...state[stepId].slice(stepId) // copy the rest, starting at index stepId
                ],              
                ...state.slice(barId)     // copy the rest, starting at index barId
            ]
        default: 
            return state
        
    }
}