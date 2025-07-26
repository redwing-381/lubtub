from google.adk.tools.function_tool import FunctionTool
from typing import Optional

def provide_emotional_support(
    situation_type: str,
    stress_level: str,
    language_preference: Optional[str]
) -> str:
    """
    Provide emotional support and calming messages during emergencies.
    
    Args:
        situation_type: Type of emergency situation (cpr, bleeding, choking, panic_attack, general)
        stress_level: Level of stress (low, moderate, high, extreme)
        language_preference: Preferred language (english, tamil, hindi, etc.)
    
    Returns:
        Calming and supportive messages
    """
    
    support_messages = []
    
    # General calming messages
    general_support = [
        "You are not alone. I'm here with you.",
        "Stay focused. Every second counts. You're doing well.",
        "Don't panic. Breathe deeply. I've got you.",
        "You're doing exactly what you need to do.",
        "Help is on the way. Keep going.",
        "You're making a difference. Stay strong.",
        "I can see you're doing your best. That's what matters.",
        "Take one step at a time. You've got this.",
        "Your actions are helping. Don't give up.",
        "I'm here to guide you through this."
    ]
    
    # Situation-specific support
    if situation_type == "cpr":
        cpr_support = [
            "You're giving them a chance to live. Keep going.",
            "Your compressions are keeping blood flowing to their brain.",
            "You're doing the right thing. Don't stop.",
            "Every compression counts. You're helping their heart.",
            "Stay strong. You're their lifeline right now.",
            "You're doing great. Keep the rhythm steady.",
            "Your efforts are keeping them alive until help arrives.",
            "Don't worry about being perfect. Just keep going.",
            "You're giving them the best chance possible.",
            "Help is coming. Your work is critical."
        ]
        support_messages.extend(cpr_support)
    
    elif situation_type == "bleeding":
        bleeding_support = [
            "You're controlling the bleeding. Keep the pressure steady.",
            "Your quick action is preventing further blood loss.",
            "Stay calm. Pressure is the key to stopping bleeding.",
            "You're doing exactly what's needed. Don't let up.",
            "Your steady pressure is saving their life.",
            "Keep going. Every moment of pressure helps.",
            "You're preventing shock. That's crucial.",
            "Your hands are their lifeline right now.",
            "Stay focused on the pressure. You're helping.",
            "Help is coming. Your pressure is buying time."
        ]
        support_messages.extend(bleeding_support)
    
    elif situation_type == "choking":
        choking_support = [
            "You're doing the right technique. Keep going.",
            "Your thrusts are working to dislodge the object.",
            "Stay strong. You're their only hope right now.",
            "Don't give up. The object will come out.",
            "Your technique is correct. Keep the pressure up.",
            "You're giving them a chance to breathe again.",
            "Stay focused on the thrusts. You're helping.",
            "Your actions are critical. Don't stop.",
            "Keep going. You're doing everything right.",
            "Help is coming. Your efforts are vital."
        ]
        support_messages.extend(choking_support)
    
    elif situation_type == "panic_attack":
        panic_support = [
            "You're safe. I'm here with you.",
            "Breathe with me. In... out... in... out...",
            "This will pass. Focus on your breathing.",
            "You're not alone. I'm right here.",
            "Take slow, deep breaths. You're okay.",
            "Ground yourself. Feel your feet on the floor.",
            "This is temporary. You're going to be okay.",
            "Focus on the present moment. You're safe.",
            "Let the anxiety pass through you. Don't fight it.",
            "You're stronger than this feeling. Breathe."
        ]
        support_messages.extend(panic_support)
    
    # Add general support messages
    support_messages.extend(general_support)
    
    # Select appropriate message based on stress level
    if stress_level == "extreme":
        selected_message = "EMERGENCY SUPPORT - EXTREME STRESS:\n" + support_messages[0] + "\n\n" + support_messages[1] + "\n\n" + support_messages[2]
    elif stress_level == "high":
        selected_message = "EMERGENCY SUPPORT - HIGH STRESS:\n" + support_messages[0] + "\n\n" + support_messages[1]
    else:
        selected_message = "EMERGENCY SUPPORT:\n" + support_messages[0]
    
    # Add breathing guidance for high stress
    if stress_level in ["high", "extreme"]:
        selected_message += "\n\nBREATHING GUIDANCE:\n"
        selected_message += "Take slow, deep breaths:\n"
        selected_message += "1. Breathe in for 4 counts\n"
        selected_message += "2. Hold for 4 counts\n"
        selected_message += "3. Breathe out for 4 counts\n"
        selected_message += "4. Repeat 3 times"
    
    # Add language-specific support if requested
    if language_preference:
        if language_preference.lower() == "tamil":
            selected_message += "\n\nதமிழ் ஆதரவு:\n"
            selected_message += "நீங்கள் தனியாக இல்லை. நான் உங்களுடன் இருக்கிறேன்.\n"
            selected_message += "சாந்தமாக இருங்கள். உதவி வருகிறது."
        elif language_preference.lower() == "hindi":
            selected_message += "\n\nहिंदी समर्थन:\n"
            selected_message += "आप अकेले नहीं हैं। मैं आपके साथ हूं।\n"
            selected_message += "शांत रहें। मदद आ रही है।"
    
    return selected_message

# Create the tool instance
provide_emotional_support_tool = FunctionTool(func=provide_emotional_support) 