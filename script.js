// ------------------- Original API URL -----------------------
// const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/USD_INR.json"

const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/USD_INR.json"

const dropDowns = document.querySelectorAll(".dropdown select")

const formBtn = document.querySelector("form button");

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

const msg = document.querySelector(".msg");

for (let select of dropDowns) {
    for (code in countryList) {
        // console.log(code, countryList[code]);
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.textContent = code;
        select.append(newOption);
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";


        }
        else if (select.name === "to" && code === "PKR") {
            newOption.selected = "selected";
        }
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}
// function to update flag
const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

formBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 1) {
        alert("Please enter amount above 0");
    }

    console.log(fromCurrency.value, toCurrency.value)

    const URL = `https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/${fromCurrency.value}_${toCurrency.value}.json`;
    // const URL = `${BASE_URL}/${fromCurrency.value}_${toCurrency.value}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurrency.value];
    
    let finalAmount = amountVal * rate;

    msg.innerText = ` ${amountVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`

    //const URL = `${BASE_URL}/${fromCurrency.value}_${toCurrency.value}.json`;
    // try {
    //     let response = await fetch(URL);

    //     // Check if response is ok (status 200-299)
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     // Log the response text to see what you're getting
    //     let textData = await response.text();
    //     console.log("Raw Response:", textData);

    //     // Try parsing the response as JSON
    //     let data = JSON.parse(textData);
    //     console.log("Parsed Data:", data);

    // } catch (error) {
    //     console.error("Error fetching data:", error.message);
    // }


});