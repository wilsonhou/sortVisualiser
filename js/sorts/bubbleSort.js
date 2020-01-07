// TODO: decouple sorts from sorter object!

const bubbleSort = async (listToSort, swapFunction, actionEachTick, actionWhenFinished) => {
    // var to check if array is already sorted
    let isAlreadySorted;

    // iterate through the list to display n times, where n is length
    for (let i = 0; i < listToSort.length; i++) {
        // within each of n iterations, iterate through list n - i times, as i elements are in place
        isAlreadySorted = true;
        for (let j = 0; j < listToSort.length - i; j++) {
            if (listToSort[j] > listToSort[j + 1]) {
                // swap nodes if values are in incorrect order
                swapFunction(listToSort, j, j + 1);
                isAlreadySorted = false;
            }
            // if actionEachTick exists, call it
            if (actionEachTick)
                await actionEachTick(
                    10,
                    (idx) => idx === j,
                    (idx) => idx === j + 1,
                    (idx) => idx >= listToSort.length - i
                );
        }
        if (isAlreadySorted) break;
    }

    // if actionWhenFinished exists, execute it
    if (actionWhenFinished) await actionWhenFinished();
};

export default bubbleSort;
