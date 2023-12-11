// Brand Currency form -------------
let brandObjectHistory = [];
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
      eurRate: +eurRate,
      usdRate: +usdRate,
      gpyRate: +gpyRate,
    },
  };
  brandObjectHistory.push(brandObject);

  return brandObject;
}
console.log(brandObjectHistory);

// Finding the most moving value -------------
let ValutaCountsArray = [];
let MaxValutaNumber;

document
  .querySelector("finding-the-most-moving-value_button")
  .addEventListener("click", showTheMostMovingValuta);

function showTheMostMovingValuta() {
  for (let j = 0; j < brandObjectHistory.length; j++) {
    if (brandObjectHistory[j].base === "eur") {
      eurRateMoving++;
    } else if (brandObjectHistory[j].base === "usd") {
      usdRateMoving++;
    } else if (brandObjectHistory[j].base === "gpy") {
      gpyRateMoving++;
    }
  }

  ValutaCountsArray.push(eurRateMoving, usdRateMoving, gpyRateMoving);

  if (
    eurRateMoving !== usdRateMoving &&
    eurRateMoving !== gpyRateMoving &&
    usdRateMoving !== gpyRateMoving
  ) {
    MaxValuta = Math.max(...ValutaCountsArray);

    if (MaxValutaNumber === ValutaCountsArray[0]) {
      console.log(
        `EUR with a count of ${eurRateMoving} has been the most moving valuta`
      );
    } else if (MaxValutaNumber === ValutaCountsArray[1]) {
      console.log(
        `USD with a count of ${usdRateMoving} has been the most moving valuta`
      );
    } else if (MaxValutaNumber === ValutaCountsArray[2]) {
      console.log(
        `GPY with a count of ${gpyRateMoving} has been the most moving valuta`
      );
    }
  } else {
    console.log("Two or more values has the same count");
  }
  return MaxValutaNumber;
}

/*if (eurRateMoving > usdRateMoving && eurRateMoving > gpyRateMoving) {
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
  } else if (
    gpyRateMoving === eurRateMoving ||
    gpyRateMoving === usdRateMoving ||
    eurRateMoving === gpyRateMoving
  ) {
    console.log(`equal`);
  }
}*/

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

  if (moneyAmount) {
    for (let i = 0; i < brandObjectHistory.length; i++) {
      if (
        chosenBaseValuta === "eur" &&
        chosenQuoteValuta === "usd" &&
        brandObjectHistory[i].base === "eur"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory.rate.usdRate; //convertedAmount = moneyAmount * brandObjectHistory["rate"][usdRate];
      } else if (
        chosenBaseValuta === "eur" &&
        chosenQuoteValuta === "gpy" &&
        brandObjectHistory[i].base === "eur" //brandObjectHistory["base"] === "eur"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory.rate.gpyRate; //convertedAmount = moneyAmount * brandObjectHistory["rate"][gpyRate];
      } else if (
        chosenBaseValuta === "usd" &&
        chosenQuoteValuta === "eur" &&
        brandObjectHistory[i].base === "usd"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory.rate.eurRate;
      } else if (
        chosenBaseValuta === "usd" &&
        chosenQuoteValuta === "gpy" &&
        brandObjectHistory[i].base === "usd"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory.rate.gpyRate;
      } else if (
        chosenBaseValuta === "gpy" &&
        chosenQuoteValuta === "eur" &&
        brandObjectHistory[i].base === "gpy"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory.rate.eurRate;
      } else if (
        chosenBaseValuta === "gpy" &&
        chosenQuoteValuta === "usd" &&
        brandObjectHistory[i].base === "gpy"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory.rate.usdRate;
      } else
        alert(
          `Insert the money amount for conversion. \n Choose to different valutas if you haven't`
        );
    }
    convertedAmountValue = convertedAmount;
    document.getElementById("converted-amount").innerText =
      convertedAmountValue;
    return convertedAmount;
  }
}

// updateing existing currency conversion rates with new rates form----------------console.log(convertedAmountValue);
