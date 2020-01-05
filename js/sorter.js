class Sorter {
    constructor (root, nodeCount, maxNum = 50) {
        // setting links to DOM
        this.root = root;
        this.nodeCount = nodeCount;
        this.maxNum = maxNum;

        // initialise nodes to display
        this.nodesToDisplay = Array(this.nodeCount).fill(null).map(() => Math.floor(Math.random() * this.maxNum) + 1);

        // binding methods to this to set context
        this.render = this.render.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.selectionSort = this.selectionSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.randomise = this.randomise.bind(this);
        this.pauseThenDisplay = this.pauseThenDisplay.bind(this);
        this.pauseThenShowComplete = this.pauseThenShowComplete.bind(this);

        // render sorter on screen
        this.render();

        // adding listeners
        document.querySelector('#bubbleButton').addEventListener('click', this.bubbleSort);
        document.querySelector('#randomiseButton').addEventListener('click', this.randomise);
        document.querySelector('#selectionButton').addEventListener('click', this.selectionSort);
        document.querySelector('#quickButton').addEventListener('click', () => {
            this.quickSort();
        });
    }
    // add color functions (isCurrent, isSorted)
    render (isCurrent = () => false, isSorted = () => false) {
        // create display element or clear root element
        if (!this.sorterDisplayElement) {
            this.sorterDisplayElement = document.createElement('div');
        } else {
            this.sorterDisplayElement.remove();
        }

        // filling sorter DisplayElement to display
        this.sorterDisplayElement.classList.add('sorter');
        this.sorterDisplayElement.innerHTML = this.nodesToDisplay
            .map(
                (num, idx) =>
                    // check and apply correct color classes
                    `<span style='height: ${num / this.maxNum * 100}%; width: ${1 /
                        this.nodeCount *
                        100}%' class="${'sortItem' +
                        (isSorted(idx) ? ' sortItem-sorted' : '') +
                        (!isSorted(idx) && isCurrent(idx) ? ' sortItem-current' : '')}"></span>`
            )
            .join('');

        // display the sorter element
        this.root.appendChild(this.sorterDisplayElement);
    }
    async bubbleSort () {
        /** sort nodesToDisplay with bubble sort method */

        // extract nodes to display from this
        const { nodesToDisplay, pauseThenDisplay, pauseThenShowComplete } = this;

        // var to check if array is already sorted
        let isAlreadySorted;

        // iterate through the list to display n times, where n is length
        for (let i = 0; i < nodesToDisplay.length; i++) {
            // within each of n iterations, iterate through list n - i times, as i elements are in place
            // this results in O(n**2)
            isAlreadySorted = true;
            for (let j = 0; j < nodesToDisplay.length - i; j++) {
                if (nodesToDisplay[j] > nodesToDisplay[j + 1]) {
                    // swap nodes if values are in incorrect order
                    [
                        nodesToDisplay[j],
                        nodesToDisplay[j + 1]
                    ] = [
                        nodesToDisplay[j + 1],
                        nodesToDisplay[j]
                    ];
                    isAlreadySorted = false;
                }
                // call pause then display with 2 callbacks used to display colors in render
                await pauseThenDisplay(10, (idx) => idx === j, (idx) => idx >= nodesToDisplay.length - i);
            }
            if (isAlreadySorted) break;
        }
        pauseThenShowComplete();
    }
    async selectionSort () {
        // quadratic sorting algorithm with O(n**2)

        const { nodesToDisplay, pauseThenDisplay, pauseThenShowComplete } = this;

        let minimum, minIdx;
        // TODO: refactor stop condition!
        for (let i = 0; i < nodesToDisplay.length; i++) {
            // initialise minimum to the first number in the iteration cycle
            minimum = nodesToDisplay[i];
            // iterate over the array and find the minimum value
            for (let j = i; j < nodesToDisplay.length; j++) {
                // replace minimum with the smallest value in that iteration cycle
                if (nodesToDisplay[j] < minimum) {
                    minimum = nodesToDisplay[j];
                    minIdx = j;
                }
                await pauseThenDisplay(10, (idx) => idx === j, (idx) => idx < i);
            }
            // swap minimum with current place in loop if not already in correct place
            if (minimum !== nodesToDisplay[i]) {
                [
                    nodesToDisplay[minIdx],
                    nodesToDisplay[i]
                ] = [
                    nodesToDisplay[i],
                    nodesToDisplay[minIdx]
                ];
            }
        }

        pauseThenShowComplete();
    }
    async quickSort (start = 0, end = this.nodesToDisplay.length - 1) {
        // TODO: FIX EDGE CASE AT BEGINNING OF ARRAY
        // return if arr is of length 1 (base case)
        if (start >= end) return;

        // Pick last element as pivot point
        let pivot = this.nodesToDisplay[end];

        // iterate forwards and backwards through array to find left and right, then swap
        let pIdx = start;
        for (let i = start; i < end; i++) {
            if (this.nodesToDisplay[i] <= pivot) {
                // TODO: refactor into swap function
                [
                    this.nodesToDisplay[i],
                    this.nodesToDisplay[pIdx]
                ] = [
                    this.nodesToDisplay[pIdx],
                    this.nodesToDisplay[i]
                ];
                pIdx++;
            }
            await this.pauseThenDisplay(10, (idx) => idx === i);
        }

        // pivot is the largest if no swaps have occurred
        let isPivotLargest = pIdx === 0;

        // swap pivot to correct position if it is not the largest
        if (!isPivotLargest) {
            [
                this.nodesToDisplay[pIdx],
                this.nodesToDisplay[end]
            ] = [
                this.nodesToDisplay[end],
                this.nodesToDisplay[pIdx]
            ];
        }

        // call quick sort on left side, call quick sort on right side, then merge with concat
        await this.quickSort(start, pIdx - 1);
        await this.quickSort(pIdx + 1, end);

        this.pauseThenShowComplete();

        // TODO: await quickSort! it's a promise, remember that
    }
    // utility funtions
    async pauseThenDisplay (ms = 10, ...args) {
        // pauses for ms then renders
        await sleep(this.render, ms, ...args);
    }
    async pauseThenShowComplete (ms = 10, ms2 = 400, ms3 = 700) {
        const { pauseThenDisplay } = this;
        // final render all completed
        await pauseThenDisplay(ms, () => false, () => true);
        // show all complete
        await pauseThenDisplay(ms2, () => true, () => false);
        // reset to original color
        await pauseThenDisplay(ms3, () => false, () => false);
    }
    async randomise () {
        // extract nodes to display from this
        const { nodesToDisplay, pauseThenDisplay } = this;

        /** implemented Fisher-Yates Shuffle */
        for (let i = nodesToDisplay.length - 1; i > 0; i--) {
            const newIdx = Math.floor(Math.random() * i);
            // TODO: refactor this code
            [
                nodesToDisplay[i],
                nodesToDisplay[newIdx]
            ] = [
                nodesToDisplay[newIdx],
                nodesToDisplay[i]
            ];
            await pauseThenDisplay(5);
        }
    }
}
