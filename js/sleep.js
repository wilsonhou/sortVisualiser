function timeout (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sleep (fn, ms = 10, ...args) {
    await timeout(ms);
    return fn(...args);
}
