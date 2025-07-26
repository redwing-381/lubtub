from google.adk.tools.function_tool import FunctionTool
from typing import Optional

def assess_emergency_situation(
    emergency_type: str,
    consciousness_level: Optional[str],
    breathing_status: Optional[str],
    bleeding_status: Optional[str],
    additional_symptoms: Optional[str]
) -> str:
    """
    Assess the emergency situation by gathering critical information.
    
    Args:
        emergency_type: Type of emergency (accident, unconscious, bleeding, seizure, choking, heart_attack, panic_attack)
        consciousness_level: Level of consciousness (conscious, unconscious, semi_conscious)
        breathing_status: Breathing status (normal, labored, not_breathing, irregular)
        bleeding_status: Bleeding status (none, minor, heavy, arterial)
        additional_symptoms: Any additional symptoms or observations
    
    Returns:
        Assessment summary and next steps
    """
    
    assessment = f"EMERGENCY ASSESSMENT:\n"
    assessment += f"Type: {emergency_type}\n"
    
    if consciousness_level:
        assessment += f"Consciousness: {consciousness_level}\n"
    if breathing_status:
        assessment += f"Breathing: {breathing_status}\n"
    if bleeding_status:
        assessment += f"Bleeding: {bleeding_status}\n"
    if additional_symptoms:
        assessment += f"Additional symptoms: {additional_symptoms}\n"
    
    # Determine criticality and next steps
    if emergency_type == "unconscious" and breathing_status == "not_breathing":
        assessment += "\nCRITICAL: Person is unconscious and not breathing. Immediate CPR required."
    elif bleeding_status == "heavy" or bleeding_status == "arterial":
        assessment += "\nCRITICAL: Heavy bleeding detected. Immediate pressure and elevation required."
    elif emergency_type == "choking":
        assessment += "\nCRITICAL: Choking emergency. Heimlich maneuver may be required."
    elif emergency_type == "heart_attack":
        assessment += "\nCRITICAL: Possible heart attack. Monitor symptoms and prepare for CPR if needed."
    
    return assessment

# Create the tool instance
assess_emergency_situation_tool = FunctionTool(func=assess_emergency_situation) 