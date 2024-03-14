/*

* Author: Brendon Newton
* Project: Trampoline DD Calculator
* Filename: menu.js
* Last Updated: 3/11/2024

Description: This file contains the menu javascript functions for calculator.html

*/

/* Loads all previously saved combinations */
function loadCombos() {

    //Gets all combination names
    var combinations = getCookie('combinations');
    combinations = combinations ? combinations.split(',') : [];

    //Creates a button for each combination
    for (var i = 0; i < combinations.length; i++) {
        var menu = document.getElementById('menu');

        //Creates the button
        var newButton = document.createElement('button');
        newButton.textContent = combinations[i];

        //Adds functionality to the button
        newButton.onclick = function(event) {
            event.preventDefault();
            var combo = getCookie(this.textContent);
            combo = combo.replace(/,/g, ' + ');
            document.getElementById('hidden-result').value = combo.replace(/•/g, 'o');
            document.getElementById('result-value').value = combo;
            closeMenu();
        };

        //Adds the button to the menu
        document.getElementById('menu').appendChild(newButton);
    }

};

/* Toggles the visibility of the menu */
function toggleMenu() {
    var menu = document.getElementById('menu');
    closePrompts();
    //Shows the menu
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        document.getElementById('menu-header').classList.add('flex');
        loadCombos();
        refreshInfo();
    //Hides the menu
    } else {
        closeMenu();
    }
};

/* Closes the menu */
function closeMenu() {
    //Hides the menu
    var menu = document.getElementById('menu');
    menu.classList.add('hidden');
    menu.classList.remove('flex');

    //Gets list of combinations
    var combinations = getCookie('combinations');
    combinations = combinations ? combinations.split(',') : [];

    //Removes all buttons from the menu
    for (var i = 0; i < combinations.length; i++) {
        document.getElementById('menu').lastChild.remove();
    }
};

function closePrompts() {
    //Close all prompts with class prompt and their panels
    var prompts = document.getElementsByClassName('prompt');
    for (var i = 0; i < prompts.length; i++) {
        prompts[i].classList.add('hidden');
        prompts[i].classList.remove('flex');
    }
    var panels = document.getElementsByClassName('panel');
    for (var i = 0; i < panels.length; i++) {
        panels[i].classList.remove('flex');
    }
}

/* Refreshes the input fields */
function refreshInfo() {
    //Resets the input fields
    document.getElementById('name-input').value = "";
    document.getElementById('combo-input').value = "";
    document.getElementById('hidden-combo').value = "";
    document.getElementById('remove-input').value = "";
    document.getElementById('name-head').innerHTML = "Enter a name for your combination";
    document.getElementById('combo-head').innerHTML = "Add a skill to your combination";
    document.getElementById('remove-head').innerHTML = "Enter the name of the combination to remove";
}

/* Adds a combination to the menu, goes to submitName() */
function addCombination() {
    closeMenu();
    //Shows the name prompt
    document.getElementById('name-prompt').classList.remove('hidden');
    document.getElementById('name-prompt').classList.add('flex');
    document.getElementById('name-panel').classList.add('flex');
}

/* Removes a combination from the menu */
function removeCombination() {
    closeMenu();
    if (getCookie('combinations') == "") {
        //Display remove-failed prompt
        document.getElementById('no-combinations').classList.remove('hidden');
        document.getElementById('no-combinations').classList.add('flex');
        document.getElementById('no-combinations-panel').classList.add('flex');
        return;
    }

    var combinations = getCookie('combinations').split(',');
    var select = document.getElementById('remove-select');
    for (var i = 0; i < combinations.length; i++) {
        var option = document.createElement('option');
        option.value = combinations[i];
        option.text = combinations[i];
        select.add(option);
    }

    document.getElementById('remove-selection').classList.remove('hidden');
    document.getElementById('remove-selection').classList.add('flex');
    document.getElementById('remove-panel').classList.add('flex');
}

/* Edits a combination from the menu */
function editCombination() {
    closeMenu();
    if (getCookie('combinations') == "") {
        //Display remove-failed prompt
        document.getElementById('no-combinations').classList.remove('hidden');
        document.getElementById('no-combinations').classList.add('flex');
        document.getElementById('no-combinations-panel').classList.add('flex');
        return;
    }

    var combinations = getCookie('combinations').split(',');
    var select = document.getElementById('edit-select');
    for (var i = 0; i < combinations.length; i++) {
        var option = document.createElement('option');
        option.value = combinations[i];
        option.text = combinations[i];
        select.add(option);
    }

    document.getElementById('edit-selection').classList.remove('hidden');
    document.getElementById('edit-selection').classList.add('flex');
    document.getElementById('edit-panel').classList.add('flex');
}

