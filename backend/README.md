# LubTub AI - Emergency First-Aid Voice Assistant

LubTub AI is an emergency first-aid assistant powered by Google ADK (Agent Development Kit) that provides real-time guidance during medical emergencies. The assistant stays connected with users from the moment an emergency is reported until professional help arrives.

## Features

### 🔷 Core Capabilities
- **Emergency Assessment**: Quickly identify emergency types through targeted questions
- **CPR Guidance**: Step-by-step CPR instructions for adults, children, and infants
- **Bleeding Control**: Comprehensive bleeding control instructions based on severity
- **Choking Relief**: Heimlich maneuver and choking relief guidance
- **Emotional Support**: Calming messages and emotional support during crises
- **Multi-language Support**: Emotional support in English, Tamil, and Hindi

### 🛠️ Emergency Types Handled
- Unconscious persons
- Cardiac arrest (CPR)
- Heavy bleeding
- Choking
- Seizures
- Heart attack symptoms
- Panic attacks and emotional breakdowns

## Setup Instructions

### 1. Install Dependencies

First, create a virtual environment:

```bash
# Create a virtual environment
python -m venv .venv
```

Activate the virtual environment:

On Windows:
```bash
# Activate virtual environment on Windows
.venv\Scripts\activate
```

On macOS/Linux:
```bash
# Activate virtual environment on macOS/Linux
source .venv/bin/activate
```

Then, install all required Python packages:

```bash
# Install all dependencies
pip install -r requirements.txt
```

### 2. Set Up Gemini API Key

1. Create or use an existing [Google AI Studio](https://aistudio.google.com/) account
2. Get your Gemini API key from the [API Keys section](https://aistudio.google.com/app/apikeys)
3. Set the API key as an environment variable:

Create a `.env` file in the project root with:

```
GOOGLE_API_KEY=your_api_key_here
```

## Running the Application

Start the LubTub AI assistant:

```bash
# Start the LubTub AI Voice Assistant with hot-reloading enabled
uvicorn app.main:app --reload
```

This will start the application server at `http://127.0.0.1:8000`. You can interact with LubTub AI through the web interface.

## Usage Examples

### Emergency Scenarios

**Unconscious Person:**
- User: "Someone fainted!"
- LubTub AI: "Okay. Stay calm. Is the person conscious? Try tapping their shoulder and ask loudly, 'Are you okay?'"

**CPR Situation:**
- User: "They're not breathing!"
- LubTub AI: "Start CPR immediately. Place both hands on their chest and push hard, fast—2 compressions per second. Count with me: one, two, three..."

**Bleeding Emergency:**
- User: "There's a lot of blood!"
- LubTub AI: "Apply direct pressure with a clean cloth immediately. Elevate the injured area above heart level. Keep pressure until help arrives."

**Choking Emergency:**
- User: "Someone is choking!"
- LubTub AI: "Ask if they can speak. If not, perform the Heimlich maneuver. Stand behind them, wrap your arms around their waist, and give upward thrusts."

## Agent Behavior

### 🧭 Instructional Guidelines
- **Concise and Assertive**: Emergencies require clear, direct communication
- **Step-by-Step Guidance**: Break down complex procedures into simple steps
- **Emotional Support**: Provide calming reassurance alongside technical instructions
- **Continuous Monitoring**: Stay active until professional help arrives
- **Adaptive Responses**: Change protocols based on situation developments

### 💬 Communication Style
- Use clear, simple language without medical jargon
- Provide specific timing and counting guidance
- Check for understanding and confirmation
- Offer emotional support and encouragement
- Never end the conversation unless professionals have arrived

## Safety and Legal Notice

**IMPORTANT**: LubTub AI provides basic first-aid guidance only and is not a substitute for professional medical care.

- Always call emergency services (108) for life-threatening situations
- The assistant provides guidance based on standard first-aid protocols
- Users should follow local emergency procedures and regulations
- Professional medical attention should always be sought when appropriate

## Technical Architecture

### Tools and Capabilities
- **Emergency Assessment Tool**: Evaluates emergency situations and determines appropriate responses
- **CPR Guidance Tool**: Provides age-appropriate CPR instructions with step-by-step guidance
- **Bleeding Control Tool**: Offers bleeding control techniques based on severity and location
- **Choking Relief Tool**: Guides through Heimlich maneuver and infant choking relief
- **Emotional Support Tool**: Provides calming messages and stress management techniques

### Voice Integration
- Real-time voice communication using Google ADK
- Text-to-speech and speech-to-text capabilities
- Multi-language emotional support
- Continuous conversation until emergency resolution

## Troubleshooting

### API Issues
- Ensure your Gemini API key is correctly set in the `.env` file
- Check your API quota and usage limits
- Verify internet connectivity for API calls

### Voice Issues
- Check microphone permissions in your browser
- Ensure audio drivers are properly installed
- Test with different browsers if experiencing issues

### Performance Issues
- Close other applications to free up system resources
- Check your internet connection speed
- Restart the application if experiencing lag or delays

## Contributing

This is an emergency response system. If you find issues or want to contribute:

1. Ensure all changes maintain safety and accuracy
2. Test thoroughly before submitting
3. Follow medical guidelines and best practices
4. Consider the critical nature of emergency situations

## License

This project is for educational and emergency assistance purposes. Please ensure compliance with local regulations and medical guidelines when using this system.
