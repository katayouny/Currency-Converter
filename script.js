// IMPLEMENTING A TIMEOUT TO SHOW THE MARKET OPENING AND CLOSING TIME
// *****************************************************************
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
    const houresLeftToClose = closingHour - currentHour;
    document.getElementById(
      "market-time-open-close-message"
    ).textContent = `The market is open now. It will be closed on ${houresLeftToClose} hours`;
    marketMessageBackground("rgb(0, 219, 0)");
  }
  if (currentHour < openingHour || currentHour > closingHour) {
    const houresLeftToOpen =
      currentHour > closingHour
        ? 24 - currentHour + 9
        : openingHour - currentHour;
    document.getElementById(
      "market-time-open-close-message"
    ).textContent = `The market is closed now. It will be opened on ${houresLeftToOpen} hours.`;
    marketMessageBackground("rgb(219, 0, 0)");
  }
}, 6000);

// THE ARRAY OF THE CURRENCY RATE OBJECTS
// **************************************
const brandObjectArray = [];
fetch(
  "https://raw.githubusercontent.com/katayouny/katayouny.github.io/main/data/currency-converter.json"
)
  .then((response) => response.json())
  .then((json) => {
    brandObjectArray.push(...json);
    setEvents();
  })
  .catch((error) => {
    setErrors(error);
  });

// The object of special rates
const specialRates = {
  EUR: {
    USD: 1.5,
    DKK: 8,
  },
  USD: {
    EUR: 1.1,
    DKK: 7,
  },
  DKK: {
    EUR: 0.3,
    USD: 0.3,
  },
};

// Running events when brandObjectArray is fetched
function setEvents() {
  document.getElementById("creating-currencies-and-rates").style.display =
    "block";
  document.getElementById("show-currencies-with-rate-check").style.display =
    "block";
  document.getElementById("currency-converter").style.display = "block";

  document
    .getElementById("currencies-and-rate-creator")
    .addEventListener("submit", brandCurrency);

  document
    .getElementById("show-currencies-with-rate-check")
    .addEventListener("submit", currencyDisplayTable);

  document
    .getElementById("show-currencies-with-rate-check")
    .addEventListener("reset", resetRateCondition);

  document
    .getElementById("valuta-converter")
    .addEventListener("submit", valutaConverter);
}

// Showing error if the brandObjectArray is not fetched
function setErrors(error) {
  document.getElementById(
    "creating-currencies-and-rates"
  ).innerHTML = `<h1>THERE IS AN ERROR</h1><p>The error is:<br/>${error}</p>`;
  document.getElementById("creating-currencies-and-rates").style.color =
    "white";
  document.getElementById("creating-currencies-and-rates").style.display =
    "block";
  document.getElementById(
    "creating-currencies-and-rates"
  ).style.backgroundColor = "red";
  document.getElementById("creating-currencies-and-rates").style.padding =
    "5px";
}

// ADDING CURRENCIES AND RATES
// ***************************
function brandCurrency(event) {
  event.preventDefault();

  // getting currencies and rates and filling brandCurrencyArray with base currency, quote currency, & conversion rates
  const baseCurrency = document.getElementById("base-currency").value;
  const quoteName = document.getElementById("quote-name").value;
  const quoteRate = document.getElementById("quote-rate").value;

  const selectedCurrency = brandObjectArray.find(
    (currency) => currency.base === baseCurrency
  );

  selectedCurrency.rates[quoteName] = +quoteRate;
  document.getElementById("quote-rate").value = "";
}

// Reseting rate conditions fields(filter)
let fromRate = null;
let toRate = null;
function resetRateCondition(event) {
  event.preventDefault();
  document.getElementById("rate-from").value = "";
  document.getElementById("rate-to").value = "";
  fromRate = null;
  toRate = null;
}

// Showing the table(grid) of currencies and rates based on applied rate range filter
// ----------------------------------------------------------------------------------
function currencyDisplayTable(event) {
  event.preventDefault();

  const gridContainer = document.getElementById(
    "currency-rates-grid-container"
  );

  // Clearing the previous content in the grid container
  gridContainer.innerHTML = "";

  // Createing the table element
  const table = document.createElement("table");
  table.style.marginBottom = "20px";

  // Createing header row
  const headerRow = table.createTHead().insertRow(0);

  headerRow.insertCell(0).textContent = "Base Currency";
  headerRow.insertCell(1).textContent = "Quote Currency";
  headerRow.insertCell(2).textContent = "Conversion Rate";
  headerRow.style.fontWeight = "bold";

  // Creatinging rows and cells for each currency object of brandObjectArray
  //   if condition sets => creating/showing rows based on rate filter
  //   + checking if currency.rates[quoteCurrency] is a specialRate => alert
  brandObjectArray.forEach((currency) => {
    for (const quoteCurrency in currency.rates) {
      const baseCurrency = currency.base;
      const currentRate = currency.rates[quoteCurrency];
      const specialRate = specialRates[baseCurrency][quoteCurrency];

      fromRate = document.getElementById("rate-from").value;
      toRate = document.getElementById("rate-to").value;

      // a callback function for creating rows and cells
      function creatingRowsAndCells() {
        // creating rows
        const row = table.insertRow();
        // creating cells
        row.insertCell(0).textContent = baseCurrency; // shows base currency
        row.insertCell(1).textContent = quoteCurrency; // shows quote currency
        // shows the conversion rate
        row.insertCell(2).textContent = `${currentRate} ${
          currentRate >= specialRate // checks if the rate is a special rate
            ? ":🔥: The conversion rate is too high today. "
            : ""
        }`;
      }
      // Check if the rate is within the specified range or if no range is specified
      if (fromRate === null && toRate === null) {
        creatingRowsAndCells();
      } else if (
        ((fromRate !== null || toRate !== null) &&
          currency.rates[quoteCurrency] >= +fromRate) ||
        ((fromRate !== null || toRate !== null) &&
          currency.rates[quoteCurrency] <= +toRate)
      ) {
        creatingRowsAndCells();
      }
    }
  });

  // Append the table to the grid container
  gridContainer.appendChild(table);
}

// Currency Converter
// ******************
function valutaConverter(event) {
  event.preventDefault();

  let convertedAmount;

  const moneyAmount = +document.getElementById("money-amount").value;
  const chosenBaseValuta = document.getElementById("the-base-currency").value;
  const chosenQuoteValuta = document.getElementById("the-quote-currency").value;

  //Checking if the base valuta and quote valuta are available
  const selectedCurrency = brandObjectArray.find(
    (currency) =>
      currency.base === chosenBaseValuta &&
      currency.rates.hasOwnProperty(chosenQuoteValuta)
  );

  if (selectedCurrency) {
    convertedAmount = moneyAmount * selectedCurrency.rates[chosenQuoteValuta];
    document.getElementById("converted-amount-value").innerHTML =
      convertedAmount.toFixed(2);
  } else {
    alert(
      "No conversion rate is available for these currencies. Select other valutas"
    );
  }
}
