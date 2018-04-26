
import 'whatwg-fetch';
import { ApiRequest } from './dataRequest';

function formatColumnName(name) {
    return `${name[0].toUpperCase()}${name.slice(1)}`;
}
function createColumns(columnNames) {
    const row = document.createDocumentFragment();
    let thead;
    ['Currency', ...columnNames].forEach(name => {
        thead = document.createElement('th');
        thead.textContent = name;
        row.appendChild(thead);
    }); 
    return row;
}
function createTable(tableData){    
    const table = document.querySelector('.home__table');
    const select = document.querySelector('.home__select--currency');
    const theadRow = table.querySelector('thead tr');
    const parsedData = JSON.parse(tableData);
    const currencyNames = Object.keys(parsedData);
    const sampleKey = currencyNames[0];
    const columnNames = Object.keys(parsedData[sampleKey]).map(formatColumnName);

    theadRow.appendChild(createColumns(columnNames));

    //Parte 2 Tarea
    //Implementar código para crear las filas de la tabla basada en la data acá
    const tableBody = table.querySelector('tbody');
    currencyNames.forEach(currencyName => {
        const rowData = parsedData[currencyName];
        const rowColumns = document.createElement('tr');
        const option = document.createElement('option');
        
        let columnDataValue = document.createElement('td');
        columnDataValue.textContent = currencyName;
        rowColumns.appendChild(columnDataValue);
        
        Object.keys(rowData).forEach(currencyType => {
            columnDataValue = document.createElement('td');
            columnDataValue.textContent = rowData[currencyType];
            rowColumns.appendChild(columnDataValue);
        });
        tableBody.appendChild(rowColumns);

        option.textContent = currencyName;
        option.value = currencyName;
        select.appendChild(option);
    });
}
/*
Ayuda 1:
En este trozo de código estamos ejecutando la petición al servidor, obteniendo la respuesta
con los datos necesarios. Una vez ocurrido esto, le decimos
a la función "apiRequest" que "luego que" (then)
ocurra lo que tenga que suceder con la petición al servidor ejecute la función "createTable"
*/
ApiRequest()
    .then(createTable);
