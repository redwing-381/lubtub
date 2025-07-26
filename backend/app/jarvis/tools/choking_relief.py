from google.adk.tools.function_tool import FunctionTool
from typing import Optional

def provide_choking_relief(
    victim_age: str,
    consciousness_level: str,
    current_attempt: Optional[int]
) -> str:
    """
    Provide choking relief instructions including Heimlich maneuver.
    
    Args:
        victim_age: Age group (adult, child, infant, pregnant)
        consciousness_level: Level of consciousness (conscious, unconscious)
        current_attempt: Current attempt number for guidance
    
    Returns:
        Step-by-step choking relief instructions
    """
    
    if consciousness_level == "conscious":
        if victim_age == "adult":
            if current_attempt:
                return f"""HEIMLICH MANEUVER - ADULT (Attempt {current_attempt}):
1. Stand behind the person
2. Wrap your arms around their waist
3. Make a fist with one hand
4. Place fist above navel, below ribcage
5. Grasp fist with other hand
6. Give quick, upward thrusts
7. Continue until object is expelled or person becomes unconscious
8. If unsuccessful after 5 attempts, call 108 immediately"""
            else:
                return """CHOKING RELIEF - ADULT:
1. Ask: "Are you choking?" (if they can speak, they're not choking)
2. If they nod yes, call 108 immediately
3. Perform Heimlich maneuver:
   - Stand behind person
   - Wrap arms around waist
   - Make fist above navel
   - Give upward thrusts
4. Continue until object is expelled or person becomes unconscious"""
        
        elif victim_age == "child":
            return """CHOKING RELIEF - CHILD (1-8 years):
1. Ask: "Are you choking?"
2. Call 108 immediately
3. Perform Heimlich maneuver:
   - Kneel behind child
   - Wrap arms around waist
   - Make fist above navel
   - Give upward thrusts
4. Continue until object is expelled or child becomes unconscious
5. Be gentler than with adults"""
        
        elif victim_age == "infant":
            return """CHOKING RELIEF - INFANT (under 1 year):
1. Call 108 immediately
2. DO NOT perform Heimlich maneuver on infants
3. Use back blows and chest thrusts:
   - Hold infant face down on your forearm
   - Support head and neck
   - Give 5 back blows between shoulder blades
   - Turn infant face up
   - Give 5 chest thrusts with 2 fingers
4. Continue cycle until object is expelled or infant becomes unconscious"""
        
        elif victim_age == "pregnant":
            return """CHOKING RELIEF - PREGNANT PERSON:
1. Ask: "Are you choking?"
2. Call 108 immediately
3. Modified Heimlich maneuver:
   - Stand behind person
   - Place hands higher on chest (above baby bump)
   - Give chest thrusts instead of abdominal thrusts
4. Continue until object is expelled or person becomes unconscious"""
    
    elif consciousness_level == "unconscious":
        return """UNCONSCIOUS CHOKING VICTIM:
1. Call 108 immediately
2. Lower person to ground carefully
3. Begin CPR:
   - 30 chest compressions
   - Check mouth for object
   - Remove object if visible
   - Give 2 rescue breaths
4. Continue CPR cycle until help arrives
5. Check for object after each set of compressions"""
    
    return "Please specify victim age (adult, child, infant, pregnant) and consciousness level for appropriate choking relief guidance."

# Create the tool instance
provide_choking_relief_tool = FunctionTool(func=provide_choking_relief) 