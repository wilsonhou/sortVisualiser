const quickSort = async (listToSort, swap, actionEachTick, start = 0, end = listToSort.length - 1) => {
    // return if arr is of length 1 (base case)
    if (start >= end) return;

    // pick random element as pivot and move to end of array
    let pivotIdx = start + Math.floor(Math.random() * (end - start + 1));
    listToSort.splice(end, 0, ...listToSort.splice(pivotIdx, 1));
    let pivot = listToSort[end];

    // pIdx tracks where the next swap will occur
    let pIdx = start;
    for (let i = start; i < end; i++) {
        // if current number is less than the pivot
        if (listToSort[i] <= pivot) {
            // then swap the current number with the pIdx
            swap(listToSort, i, pIdx);
            // increment the pIdx to the next location
            pIdx++;
        }
        if (actionEachTick) await actionEachTick(10, (idx) => idx === i);
    }

    // // swap pivot to correct position
    swap(listToSort, pIdx, end);

    // call quick sort on left side, call quick sort on right side, then merge with concat
    await quickSort(listToSort, swap, actionEachTick, start, pIdx - 1);
    await quickSort(listToSort, swap, actionEachTick, pIdx + 1, end);
};

export default quickSort;
