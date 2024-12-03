const chatWindow = document.getElementById("chat-window");
        const userInput = document.getElementById("user-input");

        let userTypingTimeout; // To track when user stops typing
        let userTypingIndicator; // Reference to the typing indicator

        async function sendMessage() {
            const message = userInput.value.trim(); // User's message
            if (message === "") return; // Do nothing if input is empty

            // Remove user's typing indicator
            removeUserTypingIndicator();

            // Display user's message in the chat window
            displayMessage(message, "user-message");

            // Clear the input field
            userInput.value = "";

            // Prepare the payload for the backend
            const payload = {
                sender: "user", // This can be dynamic based on user session
                message: message,
            };

            // Show bot typing animation
            const botTypingIndicator = createTypingIndicator("bot");
            chatWindow.appendChild(botTypingIndicator);
            chatWindow.scrollTop = chatWindow.scrollHeight;

            try {
                // Send the message to the backend
                const response = await fetch("http://localhost:8080/auth/message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                // Remove bot typing animation once response is received
                botTypingIndicator.remove();

                // Handle the response
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data) && data.length > 0) {
                        // Display bot's message
                        data.forEach((botResponse) => {
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
                botTypingIndicator.remove(); // Remove typing animation
                displayMessage("Error: Unable to connect to the server.", "bot-message");
            }
        }

        // Function to create a typing animation
        function createTypingIndicator(senderType) {
            const typingDiv = document.createElement("div");
            typingDiv.className = `typing-indicator ${senderType}-message`;
            typingDiv.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            return typingDiv;
        }

        // Function to remove user's typing indicator
        function removeUserTypingIndicator() {
            if (userTypingIndicator) {
                userTypingIndicator.remove();
                userTypingIndicator = null;
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

        // Add typing animation while user is typing
        userInput.addEventListener("input", () => {
            // Add user's typing indicator if not already present
            if (!userTypingIndicator) {
                userTypingIndicator = createTypingIndicator("user");
                chatWindow.appendChild(userTypingIndicator);
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }

            // Clear the previous timeout and set a new one
            clearTimeout(userTypingTimeout);
            userTypingTimeout = setTimeout(() => {
                removeUserTypingIndicator(); // Remove indicator after user stops typing
            }, 1500); // Remove indicator if no typing occurs for 1 second
        });

        // Add event listener to send message on Enter key press
        userInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                sendMessage();
            }
        });


        