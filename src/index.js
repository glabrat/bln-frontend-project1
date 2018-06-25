import 'whatwg-fetch';

// https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
function createTable() {
    let element;

    const tableHeader = `
        <th>Currency</th>
        <th>15m</th>
        <th>Last</th>
        <th>Buy</th>
        <th>Sell</th>
        <th>Symbol</th> 
    `;

    element = document.querySelector(".home__table thead tr");

    element.innerHTML = tableHeader;
}

createTable();