function submitEditSelect() {
    //Hides the edit selection
    document.getElementById('edit-selection').classList.add('hidden');
    document.getElementById('edit-selection').classList.remove('flex');
    document.getElementById('edit-panel').classList.remove('flex');

    //Set edit-name-input to name of combination being edited
    var selectedOption = document.getElementById('edit-select').value;
    document.getElementById('edit-name-input').value = selectedOption;

    //Shows the edit prompt
    document.getElementById('edit-combo-name').classList.remove('hidden');
    document.getElementById('edit-combo-name').classList.add('flex');
    document.getElementById('edit-combo-name-panel').classList.add('flex');

}

function submitEdit() {
    //Closes the edit-combo name prompt
    document.getElementById('edit-combo-name').classList.add('hidden');
    document.getElementById('edit-combo-name').classList.remove('flex');
    document.getElementById('edit-combo-name-panel').classList.remove('flex');

    //Adds each skill from the combination to the skill-select
    var combo = getCookie(document.getElementById('edit-select').value);
    combo = combo.split(',');
    var select = document.getElementById('skill-select');
    for (var i = 0; i < combo.length; i++) {
        var option = document.createElement('option');
        option.value = combo[i];
        option.text = combo[i];
        select.add(option);
    }

    //Shows the edit-combo prompt
    document.getElementById('edit-combo').classList.remove('hidden');
    document.getElementById('edit-combo').classList.add('flex');
    document.getElementById('edit-combo-panel').classList.add('flex');
}

function editSkill() {
    //Hides the edit-combo prompt
    document.getElementById('edit-combo').classList.add('hidden');
    document.getElementById('edit-combo').classList.remove('flex');
    document.getElementById('edit-combo-panel').classList.remove('flex');

    //Sets the value of the skill to the selected skill
    var selectedOption = document.getElementById('skill-select').value;
    document.getElementById('edit-skill-input').value = selectedOption;

    //Shows the edit-skill prompt
    document.getElementById('edit-skill').classList.remove('hidden');
    document.getElementById('edit-skill').classList.add('flex');
    document.getElementById('edit-skill-panel').classList.add('flex');
}

function cancelEditSkill() {
    //Hides the edit-skill prompt
    document.getElementById('edit-skill').classList.add('hidden');
    document.getElementById('edit-skill').classList.remove('flex');
    document.getElementById('edit-skill-panel').classList.remove('flex');

    //Shows the edit-combo prompt
    document.getElementById('edit-combo').classList.remove('hidden');
    document.getElementById('edit-combo').classList.add('flex');
    document.getElementById('edit-combo-panel').classList.add('flex');
}

function submitEditSkill() {
    //Hides the edit-skill prompt
    document.getElementById('edit-skill').classList.add('hidden');
    document.getElementById('edit-skill').classList.remove('flex');
    document.getElementById('edit-skill-panel').classList.remove('flex');

    //Replaces the old skill option with the new skill in skill-select
    var select = document.getElementById('skill-select');
    var option = document.createElement('option');
    option.value = document.getElementById('edit-skill-input').value;
    option.text = document.getElementById('edit-skill-input').value;
    //Adds new skill in the spot of the old skill
    select.add(option, select.selectedIndex);
    //Removes the old skill
    select.remove(select.selectedIndex);

    //Resets the input field
    document.getElementById('edit-skill-input').value = "";

    //Shows the edit-combo prompt
    document.getElementById('edit-combo').classList.remove('hidden');
    document.getElementById('edit-combo').classList.add('flex');
    document.getElementById('edit-combo-panel').classList.add('flex');
}

/* Gets user selection of combination to be removed */
function submitRemoveSelect() {
    //Set output to name of combination being removed
    var selectedOption = document.getElementById('remove-select').value;
    document.getElementById('remove-name').innerHTML = selectedOption;

    document.getElementById('remove-selection').classList.add('hidden');
    document.getElementById('remove-selection').classList.remove('flex');
    document.getElementById('remove-panel').classList.remove('flex');

    document.getElementById('remove-prompt').classList.remove('hidden');
    document.getElementById('remove-prompt').classList.add('flex');
    document.getElementById('remove-panel').classList.add('flex');
}

function submitEditCombo() {
    //Hides the edit-combo prompt
    document.getElementById('edit-combo').classList.add('hidden');
    document.getElementById('edit-combo').classList.remove('flex');
    document.getElementById('edit-combo-panel').classList.remove('flex');

    //Sets the name and value of the combination
    var newName = document.getElementById('edit-name-input').value;
    hiddenCombo = "";
    
    var select = document.getElementById('skill-select');
    for (var i = 0; i < select.length; i++) {
        if (hiddenCombo == "") {hiddenCombo = select[i].value;}
        else {hiddenCombo += "," + select[i].value;}
    }
    
    //Replace the old combination with the new combination
    var oldName = document.getElementById('edit-select').value;
    setCookie(newName, hiddenCombo, 30);
    if (newName != oldName) {
        setCookie(oldName, "", 0);
    }

    //Adds it to combinations list
    var combinations = getCookie('combinations');
    
    combinations = combinations.replace(oldName, newName);
    setCookie('combinations', combinations, 30);

    //Shows the edit-add prompt
    document.getElementById('edit-add').classList.remove('hidden');
    document.getElementById('edit-add').classList.add('flex');
    document.getElementById('edit-add-panel').classList.add('flex');
}

