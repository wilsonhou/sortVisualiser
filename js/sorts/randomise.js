const randomise = async (listToShuffle, swapFunction, actionEachTick) => {
    /** implemented Fisher-Yates Shuffle */
    for (let i = listToShuffle.length - 1; i > 0; i--) {
        const newIdx = Math.floor(Math.random() * i);
        // swap the nodes
        swapFunction(listToShuffle, i, newIdx);
        if (actionEachTick) await actionEachTick(5);
    }
};

export default randomise;
