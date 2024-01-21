# Currency-Converter

A Currency Converter application in Javascript:

A real-time market status shows wether the market is open or clesed for handling.
Based on an array of currency objects, The brandObjectArray, the APP allows users to create and manage currency exchange rates, perform currency conversions, and visualize currency rates with the option of rate range filtering.
Additionally, the APP includes an object containing special conversion rates, specialRates, witch based on that checks for special rates and displays a warning if the conversion rate is too high.

The brandObjectArray:

[
{
"timestamp": 1519296206,
"base": "EUR",
"date": "new Date().toLocaleDateString()",
"rates": {}
},
{
"timestamp": 1519296206,
"base": "USD",
"date": "new Date().toLocaleDateString()",
"rates": {}
},
{
"timestamp": 1519296206,
"base": "DKK",
"date": "new Date().toLocaleDateString()",
"rates": {}
}
]
