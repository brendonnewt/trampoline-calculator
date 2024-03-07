/*

* Author: Brendon Newton
* Project: Trampoline DD Calculator
* Filename: script.js
* Last Updated: 3/7/2024

Description: This file contains the javascript functions for calculator.html

*/

/* Adds the value of the button that is pressed to the result string */
function addValue(value) {

    //Formats plus and minus signs
    if (value == "+") {value = " + "}
    else if (value == "-") {value = " - "}

    document.getElementById("result-value").value += value;
}

/* Formats + and - when typed */
document.addEventListener("keydown", function (event) {
    if (event.key === "+") {
        event.preventDefault();
        addPlus();
    } else if (event.key == "-") {
        event.preventDefault();
        addMinus();
    }
});

/* Clears the result string */
function clearResult() {
    //document.getElementById("result-field").innerHTML = "";
    document.getElementById("result-value").value = "";
}

/* Sets a coockie for a combination */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* Gets a cookie for a combination */
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* Checks if a combination has a cookie */
function checkCookie() {
    let combo = getCookie("name");
    if (combo != "") {
        //Modify this to return the result of the combo's sum
    } else {
        //TODO: Display combo name is invalid
    }
}