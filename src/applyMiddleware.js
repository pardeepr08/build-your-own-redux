import { compose } from "./compose";

export function applyMiddleware(...middlewares) {
    return function(createStore, reducer, preloadState) {
        const store = createStore(reducer, preloadState)
        middlewares = middlewares.map(middleware => middleware(store));
        const dispatch = compose(middlewares)(store.dispatch)
        return {
            getState: store.getState,
            dispatch
        }
    }
}
// middleware1 -> middlewar2 -> store.dispatch