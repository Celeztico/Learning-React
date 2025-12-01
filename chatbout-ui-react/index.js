function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = React.useState("");

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        setInputText(""); // Clear input field immediately after sending
        const newChatMessages = [
            ...chatMessages,
            {
                text: inputText,
                sender: "user",
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);
        //can clear the input text here too, but better to do it above for better UX
        setChatMessages([ // show loading message, but doesnt get saved in history
            ...newChatMessages,
            {
                text: "...typing",
                sender: "bot",
                id: crypto.randomUUID()
            }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                text: response,
                sender: "bot",
                id: crypto.randomUUID()
            }
        ]);

        //setInputText("");
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
            setInputText("");
        }
    }


    return (
        <>
            <input 
                type="text" 
                placeholder="Type your message..." 
                onChange={saveInputText}
                value={inputText}
                onKeyDown={handleKeyDown}
                />
            <button onClick={sendMessage}>Send</button>
        </>
    );
}


function ChatMessage({ text, sender }) {
    // const text = props.text;
    // const sender = props.sender;   all these are same as below line
    // const { text, sender } = props;  same as that in function parameter
    return (
        <div>
            {sender === 'bot' && <img src="robot.png" width="50" />}
            {text}
            {sender === 'user' && <img src="user.png" width="50" />}
        </div>
    );
}

// render list of chat messages
function ChatMessages({ chatMessages }) {
    return (
        <>
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage 
                        text={chatMessage.text} 
                        sender={chatMessage.sender}
                        key={chatMessage.id} 
                    />
                );
            })}
        </>
    );
}

function App(){
    const [chatMessages, setChatMessages] = React.useState([{ 
            text: "Hello chatbot",
            sender: "user",
            id: "id1"
        },{
            text: "Hello! How can i help you",
            sender: "bot",
            id: "id2" 
        },{
            text: "can you get me todays date",
            sender: "user",
            id: "id3" 
        },{
            text: "Today is 5th May 2023",
            sender: "bot",
            id: "id4" 
        }
    ]);
    //const [chatMessages, setChatMessages] = array; same as above line
    //const chatMessages = array[0]; these two are same as above line
    //const setChatMessages = array[1];
    return (
        <>
            <ChatInput 
                chatMessages={chatMessages} 
                setChatMessages={setChatMessages}
            />
            <ChatMessages 
                chatMessages={chatMessages}
            />

        </>
    );
}

const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App />);