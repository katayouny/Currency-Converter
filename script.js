// Brand Currency form -------------
let brandObjectHistory = [{}];
let eurRateMoving = 0;
let usdRateMoving = 0;
let gpyRateMoving = 0;

document
  .getElementById("brand-currency-form")
  .addEventListener("submit", brandCurrency);

function brandCurrency(event) {
  event.preventDefault();

  let baseCurrency = document.getElementById("base-currency").value;
  let eurRate = document.getElementById("eur").value;
  let usdRate = document.getElementById("usd").value;
  let gpyRate = document.getElementById("gpy").value;

  const brandObject = {
    timestamp: Date.now(),
    base: baseCurrency,
    date: new Date().toLocaleDateString(),
    rate: {
      eurRate: eurRate,
      usdRate: usdRate,
      gpyRate: gpyRate,
    },
  };

  brandObjectHistory.push(brandObject);
  return brandObject;
}
console.log({ brandObjectHistory }); //why the result shows that array 0 is empty. It shows an emty object !!

// Finding the most moving value -------------
for (let j = 0; j < brandObjectHistory.length; j++) {
  if (brandObjectHistory["base"] === "eur") {
    eurRateMoving = eurRateMoving + 1;
  } else if (brandObjectHistory["base"] === "usd") {
    usdRateMoving = usdRateMoving + 1;
  } else if (brandObjectHistory["base"] === "gpy") {
    gpyRateMoving = gpyRateMoving + 1;
  }
}

if (eurRateMoving > usdRateMoving && eurRateMoving > gpyRateMoving) {
  console.log(
    `EUR has the most moving rate - ${eurRateMoving} out of ${brandObjectHistory.length}`
  );
} else if (usdRateMoving > eurRateMoving && usdRateMoving > gpyRateMoving) {
  console.log(
    `USD has the most moving rate - ${usdRateMoving} out of ${brandObjectHistory.length}`
  );
} else if (gpyRateMoving > eurRateMoving && gpyRateMoving > usdRateMoving) {
  console.log(
    `USD has the most moving rate - ${gpyRateMoving} out of ${brandObjectHistory.length}`
  );
}

// Currency Converter form --------------
let convertedAmountValue;
document
  .getElementById("valuta-converter-form")
  .addEventListener("submit", valutaConverter);

function valutaConverter(event) {
  event.preventDefault();
  let convertedAmount;

  let moneyAmount = document.getElementById("money-amount").value;
  let chosenBaseValuta = document.getElementById(
    "valutas-exchange-selction-base-valuta"
  ).value;
  let chosenQuoteValuta = document.getElementById(
    "valutas-exchange-selction-quote-valuta"
  ).value;

  if (moneyAmount !== 0 && chosenBaseValuta !== chosenQuoteValuta) {
    for (let i = 0; i < brandObjectHistory.length; i++) {
      if (
        chosenBaseValuta === "eurRate" &&
        chosenQuoteValuta === "usdRate" &&
        brandObjectHistory["base"] === "eurRate"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory["rate"]["usdRate"];
      } else if (
        chosenBaseValuta === "eurRate" &&
        chosenQuoteValuta === "gpyRate" &&
        brandObjectHistory["base"] === "eurRate"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory["rate"]["gpyRate"];
      } else if (
        chosenBaseValuta === "usdRate" &&
        chosenQuoteValuta === "eurRate" &&
        brandObjectHistory["base"] === "usdRate"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory["rate"]["eurRate"];
      } else if (
        chosenBaseValuta === "usdRate" &&
        chosenQuoteValuta === "gpyRate" &&
        brandObjectHistory["base"] === "usdRate"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory["rate"]["gpyRate"];
      } else if (
        chosenBaseValuta === "gpyRate" &&
        chosenQuoteValuta === "eurRate" &&
        brandObjectHistory["base"] === "gpyRate"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory["rate"]["eurRate"];
      } else if (
        chosenBaseValuta === "gpyRate" &&
        chosenQuoteValuta === "usdRate" &&
        brandObjectHistory["base"] === "gpyRate"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory["rate"]["usdRate"];
      } else
        alert(
          `Insert the money amount for conversion. \n Choose to different valutas if you haven't`
        );
    }
  }
  convertedAmountValue = convertedAmount;
  return convertedAmount;
}

document.querySelector("converted-amount").value = convertedAmountValue;
console.log(convertedAmountValue);

// updateing existing currency conversion rates with new rates form----------------
