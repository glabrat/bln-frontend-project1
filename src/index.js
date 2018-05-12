import 'whatwg-fetch';
import { ApiRequest } from './dataRequest';

function formatColumnName(name) {
    return `${name[0].toUpperCase()}${name.slice(1)}`;
}
function createHeaders(columnNames) {
    const row = document.createDocumentFragment();
    let thead;
    ['Currency', ...columnNames].forEach(name => {
        thead = document.createElement('th');
        thead.textContent = name;
        row.appendChild(thead);
    }); 
    return row;
}
function createOption(label, value) {
    const option = document.createElement('option');
    option.textContent = label;
    if(value) {
        option.value = value;
    }
    return option;
}
function handleSelectChange(event) {
    const select = event.target;
    const selectedIndex = select.selectedIndex;
    const optionValue = select.options[selectedIndex].getAttribute('value');

    const tableRows = document.querySelectorAll('.home__table tbody tr');
    const selectedClass = 'row__currency--selected'
    
    Array.from(tableRows).forEach(row => {
        const currencyColumn = row.querySelector('td:nth-child(1)')
        if(currencyColumn.textContent === optionValue) { 
            row.classList.add(selectedClass);
        } else if(row.classList.contains(selectedClass)) {
            row.classList.remove(selectedClass);
        }
    });
}
function initialize({ tableData, balanceData }){
    const balanceSpan = document.querySelector('.bitcoin--balance');
    const table = document.querySelector('.home__table');
    const select = document.querySelector('.home__select--currency');
    const tableBody = table.querySelector('tbody');
    const theadRow = table.querySelector('thead tr');
    const currencyNames = Object.keys(tableData);
    const sampleKey = currencyNames[0];
    const columnNames = Object.keys(tableData[sampleKey]).map(formatColumnName);

    //  Set Balance
    balanceSpan.textContent = balanceData.confirmed_balance;

    // Populate table headers and select
    theadRow.appendChild(createHeaders(columnNames));
    select.appendChild(createOption('TODOS'));

    // Populate table
    currencyNames.forEach(currencyName => {
        const rowData = tableData[currencyName];
        const rowColumns = document.createElement('tr');

        let columnDataValue = document.createElement('td');
        columnDataValue.textContent = currencyName;
        rowColumns.appendChild(columnDataValue);
        
        Object.keys(rowData).forEach(currencyType => {
            columnDataValue = document.createElement('td');
            columnDataValue.textContent = rowData[currencyType];
            rowColumns.appendChild(columnDataValue);
        });
        tableBody.appendChild(rowColumns);
        select.appendChild(createOption(currencyName, currencyName));
    });

    select.addEventListener('change', handleSelectChange);
}
/*
Ayuda 1:
En este trozo de código estamos ejecutando la petición al servidor, obteniendo la respuesta
con los datos necesarios. Una vez ocurrido esto, le decimos
a la función "apiRequest" que "luego que" (then)
ocurra lo que tenga que suceder con la petición al servidor ejecute la función "initialize"
*/
ApiRequest().then(initialize);
