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
  console.log("List of inserted currency from Brand Currency Form:");
  console.log(brandObject.rates);
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
// Week2 / An aaray of the currency rate objects
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

  if (baseCurrency === "EUR") {
    brandObjectArray[0].rates[quoteName] = +quoteRate;
  } else if (baseCurrency === "USD") {
    brandObjectArray[1].rates[quoteName] = +quoteRate;
  } else if (baseCurrency === "DKK") {
    brandObjectArray[2].rates[quoteName] = +quoteRate;
  }
  document.getElementById("quote-rate-beta").value = "";
  console.log(brandObjectArray);

  //Calling function: Display all base currencies and their rates
  displayBaseAndQuoteCurrenciesAndRates();
  //Calling function: Display currencies in table
  CurrencyDisplayTable();
}

//Function: checking base currency and showing existing quotes and rate for each base ---------
function displayBaseAndQuoteCurrenciesAndRates() {
  console.log("Displaying the Base and Quote currencies and conversion rates:");
  for (currency of brandObjectArray) {
    if (currency.base === "EUR") {
      console.log("EUR base:");
      console.log(currency.rates);
    } else if (currency.base === "USD") {
      console.log("USD base:");
      console.log(currency.rates);
    } else {
      console.log("DKK base:");
      console.log(currency.rates);
      //console.log(`${currency.rates}`);  Why this ${currency.rates} doesn't work?! It gives [Object Object]
    }
  }
}
//How can I use filter instead of these two lines ??
//Is his one correct?
//brandObjectArray.forEach( (currency) => {
//if......});

function CurrencyDisplayTable() {
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

  // Create rows for each currency rate object
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
}
