"""

# Author: Brendon Newton
# Project: Trampoline DD Calculator
# File: Skill.py
# Last Updated: 3/7/2023

Description: This file implements the Skill and Position classes

"""

from enum import Enum
import math


class Position(Enum):
    TUCK = 0
    PIKE = 1
    STRAIGHT = 2

    def __str__(self) -> str:
        if self == Position.TUCK:
            return "o"
        elif self == Position.PIKE:
            return "<"
        else:
            return "/"
    

class Skill:
    skill = ""
    quarter_flips = 0
    half_twists = 0
    desired_size = 0
    dd = 0.0
    pos = None
    valid = True


    def __init__(self, skill):

        if "o" in skill:
            self.pos = Position.TUCK
        elif "<" in skill:
            self.pos = Position.PIKE
        else:
            self.pos = Position.STRAIGHT

        if not str.isdigit(skill):
            for c in skill:
                if not str.isdigit(c):
                    skill = skill.replace(c, "")

        self.skill = skill

        self.parse_name()

        if self.valid:
            self.calc_dd()
            self.dd = round(self.dd, 1)

    
    def parse_name(self) -> None:
        
        name = self.skill
        self.desired_size = self.get_desired_size(self.skill, start=0, end=1)

        # If input isn't in the desired form, adjust
        if len(self.skill) != self.desired_size: 
            name = self.adjust_size(name)

        if self.valid:
            self.set_half_twists(name)
    

    # Sets quarter_flips and returns the desired size of the skill string
    def get_desired_size(self, skill, start, end) -> int:
        
        if (not str.isdigit(skill)):
            self.valid = False
            self.name = "Bad Skill"
            return len(skill)
        
        self.quarter_flips = int(skill[start:end])

        if (self.quarter_flips == 0):
            return 2
        else:
            # Adds number of twisting spots to the indices occupied by flips
            return len(str(self.quarter_flips)) + math.ceil(self.quarter_flips / 4)
    
    
    def adjust_size(self, name) -> int:

         # If skill has no twists defined, define them
        if len(self.skill) < self.desired_size:
            name += '0'

        # If skills quarter flips are greater than two digits, adjust
        else:

            i = 1
            while len(self.skill) > self.desired_size and self.desired_size < len(self.skill):
                self.desired_size = self.get_desired_size(self.skill, start=0, end=i)
                i += 1

            # If no valid conversion can be made, the input is incorrect
            if self.desired_size > len(self.skill):
                self.valid = False

        return name
    

    def set_half_twists(self, name) -> None:
        
        # Find number of indices that need to be used in sum
        if (self.quarter_flips == 0):
            twist_indices = 2
        else:
            start_index = len(str(self.quarter_flips))
            twist_indices = math.ceil(self.get_quarter_flips() / 4)

        # Calculate sum
        for i in range(start_index, start_index + twist_indices):
            if i < len(name):
                self.half_twists += int(name[i])
            else:
                print("Bad number of twists")
    

    def calc_dd(self) -> None:

        # Handles skills <= one rotation
        if self.quarter_flips <= 4:

            # Skills <= one rotation get no position dd
            self.dd = .1 * self.quarter_flips
            self.dd += .1 * self.half_twists

            # Handles single flip bonus
            if self.quarter_flips == 4:
                self.dd += .1

                # Handles non-twisting straight/pike bonus
                if (not self.skill_is_tuck()) and self.half_twists == 0:
                    self.dd += .1
            
            # Exits after calculating the skill
            return
        
        # Calculates twists and quarter flips for all skills > one rotation
        self.dd = .1 * self.half_twists
        self.dd += .1 * self.quarter_flips

        # Gets number of full rotations
        flips = self.quarter_flips // 4

        # Adds bonus for each full rotation
        self.dd += 0.1 * flips

        # Adds position bonus for >= 2 full rotations
        if (not self.skill_is_tuck()) and flips >= 2:
            self.dd += .1 * flips

        # Adds flips bonus for >= 3 full rotations
        if flips >= 3:

            # Subtracts the first two rotations and adds the bonus
            flips -= 2
            self.dd += .1 * flips


    def skill_is_tuck(self) -> bool: return self.pos == Position.TUCK

    def set_quarter_flips(self, flips) -> None: self.quarter_flips = flips

    def get_quarter_flips(self) -> int: return self.quarter_flips

    def get_half_twists(self) -> int: return self.half_twists

    def get_dd(self) -> float: return self.dd
    
    def set_dd(self, dd) -> None: self.dd = dd

    def set_skill(self, skill) -> None: self.skill = skill
    
    def get_skill(self) -> str: return self.skill

    def get_pos(self) -> Position: return self.pos

    def set_pos(self, pos): self.pos = pos
    
    def __str__(self) -> str:
        return f"Name: {self.skill} \nDesired Size: {self.desired_size} \nDD: {self.dd} \nPosition: {self.pos} \nQuarter Flips: {self.quarter_flips} \nHalf Twists: {self.half_twists} \nValid: {self.valid}"

    def __repr__(self) -> str:
        return f"Skill(skill={self.skill}, dd={self.dd}, pos={self.pos}, quarter_flips={self.quarter_flips}, half_twists={self.half_twists}, valid={self.valid})"
    
