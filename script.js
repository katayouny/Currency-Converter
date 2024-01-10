// Implementing a timeout to show the market open and close time
function marketMessageBackground(color) {
  document.getElementById(
    "markert-message-background-color"
  ).style.backgroundColor = color; //background color of Market message
}

setInterval(() => {
  const currentHour = new Date().getHours();
  const openingHour = 9;
  const closingHour = 17;

  if (currentHour > openingHour && currentHour < closingHour) {
    document.getElementById("maket-time-open-close-message").textContent =
      " Market is open now";
    marketMessageBackground("rgb(0, 219, 0)");
  }
  if (currentHour < openingHour || currentHour > closingHour) {
    const houresLeftToOpen =
      currentHour > closingHour
        ? 24 - currentHour + 9
        : openingHour - currentHour;
    document.getElementById(
      "maket-time-open-close-message"
    ).textContent = `Market is closed now. Market will be opend on ${houresLeftToOpen} hours`;
    marketMessageBackground("rgb(219, 0, 0)");
  }
}, 1000);

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
    //timestamp: Date.now(),
    base: "EUR",
    date: new Date().toLocaleDateString(),
    rates: {},
  },
  {
    //timestamp: Date.now(),
    base: "USD",
    date: new Date().toLocaleDateString(),
    rates: {},
  },
  {
    //timestamp: Date.now(),
    base: "DKK",
    date: new Date().toLocaleDateString(),
    rates: {},
  },
];

//The object of special/high rates
const specialRates = {
  EUR: {
    USD: 2,
    DKK: 3,
  },
  USD: {
    EUR: 3,
    DKK: 6,
  },
  DKK: {
    EUR: 7,
    USD: 6,
  },
};

document
  .getElementById("currencies-and-rate-creation-beta")
  .addEventListener("submit", brandCurrencyBeta);

document
  .getElementById("show-currencies-with-rate-check")
  .addEventListener("submit", currencyDisplayTable);

document
  .getElementById("show-currencies-with-rate-check")
  .addEventListener("reset", resetRateCondition);

//ading currencies and rate function
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

//Showing the table of currencies and rates with applied rate range filter
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
  //
  //if condition sets >> creating rows based on rate condition
  //plus Check if  currency.rates[quoteCurrency] is a specialRate

  brandObjectArray.forEach((currency) => {
    for (const quoteCurrency in currency.rates) {
      const baseCurrency = currency.base;
      const currentRate = currency.rates[quoteCurrency];
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
        if (
          specialRates[baseCurrency] &&
          specialRates[baseCurrency][quoteCurrency]
        ) {
          const specialRate = specialRates[baseCurrency][quoteCurrency];
          row.insertCell(2).textContent = `${currency.rates[quoteCurrency]} ${
            currentRate >= specialRate
              ? "Oh  :fire:  Don't trade today.The conversion rate is too high"
              : ""
          }`;
        }
      }
    }
  });
  // Append the table to the grid container
  gridContainer.appendChild(table);
}

// checking for special rates and making alert
function checkSpecialRates() {
  brandObjectArray.forEach((currency) => {
    for (const quoteCurrency in currency.rates) {
      const baseCurrency = currency.base;
      const currentRate = currency.rates[quoteCurrency];

      if (
        specialRates[baseCurrency] &&
        specialRates[baseCurrency][quoteCurrency]
      ) {
        const specialRate = specialRates[baseCurrency][quoteCurrency];
        if (currentRate >= specialRate) {
          alert(
            `Alert: 1 ${baseCurrency} is now ${currentRate} ${quoteCurrency} which is too high. (special rate: ${specialRate})`
          );
        }
      }
    }
  });
}

//Implementing a watcher(interval) to periodically check a specific currency conversion and
//alert the user when the value reaches a speicfic point.
const watcherInterval = setInterval(() => {
  checkSpecialRates();
}, 60000); // interval in milliseconds

//clearing the interval
//clearInterval(watcherInterval);

//finding the hotest conversion rate
