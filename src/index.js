import 'whatwg-fetch';
import { getCurrenciesValues, getBalance } from './dataRequest';

function initializeBalance(balanceData) {
    const balanceSpan = document.querySelector('.bitcoin--balance');
    balanceSpan.textContent = balanceData.confirmed_balance;
}

function createTable(tableData) {

}

getBalance.then(initializeBalance);
getCurrenciesValues.then(createTable);