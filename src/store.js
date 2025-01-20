export function createStore(reducer, preloadState, enhancer) {
    let state = preloadState
    let listeners = []

    if (typeof preloadState === "function" && enhancer === undefined) {
        enhancer = preloadState
        preloadState = undefined
    }

    if (typeof enhancer === "function") {
        return enhancer(createStore, reducer, preloadState);
    }
    
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
        return action
    }

    function getState() {
        return state
    }

    function subscribe(fn) {
        let listenerId;
        if (typeof fn === 'function') {
            listenerId = listeners.push(fn)
        }

        return () => {
            if (listenerId !== undefined) {
                listeners.splice(listenerId - 1, 1)
            }
        }
    }

    return {
        dispatch,
        getState,
        subscribe
    }

}