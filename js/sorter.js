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
        `;

        // display the sorter element
        this.root.appendChild(this.sorterDisplayElement);
    }
    async bubbleSort () {
        // sort nodesToDisplay with bubble sort method

        // extract nodes to display from this
        const { nodesToDisplay } = this;

        // iterate through the list to display n times, where n is length
        for (let i = 0; i < nodesToDisplay.length; i++) {
            // within each of n iterations, iterate through list n - i times, as i elements are in place
            // this results in O(n**2)
            for (let j = 0; j < nodesToDisplay.length - i; j++) {
                if (nodesToDisplay[j] > nodesToDisplay[j + 1]) {
                    // ALL THE TIMEOUTS ARE THE SAME
                    // THEYLL RUN AT THE SAME TIME
                    // they'll swap at incorect times
                    // is it because callback queue is only checked once ther is no code left?
                    await sleep(() => {
                        [
                            nodesToDisplay[j],
                            nodesToDisplay[j + 1]
                        ] = [
                            nodesToDisplay[j + 1],
                            nodesToDisplay[j]
                        ];
                        this.render();
                    });
                }
            }
        }
    }
}

// // extract number from list item string and compare
// if (
//     nodesToDisplay[j + 1] &&
//     nodesToDisplay[j].match(/\d+/g).reduce((acc, num) => (parseInt(num), 0)) >
//     nodesToDisplay[j + 1].match(/\d+/g).reduce((acc, num) => (parseInt(num), 0))
// ) {
//     // if swap needed, set a timeout of 2 milliseconds and swap
//     setTimeout(() => {
//         [
//             nodesToDisplay[j],
//             nodesToDisplay[j + 1]
//         ] = [
//                 nodesToDisplay[j + 1],
//                 nodesToDisplay[j]
//             ];
//         this.render();
//     }, 200);
// }
