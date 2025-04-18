

import dom from './dom.js';

const fromCurrency = dom.$('#from');
const toCurrency = dom.$('#to');
const swapButton = dom.$('#swap');
const resetButton = dom.$('#reset');


    // ------------------------------------------------- Function
    const currencies = () => {
        fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=fa0e651204574821b7ab5f4fc8d9455f&symbols=USD,EUR,GBP,PKR,JPY,CAD,AUD,CNY,CHF,NZD,SEK,NOK,DKK,SGD')
            .then(response => response.json())
            .then(data => {
                const currencies = Object.keys(data.rates);
    
                currencies.forEach(currency => {
                    dom.create({
                        type: 'option',
                        value: currency,
                        content: currency,
                        parent: fromCurrency
                    });
    
                    dom.create({
                        type: 'option',
                        value: currency,
                        content: currency,
                        parent: toCurrency
                    });
                });
    
                // ---------------------------------------------- default values
                fromCurrency.value = 'USD';
                toCurrency.value = 'EUR';
            })
            .catch(error => {
                console.log('error fetching data:', error);
            });
    };
    

    

    // ---------------------------------------------- form submission
    const form = dom.$('#converterForm');
    form.addEventListener('submit', event => {
        event.preventDefault();
    
        const amount = dom.$('#amount').value;
        const from = fromCurrency.value;
        const to = toCurrency.value;
    
        fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=fa0e651204574821b7ab5f4fc8d9455f&symbols=USD,EUR,GBP,PKR,JPY,CAD,AUD,CNY,CHF,NZD,SEK,NOK,DKK,SGD')
            .then(response => response.json())
            .then(data => {
                const fromRate = data.rates[from];
                const toRate = data.rates[to];
    
     // ---------------------------------------------- Convert from "from" currency to "to" currency
     
                const convertedAmount = (amount / fromRate) * toRate;
    
                dom.$('#result').textContent = ` ${convertedAmount.toFixed(2)} ${to}`;
            })
            .catch(error => {
                console.log('error in currency data:',error);
            });
    });
    

     // ---------------------------------------------- swap button 
     swapButton.addEventListener('click', () => {
       [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
     });

    // ---------------------------------------------- reset button 
    resetButton.addEventListener('click', () => {
        dom.$('#amount').value = '';
        fromCurrency.value = 'USD';
        toCurrency.value = 'EUR';
        dom.$('#result').textContent = '';
    });
    
    document.addEventListener('DOMContentLoaded', () => currencies());
