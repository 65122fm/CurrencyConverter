const firstCurrencyImg = document.getElementById('img-1');
const secondCurrencyImg = document.getElementById('img-2');
const firstCurrencySelect = document.getElementById('firstCountryName');
const secondCurrencySelect = document.getElementById('secondCountryName');
const firstAmount = document.getElementById('first-amount');
const secondAmount = document.getElementById('secondary-amount');
const rate = document.getElementById('rate');


document.getElementById('exchange-btn').addEventListener('click', function() {

    let firstCurrencyImg = document.getElementById('img-1').src;
    let secondCurrencyImg = document.getElementById('img-2').src;
    
    let firstCurrencySelect = document.getElementById('firstCountryName').value;
    let secondCurrencySelect = document.getElementById('secondCountryName').value;
    
    let firstAmount = document.getElementById('first-amount').value;
    let secondAmount = document.getElementById('secondary-amount').value;

    let tempCurrencyImg = firstCurrencyImg;
    firstCurrencyImg = secondCurrencyImg;
    secondCurrencyImg = tempCurrencyImg;

    let tempCurrencySelect = firstCurrencySelect;
    firstCurrencySelect = secondCurrencySelect;
    secondCurrencySelect = tempCurrencySelect;

    let tempAmount = firstAmount;
    firstAmount = secondAmount;
    secondAmount = tempAmount;

    document.getElementById('img-1').src = firstCurrencyImg;
    document.getElementById('img-2').src = secondCurrencyImg;
    document.getElementById('firstCountryName').value = firstCurrencySelect;
    document.getElementById('secondCountryName').value = secondCurrencySelect;
    document.getElementById('first-amount').value = firstAmount;
    document.getElementById('secondary-amount').value = secondAmount;
});

const apiKey = 'cur_live_k4Ds6DHGw0CQ2xQp78HOpyKB7AEdyxpJRumGTUNQ';  
const apiUrl = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`;

async function fetchCurrencyData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('API error:', error);
    }
}

async function populateCurrencyOptions() {
    const currencies = await fetchCurrencyData();
      for (const currencyCode in currencies) {

        const option1 = document.createElement('option');
        option1.value = currencyCode;
        option1.text = ` ${currencyCode}`;
        firstCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currencyCode;
        option2.text = `${currencyCode}`;
        secondCurrencySelect.appendChild(option2);
    }
}
populateCurrencyOptions();

firstAmount.addEventListener('input', async function() {
    const amount = this.value;
    const fromCurrency = firstCurrencySelect.value; 
    const toCurrency = secondCurrencySelect.value;

    if(amount < 0 || amount == "-") {
        alert("You have entered an incorrect amount")
        firstAmount.value = " ";
        secondAmount.value = '';
        return;
    }

    const currencies = await fetchCurrencyData();
    if (currencies[fromCurrency] && currencies[toCurrency]) {
        const rate = currencies[toCurrency].value / currencies[fromCurrency].value;
        const convertedAmount = amount * rate;
        secondAmount.value = convertedAmount.toFixed(2); 

        rate.innerHTML = `<b>${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}</b>`;
    } else {
        secondAmount.value = '';
        rate.innerHTML = `<b>Exchange rate not available</b>`;
    }
});
