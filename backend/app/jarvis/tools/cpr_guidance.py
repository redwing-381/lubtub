from google.adk.tools.function_tool import FunctionTool
from typing import Optional

def provide_cpr_guidance(
    victim_age: str,
    current_step: Optional[str],
    compression_count: Optional[int]
) -> str:
    """
    Provide step-by-step CPR guidance for different age groups.
    
    Args:
        victim_age: Age group (adult, child, infant)
        current_step: Current step in CPR process (check_response, call_help, compressions, breaths)
        compression_count: Current compression count for timing guidance
    
    Returns:
        CPR instructions and next steps
    """
    
    if victim_age == "adult":
        if current_step == "check_response":
            return """STEP 1: Check for response
1. Tap the person's shoulder firmly
2. Ask loudly: "Are you okay?"
3. Check for breathing by looking, listening, and feeling
4. If no response and not breathing, start CPR immediately"""
        
        elif current_step == "call_help":
            return """STEP 2: Call for help
1. Call emergency services (108) immediately
2. Put phone on speaker if possible
3. Continue with CPR while help is on the way"""
        
        elif current_step == "compressions":
            if compression_count:
                return f"""STEP 3: Chest Compressions (Count: {compression_count})
1. Place both hands in center of chest (between nipples)
2. Push hard and fast - 2 inches deep
3. Allow chest to recoil completely
4. Rate: 100-120 compressions per minute
5. Count: {compression_count}/30 compressions
6. Next: Give 2 rescue breaths"""
            else:
                return """STEP 3: Start Chest Compressions
1. Place both hands in center of chest (between nipples)
2. Push hard and fast - 2 inches deep
3. Allow chest to recoil completely
4. Rate: 100-120 compressions per minute
5. Count: 1/30 compressions
6. Next: Give 2 rescue breaths"""
        
        elif current_step == "breaths":
            return """STEP 4: Rescue Breaths
1. Tilt head back, lift chin
2. Pinch nose closed
3. Give 2 breaths (1 second each)
4. Watch chest rise with each breath
5. Return to compressions immediately
6. Continue cycle: 30 compressions, 2 breaths"""
        
        else:
            return """CPR FOR ADULTS - COMPLETE GUIDE:
1. Check response and breathing
2. Call 108 immediately
3. Start chest compressions: 30 compressions
4. Give 2 rescue breaths
5. Continue cycle until help arrives
6. Rate: 100-120 compressions per minute
7. Depth: 2 inches for adults"""
    
    elif victim_age == "child":
        return """CPR FOR CHILDREN (1-8 years):
1. Check response and breathing
2. Call 108 immediately
3. Use one or two hands for compressions
4. Compress 1.5 inches deep
5. Rate: 100-120 compressions per minute
6. 30 compressions, 2 breaths cycle"""
    
    elif victim_age == "infant":
        return """CPR FOR INFANTS (under 1 year):
1. Check response and breathing
2. Call 108 immediately
3. Use 2 fingers for compressions
4. Compress 1.5 inches deep
5. Rate: 100-120 compressions per minute
6. 30 compressions, 2 breaths cycle
7. Be very gentle with compressions"""
    
    return "Please specify victim age (adult, child, infant) for appropriate CPR guidance."

# Create the tool instance
provide_cpr_guidance_tool = FunctionTool(func=provide_cpr_guidance) 