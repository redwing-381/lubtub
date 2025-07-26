import os
import json
from twilio.rest import Client

CONTACTS_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), '..', '..', 'contacts.json')

DEFAULT_MESSAGE = "This is LubTub AI. There is a medical emergency. Please respond immediately."

def get_contact_number(contact_name: str) -> str:
    """Look up the phone number for a contact name."""
    with open(CONTACTS_FILE, 'r') as f:
        contacts = json.load(f)
    number = contacts.get(contact_name.lower())
    if not number:
        raise ValueError(f"Contact '{contact_name}' not found.")
    return number

def call_contact(contact_name: str, message: str = DEFAULT_MESSAGE) -> str:
    """Place a call to the contact using Twilio with the given message."""
    account_sid = os.getenv("TWILIO_ACCOUNT_SID")
    auth_token = os.getenv("TWILIO_AUTH_TOKEN")
    from_number = os.getenv("TWILIO_FROM_NUMBER")
    if not all([account_sid, auth_token, from_number]):
        raise Exception("Twilio credentials not set in environment variables.")
    to_number = get_contact_number(contact_name)
    client = Client(account_sid, auth_token)
    call = client.calls.create(
        to=to_number,
        from_=from_number,
        twiml=f'<Response><Say>{message}</Say></Response>'
    )
    return f"Call placed to {contact_name} ({to_number}). Call SID: {call.sid}" 