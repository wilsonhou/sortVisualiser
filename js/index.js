import Sorter from './sorter.js';

const documentRoot = document.querySelector('#root');

const buttonContainer = document.querySelector('.btn-container');

const allButtons = buttonContainer.querySelectorAll('.btn');

let mySorter = new Sorter(documentRoot, 60, allButtons);

allButtons.forEach((button) => {
    button.addEventListener('sorting', () => {
        console.log('I HEAR YOU!');
        button.classList.add('btn--disabled');
        button.setAttribute('disabled', 'true');
    });
    button.addEventListener('finishedSorting', () => {
        button.classList.remove('btn--disabled');
        button.removeAttribute('disabled');
    });
});

// // TODO: fix cancel button
// cancelButton.addEventListener('click', mySorter.dispatchFinishedSortingEvent);
