class Sorter {
    constructor (root, nodeCount) {
        // setting links to DOM
        this.root = root;
        this.nodeCount = nodeCount;

        // initialise nodes to display
        this.nodesToDisplay = Array(this.nodeCount).fill(null).map(() => Math.floor(Math.random() * 50) + 1);

        // binding methods to this
        this.render = this.render.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.randomise = this.randomise.bind(this);

        // render sorter on screen
        this.render();
    }
    render () {
        // clear root element
        if (this.sorterDisplayElement) this.sorterDisplayElement.remove();

        // creating sorter DisplayElement to display
        this.sorterDisplayElement = document.createElement('div');
        this.sorterDisplayElement.innerHTML = `
        <h1>Hello World!</h1>
        <p>This is where the sorter will be</p>
        <ul>${this.nodesToDisplay.map((num) => "<li class='itemToSort'>" + num + '</li>').join('')}</ul>
        <button id='bubbleButton'>Bubble Sort</button>
        <button id='randomiseButton'>Fisher-Yates Shuffle</button>
        `;

        // display the sorter element
        this.root.appendChild(this.sorterDisplayElement);

        // adding listeners
        document.querySelector('#bubbleButton').addEventListener('click', this.bubbleSort);
        document.querySelector('#randomiseButton').addEventListener('click', this.randomise);
    }
    async bubbleSort () {
        /** sort nodesToDisplay with bubble sort method */

        // extract nodes to display from this
        const { nodesToDisplay } = this;

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
                    await sleep(this.render);
                }
            }
        }
    }
    async randomise () {
        // extract nodes to display from this
        const { nodesToDisplay } = this;

        /** implemented Fisher-Yates Shuffle */
        for (let i = this.nodesToDisplay.length - 1; i > 0; i--) {
            const newIdx = Math.floor(Math.random() * i);
            // TODO: refactor this code
            [
                nodesToDisplay[i],
                nodesToDisplay[newIdx]
            ] = [
                nodesToDisplay[newIdx],
                nodesToDisplay[i]
            ];
            await sleep(this.render, 5);
        }
    }
}
