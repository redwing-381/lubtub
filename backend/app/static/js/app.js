/**
 * app.js: JS code for the adk-streaming sample app.
 */

/**
 * WebSocket handling
 */

// Global variables
const sessionId = Math.random().toString().substring(10);
const ws_url = "ws://localhost:8000/ws/" + sessionId;
let websocket = null;
let is_audio = false;
let currentMessageId = null; // Track the current message ID during a conversation turn

// Get DOM elements
const messageInput = document.getElementById("message");
const messagesDiv = document.getElementById("messages");
const statusDot = document.getElementById("status-dot");
const connectionStatus = document.getElementById("connection-status");
const startAudioButton = document.getElementById("startAudioButton");
const stopAudioButton = document.getElementById("stopAudioButton");
const recordingContainer = document.getElementById("recording-container");
const sendButton = document.getElementById("sendButton");

// WebSocket handlers
function connectWebsocket() {
  // Connect websocket
  const wsUrl = ws_url + "?is_audio=" + is_audio;
  websocket = new WebSocket(wsUrl);

  // Handle connection open
  websocket.onopen = function () {
    // Connection opened messages
    console.log("WebSocket connection opened.");
    connectionStatus.textContent = "Connected";
    statusDot.classList.add("connected");

    // Enable the Send button
    sendButton.disabled = false;
    addSubmitHandler();
  };

  // Handle incoming messages
  websocket.onmessage = function (event) {
    // Parse the incoming message
    const message_from_server = JSON.parse(event.data);
    console.log("[AGENT TO CLIENT] ", message_from_server);

    // Show typing indicator for first message in a response sequence,
    // but not for turn_complete messages
    if (
      !message_from_server.turn_complete &&
      (message_from_server.mime_type === "text/plain" ||
        message_from_server.mime_type === "audio/pcm")
    ) {
      showTypingIndicator();
    }

    // Check if the turn is complete
    if (
      message_from_server.turn_complete &&
      message_from_server.turn_complete === true
    ) {
      // Reset currentMessageId to ensure the next message gets a new element
      currentMessageId = null;
      hideTypingIndicator();
      return;
    }

    // If it's audio, play it
    if (message_from_server.mime_type === "audio/pcm" && audioPlayerNode) {
      audioPlayerNode.port.postMessage(base64ToArray(message_from_server.data));
    }

    // Handle text messages
    if (message_from_server.mime_type === "text/plain") {
      // Hide typing indicator
      hideTypingIndicator();

      const role = message_from_server.role || "model";

      // If we already have a message element for this turn, append to it
      if (currentMessageId && role === "model") {
        const existingMessage = document.getElementById(currentMessageId);
        if (existingMessage) {
          // Find the content element and append to it
          const contentElement = existingMessage.querySelector('.message-content');
          if (contentElement) {
            // Append the text without adding extra spaces
            const textNode = document.createTextNode(message_from_server.data);
            contentElement.appendChild(textNode);
          }

          // Play Murf TTS audio for agent message if audio is enabled
          if (is_audio) playAgentAudio(message_from_server.data);

          // Scroll to the bottom
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
          return;
        }
      }

      // Create a new message element if it's a new turn or user message
      const messageId = Math.random().toString(36).substring(7);
      const messageElem = createMessageElement(message_from_server.data, role, messageId);

      // Add the message to the DOM
      messagesDiv.appendChild(messageElem);

      // Remember the ID of this message for subsequent responses in this turn
      if (role === "model") {
        currentMessageId = messageId;
      }

      // Play Murf TTS audio for agent message if audio is enabled
      if (is_audio && role === "model") playAgentAudio(message_from_server.data);

      // Scroll to the bottom
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  };

  // Handle connection close
  websocket.onclose = function () {
    console.log("WebSocket connection closed.");
    sendButton.disabled = true;
    connectionStatus.textContent = "Disconnected. Reconnecting...";
    statusDot.classList.remove("connected");
    hideTypingIndicator();
    setTimeout(function () {
      console.log("Reconnecting...");
      connectWebsocket();
    }, 5000);
  };

  websocket.onerror = function (e) {
    console.log("WebSocket error: ", e);
    connectionStatus.textContent = "Connection error";
    statusDot.classList.remove("connected");
    hideTypingIndicator();
  };
}

// Create message element with new UI structure
function createMessageElement(text, role, messageId) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;
  messageDiv.id = messageId;

  // Create avatar
  const avatar = document.createElement("div");
  avatar.className = `message-avatar ${role}`;
  
  if (role === "user") {
    avatar.textContent = "U";
  } else {
    // Use heart icon for agent
    avatar.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`;
  }

  // Create message content
  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;

  // Create timestamp
  const timestamp = document.createElement("div");
  timestamp.className = "message-time";
  timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Assemble message
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  messageDiv.appendChild(timestamp);

  return messageDiv;
}

// Show typing indicator
function showTypingIndicator() {
  let typingIndicator = document.querySelector('.typing-indicator');
  if (!typingIndicator) {
    typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    messagesDiv.appendChild(typingIndicator);
  }
  typingIndicator.classList.add('visible');
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  const typingIndicator = document.querySelector('.typing-indicator');
  if (typingIndicator) {
    typingIndicator.classList.remove('visible');
  }
}

connectWebsocket();

// Add submit handler
function addSubmitHandler() {
  // Handle Enter key press
  messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  });

  // Handle Send button click
  sendButton.addEventListener('click', function(e) {
    e.preventDefault();
    sendTextMessage();
  });
}

// Send text message
function sendTextMessage() {
  const message = messageInput.value.trim();
  if (message && websocket && websocket.readyState === WebSocket.OPEN) {
    // Create and add user message to UI
    const messageId = Math.random().toString(36).substring(7);
    const messageElem = createMessageElement(message, "user", messageId);
    messagesDiv.appendChild(messageElem);

    // Clear input
    messageInput.value = "";

    // Show typing indicator
    showTypingIndicator();

    // Send message to server
    sendMessage({
      mime_type: "text/plain",
      data: message,
      role: "user",
    });

    console.log("[CLIENT TO AGENT] " + message);
    
    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
}

// Send a message to the server as a JSON string
function sendMessage(message) {
  if (websocket && websocket.readyState == WebSocket.OPEN) {
    const messageJson = JSON.stringify(message);
    websocket.send(messageJson);
  }
}

// Decode Base64 data to Array
function base64ToArray(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Audio handling
 */

let audioPlayerNode;
let audioPlayerContext;
let audioRecorderNode;
let audioRecorderContext;
let micStream;
let isRecording = false;

// Import the audio worklets
import { startAudioPlayerWorklet } from "./audio-player.js";
import { startAudioRecorderWorklet } from "./audio-recorder.js";

// Start audio
function startAudio() {
  // Start audio output
  startAudioPlayerWorklet().then(([node, ctx]) => {
    audioPlayerNode = node;
    audioPlayerContext = ctx;
  });
  // Start audio input
  startAudioRecorderWorklet(audioRecorderHandler).then(
    ([node, ctx, stream]) => {
      audioRecorderNode = node;
      audioRecorderContext = ctx;
      micStream = stream;
      isRecording = true;
    }
  );
}

// Stop audio recording
function stopAudio() {
  if (audioRecorderNode) {
    audioRecorderNode.disconnect();
    audioRecorderNode = null;
  }

  if (audioRecorderContext) {
    audioRecorderContext
      .close()
      .catch((err) => console.error("Error closing audio context:", err));
    audioRecorderContext = null;
  }

  if (micStream) {
    micStream.getTracks().forEach((track) => track.stop());
    micStream = null;
  }

  isRecording = false;
}

// Start the audio only when the user clicked the button
// (due to the gesture requirement for the Web Audio API)
startAudioButton.addEventListener("click", () => {
  startAudioButton.disabled = true;
  startAudioButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>`;
  startAudioButton.style.display = "none";
  stopAudioButton.style.display = "inline-block";
  recordingContainer.style.display = "flex";
  startAudio();
  is_audio = true;

  // Add class to messages container to enable audio styling
  messagesDiv.classList.add("audio-enabled");

  connectWebsocket(); // reconnect with the audio mode
});

