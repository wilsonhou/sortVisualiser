const heapSort = async (listToSort, swapFunction, actionEachTick, actionWhenFinished) => {
    // set the end of the heap as the initial array length
    let heapEnd = listToSort.length;

    // create max heap (assume unsorted array, build max heap)
    await buildMaxHeap(listToSort, actionEachTick);

    for (let i = heapEnd - 1; i > 0; i--) {
        // remove largest item (swap with item at the end of the array)
        if (listToSort[0] > listToSort[i]) await swapFunction(listToSort, 0, i);

        // call heapifyDown (keep swapping root node with the smallest child until its bigger than both of its children)
        await heapifyDown(listToSort, 0, actionEachTick, i - 1);
    }
};

async function buildMaxHeap (listToSort, actionEachTick) {
    // call heapifyDown on the array continually backwards
    for (let i = Math.floor((listToSort.length - 1) / 2); i >= 0; i--) {
        await heapifyDown(listToSort, i, actionEachTick);
    }
}

async function heapifyDown (listToSort, i, actionEachTick, end = listToSort.length) {
    // TODO: fix bug with heapify! displacing items in listToSort

    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < end && listToSort[i] < listToSort[left]) {
        max = left;
    }

    if (right < end && listToSort[max] < listToSort[right]) {
        max = right;
    }

    await actionEachTick(10, (idx) => idx === max, (idx) => idx === i, (idx) => idx > end);

    if (max != i) {
        [
            listToSort[max],
            listToSort[i]
        ] = [
            listToSort[i],
            listToSort[max]
        ];
        await actionEachTick(10, (idx) => idx === max, (idx) => idx === i, (idx) => idx > end);
        await heapifyDown(listToSort, max, actionEachTick, end);
    }
}

export default heapSort;
