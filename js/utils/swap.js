const swap = (listToSwap, firstIdx, secondIdx) => {
    [
        listToSwap[firstIdx],
        listToSwap[secondIdx]
    ] = [
        listToSwap[secondIdx],
        listToSwap[firstIdx]
    ];
};

export default swap;
