// Brand Currency form alpha -------------
const brandObject = {
  timestamp: Date.now(),
  base: "EUR",
  date: new Date().toLocaleDateString(),
  rates: {},
};

document
  .getElementById("brand-currency-form")
  .addEventListener("submit", brandCurrency);

function brandCurrency(event) {
  event.preventDefault();

  const baseCurrency = document.getElementById("base-currency-alpha").value;
  brandObject.base = baseCurrency;
  let quoteName = document.getElementById("quote-name").value.toLowerCase();
  let quoteRate = document.getElementById("quote-rate").value;
  brandObject.rates[quoteName] = +quoteRate;

  document.getElementById("quote-name").value = "";
  document.getElementById("quote-rate").value = "";
}

// Currency Converter form -------------

document
  .getElementById("valuta-converter-form")
  .addEventListener("submit", valutaConverter);

function valutaConverter(event) {
  event.preventDefault();

  let convertedAmount;

  const moneyAmount = +document.getElementById("money-amount").value;
  const chosenQuoteValuta = document
    .getElementById("valuta-exchange-quote-valuta")
    .value.toLowerCase();

  if (brandObject.rates[chosenQuoteValuta]) {
    //Checks if the quote valuta is available
    convertedAmount = moneyAmount * brandObject.rates[chosenQuoteValuta];
    document.getElementById("converted-amount-value").innerHTML =
      convertedAmount.toFixed(2);
  } else {
    alert("Conversion rate not available, insert another valuta");
  }
}

// updateing existing currency conversion rates with new rates form
// **********************************************
// An array of the currency rate objects
// **********************************************

const brandObjectArray = [
  {
    timestamp: Date.now(),
    base: "EUR",
    date: new Date().toLocaleDateString(),
    rates: {},
  },
  {
    timestamp: Date.now(),
    base: "USD",
    date: new Date().toLocaleDateString(),
    rates: {},
  },
  {
    timestamp: Date.now(),
    base: "DKK",
    date: new Date().toLocaleDateString(),
    rates: {},
  },
];

document
  .getElementById("currencies-and-rate-creation-beta")
  .addEventListener("submit", brandCurrencyBeta);

document
  .getElementById("show-currencies-with-rate-check")
  .addEventListener("submit", currencyDisplayTable);

document
  .getElementById("show-currencies-with-rate-check")
  .addEventListener("reset", resetRateCondition);

function brandCurrencyBeta(event) {
  event.preventDefault();
  //getting and filling objects of brandCurrencyArray, base & quote currency, & conversion rate------
  const baseCurrency = document.getElementById("base-currency-beta").value;
  const quoteName = document.getElementById("quote-name-beta").value;
  const quoteRate = document.getElementById("quote-rate-beta").value;

  const selectedCurrency = brandObjectArray.find(
    (currency) => currency.base === baseCurrency
  );

  selectedCurrency.rates[quoteName] = +quoteRate;
  document.getElementById("quote-rate-beta").value = "";
}

let fromRate = null;
let toRate = null;
function resetRateCondition(event) {
  event.preventDefault();
  document.getElementById("rate-from").value = "";
  document.getElementById("rate-to").value = "";
  fromRate = null;
  toRate = null;
}

function currencyDisplayTable(event) {
  event.preventDefault();

  fromRate = document.getElementById("rate-from").value;
  toRate = document.getElementById("rate-to").value;

  const gridContainer = document.getElementById(
    "currency-rates-grid-container"
  );

  // Clear the previous content in the grid container
  gridContainer.innerHTML = "";

  // Create a table element
  const table = document.createElement("table");

  // Create header row
  const headerRow = table.createTHead().insertRow(0);
  headerRow.insertCell(0).textContent = "Base Currency";
  headerRow.insertCell(1).textContent = "Quote Currency";
  headerRow.insertCell(2).textContent = "Rate";

  // Creating rows for each entered currency object of brandObjectArray
  //if condition sets >>> creating rows based on rate condition
  brandObjectArray.forEach((currency) => {
    for (const quoteCurrency in currency.rates) {
      if (
        fromRate !== null &&
        toRate !== null &&
        currency.rates[quoteCurrency] >= +fromRate &&
        currency.rates[quoteCurrency] <= +toRate
      ) {
        const row = table.insertRow();
        //creating cells
        row.insertCell(0).textContent = currency.base;
        row.insertCell(1).textContent = quoteCurrency;
        row.insertCell(2).textContent = currency.rates[quoteCurrency];
      }
    }
  });
  // Append the table to the grid container
  gridContainer.appendChild(table);
}

// Implementing a timeout to show the market open and close time
let currentHour;
let houresLeftToOpen;
function marketMessageBackgroun(color) {
  document.getElementById(
    "markert-message-background-color"
  ).style.backgroundColor = color; //background color of Market message
}

setInterval(() => {
  currentHour = new Date().getHours();
  if (currentHour >= 9 && currentHour < 17) {
    document.getElementById("maket-time-open-close-message").innerHTML =
      " Market is open now";
    marketMessageBackgroun("rgb(0, 219, 0)");
  } else if (currentHour >= 17 && currentHour <= 24) {
    houresLeftToOpen = 24 - currentHour + 9;
    document.getElementById(
      "maket-time-open-close-message"
    ).innerHTML = `Market is closed now. Market will be opend on ${houresLeftToOpen} hours`;
    marketMessageBackgroun("rgb(219, 0, 0)");
  } else if (currentHour > 0 && currentHour < 9) {
    houresLeftToOpen = 9 - currentHour;
    document.getElementById(
      "maket-time-open-close-message"
    ).innerHTML = `Market is closed now. Market will be opend on ${houresLeftToOpen} hours`;
    marketMessageBackgroun("rgb(219, 0, 0)");
  }
}, 500);
// second part
