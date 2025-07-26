from google.adk.tools.function_tool import FunctionTool
from typing import Optional

def control_bleeding(
    bleeding_type: str,
    severity: str,
    location: Optional[str],
    materials_available: Optional[str]
) -> str:
    """
    Provide bleeding control instructions based on type and severity.
    
    Args:
        bleeding_type: Type of bleeding (minor, moderate, severe, arterial)
        severity: Severity level (light, moderate, heavy, life_threatening)
        location: Location of bleeding (head, arm, leg, torso, etc.)
        materials_available: Available materials (clean_cloth, bandages, tourniquet, etc.)
    
    Returns:
        Step-by-step bleeding control instructions
    """
    
    instructions = f"BLEEDING CONTROL - {bleeding_type.upper()} {severity.upper()}\n\n"
    
    if bleeding_type == "minor" or severity == "light":
        instructions += """MINOR BLEEDING CONTROL:
1. Wash hands thoroughly with soap and water
2. Clean the wound with mild soap and water
3. Apply direct pressure with clean cloth for 10-15 minutes
4. Apply antibiotic ointment if available
5. Cover with sterile bandage
6. Monitor for signs of infection"""
    
    elif bleeding_type == "moderate" or severity == "moderate":
        instructions += """MODERATE BLEEDING CONTROL:
1. Apply direct pressure with clean cloth or gauze
2. Elevate the injured area above heart level
3. Maintain pressure for 15-20 minutes
4. If bleeding continues, apply additional layers
5. Keep pressure until bleeding stops
6. Seek medical attention if bleeding doesn't stop"""
    
    elif bleeding_type == "severe" or severity == "heavy":
        instructions += """SEVERE BLEEDING CONTROL:
1. CALL 108 IMMEDIATELY
2. Apply direct pressure with clean cloth or gauze
3. Use both hands if necessary
4. Elevate the injured area above heart level
5. Apply pressure for 20-30 minutes
6. Do not remove soaked bandages - add more on top
7. Keep pressure until emergency help arrives"""
    
    elif bleeding_type == "arterial" or severity == "life_threatening":
        instructions += """ARTERIAL/LIFE-THREATENING BLEEDING:
1. CALL 108 IMMEDIATELY
2. Apply direct pressure with maximum force
3. Use both hands and body weight if needed
4. Elevate the injured area above heart level
5. Apply pressure for 30+ minutes
6. Do not remove soaked bandages - add more on top
7. Consider tourniquet if available and trained
8. Keep pressure until emergency help arrives
9. Monitor for signs of shock"""
    
    # Add location-specific instructions
    if location:
        if location.lower() in ["head", "face"]:
            instructions += f"\n\nSPECIAL CONSIDERATIONS FOR {location.upper()} BLEEDING:\n"
            instructions += "- Be extra careful with pressure to avoid brain injury\n"
            instructions += "- Monitor for signs of concussion or skull fracture\n"
            instructions += "- Keep person still and calm\n"
        
        elif location.lower() in ["arm", "leg"]:
            instructions += f"\n\nSPECIAL CONSIDERATIONS FOR {location.upper()} BLEEDING:\n"
            instructions += "- Elevate the limb above heart level\n"
            instructions += "- Apply pressure to the wound site\n"
            instructions += "- Monitor for numbness or tingling\n"
        
        elif location.lower() == "torso":
            instructions += f"\n\nSPECIAL CONSIDERATIONS FOR {location.upper()} BLEEDING:\n"
            instructions += "- Monitor for signs of internal bleeding\n"
            instructions += "- Watch for difficulty breathing\n"
            instructions += "- Be aware of potential organ damage\n"
    
    # Add materials guidance
    if materials_available:
        instructions += f"\n\nAVAILABLE MATERIALS: {materials_available}\n"
        if "tourniquet" in materials_available.lower():
            instructions += "- Tourniquet should only be used for life-threatening bleeding\n"
            instructions += "- Apply 2-3 inches above the wound\n"
            instructions += "- Tighten until bleeding stops\n"
            instructions += "- Note the time of application\n"
    
    instructions += "\n\nIMPORTANT REMINDERS:\n"
    instructions += "- Stay calm and reassure the person\n"
    instructions += "- Keep pressure until help arrives\n"
    instructions += "- Monitor for signs of shock\n"
    instructions += "- Do not remove soaked bandages\n"
    
    return instructions

# Create the tool instance
control_bleeding_tool = FunctionTool(func=control_bleeding) 