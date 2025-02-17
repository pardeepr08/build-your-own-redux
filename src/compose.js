// chains multiple function together
export function compose(fns) {
    return fns.reduce((a, b) => (...args) => a(b(...args)))
}