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
        this.randomise = this.randomise.bind(this);
        this.pauseThenDisplay = this.pauseThenDisplay.bind(this);
        this.pauseThenShowComplete = this.pauseThenShowComplete.bind(this);

        // render sorter on screen
        this.render();

        // adding listeners
        document.querySelector('#bubbleButton').addEventListener('click', this.bubbleSort);
        document.querySelector('#randomiseButton').addEventListener('click', this.randomise);
        document.querySelector('#selectionButton').addEventListener('click', this.selectionSort);
    }
    // add color functions (isCurrent, isSorted)
    render (isCurrent = () => false, isSorted = () => false) {
        // clear root element
        if (this.sorterDisplayElement) this.sorterDisplayElement.remove();

        // creating sorter DisplayElement to display
        this.sorterDisplayElement = document.createElement('div');
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

        // iterate through the list to display n times, where n is length
        for (let i = 0; i < nodesToDisplay.length; i++) {
            // within each of n iterations, iterate through list n - i times, as i elements are in place
            // this results in O(n**2)
            for (let j = 0; j < nodesToDisplay.length - i; j++) {
                if (nodesToDisplay[j] > nodesToDisplay[j + 1]) {
                    // wait for sleep promise to resolve in 50ms to swap, render, then continue
                    [
                        nodesToDisplay[j],
                        nodesToDisplay[j + 1]
                    ] = [
                        nodesToDisplay[j + 1],
                        nodesToDisplay[j]
                    ];
                    // call pause then display with 2 callbacks used to display colors in render
                    await pauseThenDisplay(10, (idx) => idx === j, (idx) => idx >= nodesToDisplay.length - i);
                }
            }
        }
        pauseThenShowComplete();
    }
    async selectionSort () {}
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
