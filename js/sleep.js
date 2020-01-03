function timeout (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sleep (fn, ...args) {
    await timeout(10);
    return fn(...args);
}
