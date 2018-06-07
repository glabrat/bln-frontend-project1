import 'whatwg-fetch';
import { getCurrenciesValues,  getBalance } from './dataRequest';
import { initializeTable } from './table';
import { initializeBalance } from './balance';
import { globalsDefinitions } from './utils';

const offlinePlugin = require('offline-plugin/runtime');

function offlineBalance(data) {

    let variable;
    variable = JSON.parse(localStorage.getItem("balanceData"));
    
    console.log(localStorage.getItem("balanceData") + 'original: ' + data);
     
    initializeBalance(variable);
}

function onlineBalance(data) {
    localStorage.setItem("balanceData", JSON.stringify(data))
    initializeBalance(data);
}

function onlineTable(data) {
    localStorage.setItem("tableData", JSON.stringify(data));
    initializeTable(data);
}

function offlineTable(data) {

    let variable;
    variable = JSON.parse(localStorage.getItem("tableData"));
     
    initializeTable(variable);
}

function callGets () {
    getBalance()
    .then(onlineBalance)
    .catch(offlineBalance);
    getCurrenciesValues()
    .then(onlineTable)
    .catch(offlineTable);
    console.log(localStorage.getItem("tableData"));
}

callGets();
setInterval(callGets, globalsDefinitions.ONE_MINUTE);



offlinePlugin.install();
