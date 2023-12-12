// Brand Currency form -------------
let brandObjectHistory = [];

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
document
  .getElementById("finding-the-most-moving-valuta")
  .addEventListener("click", showTheMostMovingValuta);
let mostMovingValutaCount;

function showTheMostMovingValuta(event) {
  event.preventDefault();

  let eurRateMoving = 0;
  let usdRateMoving = 0;
  let gpyRateMoving = 0;
  let ValutaCountsArray = [];

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
    mostMovingValutaCount = Math.max(...ValutaCountsArray);

    if (mostMovingValutaCount === ValutaCountsArray[0]) {
      document.getElementById(
        "showing-moving-valuta"
      ).innerHTML = `EUR with a count of ${eurRateMoving} has been the most moving valuta`;
      console.log(
        `EUR with a count of ${eurRateMoving} has been the most moving valuta`
      );
    } else if (mostMovingValutaCount === ValutaCountsArray[1]) {
      document.getElementById(
        "showing-moving-valuta"
      ).innerHTML = `USD with a count of ${usdRateMoving} has been the most moving valuta`;
      console.log(
        `USD with a count of ${usdRateMoving} has been the most moving valuta`
      );
    } else if (mostMovingValutaCount === ValutaCountsArray[2]) {
      document.getElementById(
        "showing-moving-valuta"
      ).innerHTML = `GPY with a count of ${gpyRateMoving} has been the most moving valuta`;
      console.log(
        `GPY with a count of ${gpyRateMoving} has been the most moving valuta`
      );
    }
  } else {
    console.log("Two or more values has the same moving count");
  }
  return mostMovingValutaCount;
}

// Currency Converter form --------------
document
  .getElementById("valuta-converter-form")
  .addEventListener("submit", valutaConverter);

function valutaConverter(event) {
  event.preventDefault();

  let convertedAmount;

  let moneyAmount = +document.getElementById("money-amount").value;
  let chosenBaseValuta = document.getElementById(
    "valutas-exchange-selction-base-valuta"
  ).value;
  let chosenQuoteValuta = document.getElementById(
    "valutas-exchange-selction-quote-valuta"
  ).value;

  if (document.getElementById("money-amount").value.trim() !== "") {
    for (let i = 0; i < brandObjectHistory.length; i++) {
      if (
        chosenBaseValuta === "eur" &&
        chosenQuoteValuta === "usd" &&
        brandObjectHistory[i].base === "eur"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory[i].rate.usdRate;
      } else if (
        chosenBaseValuta === "eur" &&
        chosenQuoteValuta === "gpy" &&
        brandObjectHistory[i].base === "eur"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory[i].rate.gpyRate;
      } else if (
        chosenBaseValuta === "usd" &&
        chosenQuoteValuta === "eur" &&
        brandObjectHistory[i].base === "usd"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory[i].rate.eurRate;
      } else if (
        chosenBaseValuta === "usd" &&
        chosenQuoteValuta === "gpy" &&
        brandObjectHistory[i].base === "usd"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory[i].rate.gpyRate;
      } else if (
        chosenBaseValuta === "gpy" &&
        chosenQuoteValuta === "eur" &&
        brandObjectHistory[i].base === "gpy"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory[i].rate.eurRate;
      } else if (
        chosenBaseValuta === "gpy" &&
        chosenQuoteValuta === "usd" &&
        brandObjectHistory[i].base === "gpy"
      ) {
        convertedAmount = moneyAmount * brandObjectHistory[i].rate.usdRate;
      } else
        alert(
          `Insert the money amount for conversion. \n Choose to different valutas if you haven't`
        );
    }
  } else {
    console.log(
      "The money amount field is empty. Please insert a value for conversion"
    );
  }
  document.getElementById("converted-amount").innerHTML = convertedAmount; //why it is not shown?
  return convertedAmount;
}

// updateing existing currency conversion rates with new rates form----------------console.log(convertedAmountValue);
