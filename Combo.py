"""

# Author: Brendon Newton
# Project: Trampoline DD Calculator
# File: Combo.py
# Last Updated: 3/7/2023

Description: This file implements the Combo class

"""

import re
from Skill import Skill


class Combo:
    combo = []
    total_dd = 0.0
    name = ""
    valid = True
    has_name = False

    def __init__(self, combo=None) -> None:
        if combo != None:
            self.combo = combo

    def parse_input(self, string) -> None:
        string = str.split(string, ",")
        for token in string:
            self.add_skill(token)


    def calculate_input(self, string) -> str:
        operators = []
        string = str.split(string, " ")

        print(len(string))

        if len(string) == 0:
            return ""

        # Adds skills and operators
        for token in string:
            if self.contains_only_operators(token):
                operators.append(token)
            else:
                self.add_skill(Skill(token))

        # If a skill is not valid, say so
        if not self.valid:
            return "Bad skill in combination"
        
        total = 0.0
        # Handles single single input
        if len(self.combo) < 2:
            if len(operators) != 0:
                return "Bad input"
            else:
                return str(round(self.combo.pop().get_dd(), 1))
        
        # Gets the sum of an equation
        else:
            for operator in operators:
                if len(self.combo) < 2:
                    return "Bad input"
                skill2 = self.combo.pop()
                skill1 = self.combo.pop()
                total += self.perform_operation(skill1, skill2, operator)

        return str(round(total, 1))

        
    def add_skill(self, skill) -> None:
        if skill.valid:
            self.combo.append(skill)
        else:
            print("Skill is not valid")
            self.valid = False


    def contains_only_operators(self, string):
        # Define a regular expression pattern to match operators
        pattern = r'^[\+\-\*/]+$'
        # Use the re.match() function to check if the string matches the pattern
        match = re.match(pattern, string)
        # If there is a match, return True (string contains only operators), otherwise return False
        return bool(match)
    

    def perform_operation(self, skill1, skill2, operation) -> float:
        if operation == "+":
            return skill1.get_dd() + skill2.get_dd()
        elif operation == "-":
            return skill1.get_dd() - skill2.get_dd()
        else:
            print("Bad operation")
            return 0.0
        

    def remove_skill(self, skill) -> None:
        if skill in self.combo:
            self.combo.remove(skill)
        else:
            print(f"{skill.name} not found in combination")


    def get_sublist(self, start, end) -> list:
        if start <= end:
            if start >= 0 and start < len(self.combo) and end >= start and end < len(self.combo):
                return self.combo[start:end]
            
    
    def calc_dd(self) -> float:
        total = 0.0
        for skill in self.combo:
            total += skill.get_dd()
        return round(total, 1)
    

    def set_name(self, name) -> None:
        self.name = name
        has_name = True

    
    def __str__(self) -> str:
        string = ""

        if self.has_name:
            string += f"{self.name}:\n\n"

        for i in range(0, len(self.combo)):
            string += f"Skill {i + 1}: {self.combo[i].skill}{self.combo[i].pos}\n"
        return string
    