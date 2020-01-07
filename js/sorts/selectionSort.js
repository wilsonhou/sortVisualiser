const selectionSort = async (listToSort, swap, actionEachTick, actionWhenFinished) => {
    // quadratic sorting algorithm with O(n**2)

    let minimum, minIdx;
    // TODO: refactor stop condition!
    for (let i = 0; i < listToSort.length; i++) {
        // initialise minimum to the first number in the iteration cycle
        minimum = listToSort[i];
        // iterate over the array and find the minimum value
        for (let j = i; j < listToSort.length; j++) {
            // replace minimum with the smallest value in that iteration cycle
            if (listToSort[j] < minimum) {
                minimum = listToSort[j];
                minIdx = j;
            }
            if (actionEachTick) await actionEachTick(10, (idx) => idx === j, (idx) => idx === i, (idx) => idx < i);
        }
        // swap minimum with current place in loop if not already in correct place
        if (minimum !== listToSort[i]) {
            swap(listToSort, i, minIdx);
        }
    }

    if (actionWhenFinished) await actionWhenFinished();
};

export default selectionSort;
