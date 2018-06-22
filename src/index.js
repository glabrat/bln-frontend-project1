import 'whatwg-fetch';

// https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
function createTable() {
    let table;
    let element;

    table = `
    <table class="home__table">
    <thead>
        <tr>
        <th>Currency</th>
        <th>15m</th>
        <th>Last</th>
        <th>Buy</th>
        <th>Sell</th>
        <th>Symbol</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td></td>
        </tr>
    </tbody>
    </table> 
    `;

    element = document.querySelector(".content");

    element.innerHTML = table;
}

createTable();