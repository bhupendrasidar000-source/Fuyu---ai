const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ==========================================
// 1. FRONTEND WEB INTERFACE (HTML + CSS + JS)
// ==========================================
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fuyu AI Assistant</title>
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background-color: #0f172a; 
                color: #f8fafc; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                min-height: 100vh; 
                padding: 15px;
            }
            .chat-card { 
                width: 100%; 
                max-width: 450px; 
                height: 85vh; 
                background-color: #1e293b; 
                border-radius: 16px; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.5); 
                display: flex; 
                flex-direction: column; 
                overflow: hidden;
                border: 1px solid #334155;
            }
            .chat-header { 
                background: linear-gradient(135deg, #0284c7, #38bdf8); 
                padding: 18px; 
                text-align: center; 
                font-weight: bold;
            }
            .chat-header h2 { 
                color: #ffffff; 
                font-size: 20px; 
                letter-spacing: 0.5px;
            }
            .chat-header p {
                color: #e0f2fe;
                font-size: 12px;
                margin-top: 3px;
                font-weight: normal;
            }
            #chat-box { 
                flex: 1; 
                padding: 15px; 
                overflow-y: auto; 
                display: flex;
                flex-direction: column;
                gap: 12px;
                background-color: #0f172a;
            }
            .message {
                max-width: 80%;
                padding: 10px 14px;
                border-radius: 12px;
                font-size: 14px;
                line-height: 1.4;
                word-wrap: break-word;
            }
            .user-msg {
                align-self: flex-end;
                background-color: #0284c7;
                color: #ffffff;
                border-bottom-right-radius: 2px;
            }
            .fuyu-msg {
                align-self: flex-start;
                background-color: #1e293b;
                color: #38bdf8;
                border: 1px solid #334155;
                border-bottom-left-radius: 2px;
            }
            .system-msg {
                align-self: center;
                background-color: transparent;
                color: #64748b;
                font-size: 12px;
                text-align: center;
            }
            .input-area { 
                padding: 12px; 
                background-color: #1e293b; 
                display: flex; 
                gap: 8px; 
                border-top: 1px solid #334155;
            }
            input { 
                flex: 1; 
                padding: 12px; 
                background-color: #0f172a;
                border: 1px solid #334155; 
                border-radius: 8px; 
                color: #ffffff;
                outline: none; 
                font-size: 14px;
            }
            input:focus {
                border-color: #38bdf8;
            }
            button { 
                padding: 12px 18px; 
                background-color: #38bdf8; 
                border: none; 
                border-radius: 8px; 
                color: #0f172a; 
                font-weight: bold; 
                cursor: pointer; 
                transition: background 0.2s;
            }
            button:hover { 
                background-color: #7dd3fc; 
            }
        </style>
    </head>
    <body>
        <div class="chat-card">
            <div class="chat-header">
                <h2>⚡ Fuyu AI Assistant</h2>
                <p>Personal Assistant Deployed & Live</p>
            </div>
            <div id="chat-box">
                <div class="message system-msg">Fuyu AI ready! Message type karke baat karein.</div>
            </div>
            <div class="input-area">
                <input type="text" id="user-input" placeholder="Type a message..." onkeypress="if(event.key === 'Enter') sendMessage()">
                <button onclick="sendMessage()">Send</button>
            </div>
        </div>

        <script>
            async function sendMessage() {
                const inputField = document.getElementById('user-input');
                const chatBox = document.getElementById('chat-box');
                const message = inputField.value.trim();
                
                if (!message) return;

                // User message display karein
                chatBox.innerHTML += \`<div class="message user-msg"><b>You:</b> \${message}</div>\`;
                inputField.value = '';
                chatBox.scrollTop = chatBox.scrollHeight;

                try {
                    // Backend API call
                    const response = await fetch('/api/chat', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ message })
                    });
                    const data = await response.json();
                    
                    // Fuyu AI ka reply display karein
                    chatBox.innerHTML += \`<div class="message fuyu-msg"><b>Fuyu:</b> \${data.reply}</div>\`;
                } catch (err) {
                    chatBox.innerHTML += \`<div class="message system-msg" style="color: #ef4444;">Connection Error! Try again.</div>\`;
                }
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        </script>
    </body>
    </html>
  `);
});

// ==========================================
// 2. BACKEND API ENDPOINT (AI Logic)
// ==========================================
app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    
    // Fuyu AI Response Logic
    const aiResponse = `Main Fuyu AI hoon! Mujhe aapka message mila: "${userMessage}". Mera setup completely live hai!`;

    res.json({ success: true, reply: aiResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server listener
app.listen(PORT, () => {
  console.log(`Fuyu AI Assistant server running on port ${PORT}`);
});
