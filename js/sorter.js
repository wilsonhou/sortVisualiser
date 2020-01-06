import sleep from './utils/sleep.js';
import swap from './utils/swap.js';
import moduleRandomise from './sorts/randomise.js';
import moduleBubbleSort from './sorts/bubbleSort.js';
import moduleSelectionSort from './sorts/selectionSort.js';
import moduleQuickSort from './sorts/quickSort.js';

export default class Sorter {
    constructor (root, nodeCount, maxNum = 50) {
        // setting links to DOM
        this.root = root;
        this.nodeCount = nodeCount;
        this.maxNum = maxNum;

        // initialise nodes to display
        this.nodesToDisplay = Array(this.nodeCount).fill(null).map(() => Math.floor(Math.random() * this.maxNum) + 1);

        // render sorter on screen
        this.render();

        // adding listeners
        document.querySelector('#bubbleButton').addEventListener('click', this.bubbleSort);
        document.querySelector('#randomiseButton').addEventListener('click', this.randomise);
        document.querySelector('#quickButton').addEventListener('click', this.quickSort);
        document.querySelector('#selectionButton').addEventListener('click', this.selectionSort);
    }
    // add color functions (isCurrent, isSorted)
    render = (isCurrent = () => false, isSorted = () => false) => {
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
    };
    bubbleSort = async () => {
        /** swapping sorting algorithm with O(n**2) */
        moduleBubbleSort(this.nodesToDisplay, swap, this.pauseThenDisplay, this.pauseThenShowComplete);
    };
    selectionSort = async () => {
        /** quadratic sorting algorithm with O(n**2) */
        moduleSelectionSort(this.nodesToDisplay, swap, this.pauseThenDisplay, this.pauseThenShowComplete);
    };
    quickSort = async () => {
        await moduleQuickSort(this.nodesToDisplay, swap, this.pauseThenDisplay);

        // render final
        this.pauseThenShowComplete();
    };
    /** utility funtions */
    pauseThenDisplay = async (ms = 10, ...args) => {
        // pauses for ms then renders
        await sleep(this.render, ms, ...args);
    };
    pauseThenShowComplete = async (ms = 10, ms2 = 400, ms3 = 700) => {
        const { pauseThenDisplay } = this;
        // final render all completed
        await pauseThenDisplay(ms, () => false, () => true);
        // show all complete
        await pauseThenDisplay(ms2, () => true, () => false);
        // reset to original color
        await pauseThenDisplay(ms3);
    };
    randomise = async () => {
        // extract nodes to display from this
        moduleRandomise(this.nodesToDisplay, swap, this.pauseThenDisplay);
    };
}
