import Sorter from './sorter.js';

const documentRoot = document.querySelector('#root');

const allButtons = document.querySelectorAll('.btn');

const buttonContainer = document.querySelector('.btn-container');

allButtons.forEach((button) => {
    button.addEventListener('sorting', () => {
        button.remove();
    });
});

allButtons.forEach((button) => {
    button.addEventListener('finishedSorting', () => {
        buttonContainer.appendChild(button);
    });
});

const mySorter = new Sorter(documentRoot, 60, allButtons);
