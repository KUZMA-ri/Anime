'use strict';
const elements = document.querySelectorAll('.set-bg');

console.log(elements);

for (let i = 0; i < elements.length; i++) {
    const src = elements[i].dataset.setbg;     // путь к img
    elements[i].style.backgroundImage = `url(${src})`;
}