import Sorter from './sorter.js';

const documentRoot = document.querySelector('#root');

const allButtons = document.querySelectorAll('.btn');

const buttonContainer = document.querySelector('.btn-container');

const mySorter = new Sorter(documentRoot, 60, allButtons);

allButtons.forEach((button) => {
    button.addEventListener('sorting', () => {
        button.remove();
    });
    button.addEventListener('finishedSorting', () => {
        buttonContainer.appendChild(button);
    });
});