// Stop audio recording when stop button is clicked
stopAudioButton.addEventListener("click", () => {
  stopAudio();
  stopAudioButton.style.display = "none";
  startAudioButton.style.display = "inline-block";
  startAudioButton.disabled = false;
  startAudioButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="8" y1="23" x2="16" y2="23"/>
  </svg>`;
  recordingContainer.style.display = "none";

  // Remove audio styling class
  messagesDiv.classList.remove("audio-enabled");

  // Reconnect without audio mode
  is_audio = false;

  // Only reconnect if the connection is still open
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.close();
    // The onclose handler will trigger reconnection
  }
});

// Audio recorder handler
function audioRecorderHandler(pcmData) {
  // Only send data if we're still recording
  if (!isRecording) return;

  // Send the pcm data as base64
  sendMessage({
    mime_type: "audio/pcm",
    data: arrayBufferToBase64(pcmData),
  });

  // Log every few samples to avoid flooding the console
  if (Math.random() < 0.01) {
    // Only log ~1% of audio chunks
    console.log("[CLIENT TO AGENT] sent audio data");
  }
}

// Encode an array buffer with Base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Add this function to fetch and play Murf TTS audio
async function playAgentAudio(text) {
  try {
    const response = await fetch("/tts", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ text }),
    });
    if (!response.ok) throw new Error("TTS request failed");
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  } catch (err) {
    console.error("Failed to play agent audio:", err);
  }
}
