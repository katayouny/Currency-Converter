// IMPLEMENTING AN INTERVAL TO SHOW THE MARKET OPENING AND CLOSING TIME
// *****************************************************************
function marketMessageBackground(color) {
  document.getElementById(
    "market-message-background-color"
  ).style.backgroundColor = color; //background color of Market message
}

setInterval(() => {
  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const openingHour = 9;
  const closingHour = 17;

  if (currentHour > openingHour && currentHour < closingHour) {
    const houresLeftToClose = closingHour - currentHour;
    const minutesLeftToClose = 60 - currentMinutes;
    document.getElementById(
      "market-time-open-close-message"
    ).textContent = `The market is open now. \n 
    It will be closed on ${houresLeftToClose} hours and ${minutesLeftToClose} minuites`;
    marketMessageBackground("rgb(0, 219, 0)");
  }
  if (currentHour < openingHour || currentHour > closingHour) {
    const houresLeftToOpen =
      currentHour > closingHour
        ? 24 - currentHour + 9
        : openingHour - currentHour;
    const minutesLeftToOpen = currentMinutes;
    document.getElementById(
      "market-time-open-close-message"
    ).textContent = `The market is closed now. \n 
    It will be opened on ${houresLeftToOpen} hours and ${minutesLeftToOpen} minuites`;
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

// THE OBJECT OF SPECIAL RATES
// ***************************
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

// Displaying forms and running events when brandObjectArray is fetched
// -----------------------------------------------------------------
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

// Displaying error if the 'brandObjectArray' is not fetched
// ---------------------------------------------------------
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

  // getting currencies and rates and filling 'brandObjectArray' with base currency, quote currency, & conversion rates
  const baseCurrency = document.getElementById("base-currency").value;
  const quoteName = document.getElementById("quote-name").value;
  const quoteRate = document.getElementById("quote-rate").value;

  const selectedCurrency = brandObjectArray.find(
    (currency) => currency.base === baseCurrency
  );

  selectedCurrency.rates[quoteName] = +quoteRate;
  document.getElementById("quote-rate").value = "";
}

// DISPLAYING CURRENCIES AND RATES TABLE + SETTING AND RESETTING RATE FILTER
// *************************************************************************
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

  // Createing header row and header cells
  const headerRow = table.createTHead().insertRow(0);
  headerRow.insertCell(0).textContent = "Base Currency";
  headerRow.insertCell(1).textContent = "Quote Currency";
  headerRow.insertCell(2).textContent = "Conversion Rate";
  headerRow.style.fontWeight = "bold";

  // Creatinging rows and cells for each currency object of brandObjectArray and realated conversion rates
  // -----------------------------------------------------------------------------------------------------
  //   if filter sets => creating/showing rows based on rate filter

  brandObjectArray.forEach((currency) => {
    for (const quoteCurrency in currency.rates) {
      const baseCurrency = currency.base;
      const currentRate = currency.rates[quoteCurrency];
      const specialRate = specialRates[baseCurrency][quoteCurrency];

      fromRate = document.getElementById("rate-from").value || 0;
      toRate = document.getElementById("rate-to").value || 10000;

      // Check if current rate is within the specified range or if no rate filter is applied
      if (currentRate >= fromRate && currentRate <= toRate) {
        // creating row
        const row = table.insertRow();
        // creating cells
        row.insertCell(0).textContent = baseCurrency; // shows base currency
        row.insertCell(1).textContent = quoteCurrency; // shows quote currency
        // shows the conversion rate, if currency.rates[quoteCurrency] is a specialRate => alert
        row.insertCell(2).textContent = `${currentRate} ${
          currentRate >= specialRate // checks if the rate is a special rate
            ? ":🔥: The conversion rate is too high today. "
            : ""
        }`;
      }
    }
  });
  // Append the table to the grid container
  gridContainer.appendChild(table);
}
// Reseting rate filter to null
let fromRate = null;
let toRate = null;

function resetRateCondition(event) {
  event.preventDefault();
  document.getElementById("rate-from").value = "";
  document.getElementById("rate-to").value = "";
  fromRate = null;
  toRate = null;
  currencyDisplayTable(event);
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
