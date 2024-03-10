/*

* Author: Brendon Newton
* Project: Trampoline DD Calculator
* Filename: menu.js
* Last Updated: 3/9/2024

Description: This file contains the menu javascript functions for calculator.html

*/
function loadCombos() {
    var combinations = getCookie('combinations');
    combinations = combinations ? combinations.split(',') : [];
    for (var i = 0; i < combinations.length; i++) {
        var newButton = document.createElement('button');
        newButton.textContent = combinations[i];
        newButton.onclick = function() {
            var combo = getCookie(this.textContent).split('=')[1];
            document.getElementById('hidden-result').value = combo.replace(/•/g, 'o');
            document.getElementById('result-value').value = combo;
        };
        document.getElementById('menu').appendChild(newButton);
    }
};

/* Toggles the visibility of the menu */
function toggleMenu() {
    var menu = document.getElementById('menu');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        document.getElementById('menu-header').classList.add('flex');
        loadCombos();
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
    }
};

function closeMenu() {
    var menu = document.getElementById('menu');
    menu.classList.add('hidden');
    menu.classList.remove('flex');
};

function refreshInfo() {
    document.getElementById('')
}

/* Adds a combination to the menu, goes to submitName() */
function addCombination() {
    closeMenu();
    document.getElementById('name-prompt').classList.remove('hidden');
    document.getElementById('name-prompt').classList.add('flex');
}

function removeCombination() {
    closeMenu();
    document.getElementById('remove-prompt').classList.remove('hidden');
    document.getElementById('remove-prompt').classList.add('flex');
}

function submitRemove() {
    var name = document.getElementById('remove-input').value;
    var combinations = getCookie('combinations').split(',');
    var index = combinations.indexOf(name);
    if (index > -1) {
        combinations.splice(index, 1);
    }
    setCookie('combinations', combinations, 30);
    setCookie(name, "", 0);
    document.getElementById('remove-prompt').classList.add('hidden');
    document.getElementById('remove-prompt').classList.remove('flex');
    document.getElementById('calculator-form').submit();
}

function cancelRemove() {
    document.getElementById('remove-prompt').classList.add('hidden');
    document.getElementById('remove-prompt').classList.remove('flex');
}

/* Submits the name for the combination, goes to submitSkill() */
function submitName() {
    if (document.getElementById('name-input').value == "") {
        document.getElementById('name-head').innerHTML = "Please enter a name";
        return;
    } else {
        document.getElementById('name-head').innerHTML = "Name your combination";
    }

    /* TODO: Add a check for if the name is already taken */

    document.getElementById('name-prompt').classList.add('hidden');
    document.getElementById('name-prompt').classList.remove('flex');

    document.getElementById('combo-prompt').classList.remove('hidden');
    document.getElementById('combo-prompt').classList.add('flex');
}

function cancelName() {
    document.getElementById('name-input').value = "";
    document.getElementById('name-prompt').classList.add('hidden');
    document.getElementById('name-prompt').classList.remove('flex');
}

/* Submits a skill to the combination, goes to submitCombo() */
function submitSkill() {
    if (document.getElementById('combo-input').value == "") {
        document.getElementById('combo-head').innerHTML = "Please enter a skill";
        return;
    } else {
        document.getElementById('combo-head').innerHTML = "Add a skill to your combination";
    }

    var hiddenCombo = document.getElementById('hidden-combo');
    var skill = document.getElementById('combo-input').value;
    if (hiddenCombo.value == "") {hiddenCombo.value = skill}
    else {hiddenCombo.value += "," + skill;}
    document.getElementById('combo-input').value = "";
}

/* Submits the combination to the menu, goes to submitAdd() */
function submitCombo() {

    document.getElementById('combo-prompt').classList.remove('flex');
    document.getElementById('combo-prompt').classList.add('hidden');
    

    var nameDisplay = document.getElementById('name-input');
    document.getElementById('combo-name').value = "Name: " + nameDisplay.value;

    var hiddenCombo = document.getElementById('hidden-combo');
    document.getElementById('combo-value').value = hiddenCombo.value;

    document.getElementById('add-prompt').classList.remove('hidden');
    document.getElementById('add-prompt').classList.add('flex');
}

function cancelAdd() {
    document.getElementById('hidden-combo').value = "";
    document.getElementById('combo-input').value = "";
    document.getElementById('name-prompt').value = "";
    document.getElementById('add-prompt').classList.add('hidden');
    document.getElementById('add-prompt').classList.remove('flex');
}

/* Makes a cookie for the combination */
function submitAdd() {
    var name = document.getElementById('name-input').value;
    var combo = document.getElementById('hidden-combo').value;
    setCookie(name, combo, 30);
    var combinations = getCookie('combinations');
    if (combinations) {
        combinations += ',' + name;
    } else {
        combinations = name;
    }
    setCookie('combinations', combinations, 30);

    document.getElementById('add-prompt').classList.add('hidden');
    document.getElementById('add-prompt').classList.remove('flex');
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