/* Removes the cookie for the combination */
function removeCombinationCookie() {
    var selectedOption = document.getElementById('remove-select').value;
    var combinations = getCookie('combinations').split(',');
    var index = combinations.indexOf(selectedOption);

    //Checks if the name is valid and removes it from combinations list
    if (index > -1) {
        combinations.splice(index, 1);
    }

    //Resets combinations cookie and removes the combination cookie
    setCookie('combinations', combinations, 30);
    setCookie(selectedOption, "", 0);

    //Hides the remove prompt
    document.getElementById('remove-selection').classList.add('hidden');
    document.getElementById('remove-selection').classList.remove('flex');
    document.getElementById('remove-panel').classList.remove('flex');

    //Refreshes the page
    document.getElementById('calculator-form').submit();
}

/* Submits the name for the combination, goes to submitSkill() */
function submitName() {
    //Checks if the name is empty
    if (document.getElementById('name-input').value == "") {
        document.getElementById('name-head').innerHTML = "Please enter a name";
        return;
    } else {
        document.getElementById('name-head').innerHTML = "Name your combination";
    }

    var name = document.getElementById('name-input').value;

    //Checks if the name is already taken
    var combinations = getCookie('combinations').split(',');
    if (combinations.includes(name)) {
        document.getElementById('name-head').innerHTML = "Name is already taken";
        return;
    }

    //Hides the name prompt
    document.getElementById('name-prompt').classList.add('hidden');
    document.getElementById('name-prompt').classList.remove('flex');
    document.getElementById('name-panel').classList.remove('flex');

    //Shows the combo prompt
    document.getElementById('combo-prompt').classList.remove('hidden');
    document.getElementById('combo-prompt').classList.add('flex');
    document.getElementById('combo-panel').classList.add('flex');
}

/* Submits a skill to the combination, goes to submitCombo() */
function submitSkill() {
    //Checks if the skill is empty
    if (document.getElementById('combo-input').value == "") {
        document.getElementById('combo-head').innerHTML = "Please enter a skill";
        return;
    } else {
        document.getElementById('combo-head').innerHTML = "Add a skill to your combination";
    }

    //Adds the skill to the hidden combo
    var hiddenCombo = document.getElementById('hidden-combo');
    var skill = document.getElementById('combo-input').value;

    //Formats the skill
    if (hiddenCombo.value == "") {hiddenCombo.value = skill}
    else {hiddenCombo.value += "," + skill;}

    //Resets the input field
    document.getElementById('combo-input').value = "";
}

/* Submits the combination to the menu, goes to submitAdd() */
function submitCombo() {
    //Checks if the combo is empty
    if (document.getElementById('hidden-combo').value == "") {
        document.getElementById('combo-head').innerHTML = "Cannot create empty combo";
        return;
    }
    //Hides the combo prompt
    document.getElementById('combo-prompt').classList.remove('flex');
    document.getElementById('combo-prompt').classList.add('hidden');
    
    //Sets the name and value of the combination
    var nameDisplay = document.getElementById('name-input');
    document.getElementById('combo-name').value = "Name: " + nameDisplay.value;
    var hiddenCombo = document.getElementById('hidden-combo');
    document.getElementById('combo-value').value = "Skills: " + hiddenCombo.value;

    //Shows the add prompt
    document.getElementById('add-prompt').classList.remove('hidden');
    document.getElementById('add-prompt').classList.add('flex');
    document.getElementById('add-panel').classList.add('flex');
}

/* Makes a cookie for the combination */
function submitAdd() {
    //Gets the name and value of the combination
    var name = document.getElementById('name-input').value;
    var combo = document.getElementById('hidden-combo').value;
    setCookie(name, combo, 30);

    //Adds the name to the combinations list
    var combinations = getCookie('combinations');
    if (combinations) {
        combinations += ',' + name;
    } else {
        combinations = name;
    }
    setCookie('combinations', combinations, 30);

    //Hides the add prompt and refreshes the page
    document.getElementById('add-prompt').classList.add('hidden');
    document.getElementById('add-prompt').classList.remove('flex');
    document.getElementById('add-panel').classList.remove('flex');
    document.getElementById('calculator-form').submit();
}

/* Sets a cookie for a combination */
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