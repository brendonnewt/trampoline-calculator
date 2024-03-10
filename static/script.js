/*

* Author: Brendon Newton
* Project: Trampoline DD Calculator
* Filename: script.js
* Last Updated: 3/10/2024

Description: This file contains the general javascript functions for calculator.html

*/


/* Adds the value of the button that is pressed to the result string */
function addValue(value) {

    //Formats plus and minus signs
    if (value == "+") {value = " + "}
    else if (value == "-") {value = " - "}

    if (value == "•") {
        document.getElementById("hidden-result").value += "o";
    } else {
        document.getElementById("hidden-result").value += value;
    }
    document.getElementById("result-value").value += value;
}

/* Clears the result string */
function clearResult() {
    document.getElementById("result-value").value = "";
    document.getElementById("hidden-result").value = "";
}

/* Formats + and - when typed */
document.addEventListener("keydown", function (event) {
    if (event.key == "+") {
        event.preventDefault();
        addValue("+");
    } else if (event.key == "-") {
        event.preventDefault();
        addValue("-");
    } else if (event.key == "Enter") {
        event.preventDefault();
    }
});