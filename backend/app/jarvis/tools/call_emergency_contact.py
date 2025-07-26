from google.adk.tools.function_tool import FunctionTool
from .twilio_call import call_contact

def call_emergency_contact(contact_name: str) -> str:
    """
    Call an emergency contact by name immediately.
    Args:
        contact_name: Name of the contact (e.g., 'wife', 'father')
    Returns:
        Status message
    """
    try:
        result = call_contact(contact_name)
        return result
    except Exception as e:
        return f"Failed to call {contact_name}: {str(e)}"

call_emergency_contact_tool = FunctionTool(func=call_emergency_contact) 