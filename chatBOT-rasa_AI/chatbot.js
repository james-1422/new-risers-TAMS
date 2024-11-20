const chatWindow = document.getElementById("chat-window");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const message = userInput.value.trim(); // User's message
    if (message === "") return; // Do nothing if input is empty

    // Display user's message in the chat window
    displayMessage(message, "user-message");

    // Clear the input field
    userInput.value = "";

    // Prepare the payload for the backend
    const payload = {
        sender: "user", // This can be dynamic based on user session
        message: message
    };

    console.log("output in json"+payload);
    

    try {
        // Send the message to the backend
        const response = await fetch("http://localhost:8080/auth/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Handle the response
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                // Display bot's message
                data.forEach(botResponse => {
                    displayMessage(botResponse.text, "bot-message");
                });
            } else {
                displayMessage("No response from the server.", "bot-message");
            }
        } else {
            displayMessage("Sorry, I couldn't connect to the server.", "bot-message");
        }
    } catch (error) {
        // Handle network errors or other issues
        displayMessage("Error: Unable to connect to the server.", "bot-message");
    }
}

// Function to display a message in the chat window
function displayMessage(text, className) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.textContent = text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to the latest message
}

// Add event listener to send message on Enter key press
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
