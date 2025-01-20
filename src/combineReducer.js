export function combineReducer(reducers) {
    const finalReducers = {}
    for (let key of Object.keys(reducers)) {
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key]
        }
    }
    
    const finalReducersKeys = Object.keys(finalReducers)

    return (state = {}, action) => {
        const nextState = {}
        for (let key of finalReducersKeys) {
            const reducerForKey = finalReducers[key]
            const nextStateForKey = reducerForKey(state[key], action)
            nextState[key] = nextStateForKey
        }
        return nextState
    }
}