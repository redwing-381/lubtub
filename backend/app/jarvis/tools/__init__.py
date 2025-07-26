# Jarvis Tools Package

"""
Calendar tools for Google Calendar integration.
"""

from .emergency_assessment import assess_emergency_situation_tool
from .cpr_guidance import provide_cpr_guidance_tool
from .bleeding_control import control_bleeding_tool
from .choking_relief import provide_choking_relief_tool
from .emotional_support import provide_emotional_support_tool
from .call_emergency_contact import call_emergency_contact_tool

__all__ = [
    "assess_emergency_situation_tool",
    "provide_cpr_guidance_tool", 
    "control_bleeding_tool",
    "provide_choking_relief_tool",
    "provide_emotional_support_tool",
    "call_emergency_contact_tool",
]
