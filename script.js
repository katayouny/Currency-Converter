// Brand Currency form -------------
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

  const baseCurrency = document.getElementById("base-currency").value;
  brandObject.base = baseCurrency;
  let quoteName = document.getElementById("quote-name").value.toLowerCase();
  let quoteRate = document.getElementById("quote-rate").value;
  brandObject.rates[quoteName] = +quoteRate;

  document.getElementById("quote-name").value = "";
  document.getElementById("quote-rate").value = "";
  // console.log({ brandObject });
  // console.log("List of inserted currencies:");
  //console.log(brandObject.rates);
}

// Currency Converter form --------------

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
// Week2 / An array of the currency rate objects
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
  .getElementById("brand-currency-form-beta")
  .addEventListener("submit", brandCurrencyBeta);
function brandCurrencyBeta(event) {
  event.preventDefault();

  //getting and filling objects of array------------
  const baseCurrency = document.getElementById("base-currency-beta").value;
  const quoteName = document.getElementById("quote-name-beta").value;
  const quoteRate = document.getElementById("quote-rate-beta").value;

  const selectedCurrency = brandObjectArray.find(
    (currency) => currency.base === baseCurrency
  );

  selectedCurrency.rates[quoteName] = +quoteRate;
  document.getElementById("quote-rate-beta").value = "";

  //Calling function: Display all currencies in a table
  //currencyDisplayTable();
}

/*function currencyDisplayTable() {
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

  // Create rows for each currency object
  brandObjectArray.forEach((currency) => {
    for (const quoteCurrency in currency.rates) {
      const row = table.insertRow();
      //creating 3 cells as there are 3 currencies: EUR, USD, DKK
      row.insertCell(0).textContent = currency.base;
      row.insertCell(1).textContent = quoteCurrency;
      row.insertCell(2).textContent = currency.rates[quoteCurrency];
    }
  });

  // Append the table to the grid container
  gridContainer.appendChild(table);
}*/

//--- Second part of task WEEK 2   -------------------------------------------------------------
// Getting a range for rates, searching for rates in brandObjectArray and show filterede data.
let fromRate = null;
let toRate = null;

document
  .getElementById("check-if-rate-exist")
  .addEventListener("submit", checkForRateExistancy);

document
  .getElementById("check-if-rate-exist")
  .addEventListener("reset", resetValueBoxes);

function checkForRateExistancy(event) {
  event.preventDefault();
  fromRate = document.getElementById("rate-from").value;
  toRate = document.getElementById("rate-to").value;
  filteredCurrencyDisplayTable();
}

function resetValueBoxes(event) {
  event.preventDefault();
  document.getElementById("rate-from").value = "";
  document.getElementById("rate-to").value = "";
  fromRate = null;
  toRate = null;
}

function filteredCurrencyDisplayTable() {
  const gridContainer = document.getElementById(
    "filtered-currency-rates-grid-container"
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

  // Creating rows for each filtered currency object
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
