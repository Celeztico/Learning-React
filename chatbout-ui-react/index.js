function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        setInputText(""); // Clear input field immediately after sending

        if(isLoading || inputText === "") {
            return; // to prevent multiple sends or sending empty messages
        }
        setIsLoading(true);

        const newChatMessages = [
            ...chatMessages,
            {
                text: inputText,
                sender: "user",
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);
        //can clear the input text here too
        setChatMessages([ // show loading message, but doesnt get saved in history
            ...newChatMessages,
            {
                text: <img src="loading-spinner.gif" className="loading-gif" />,
                sender: "bot",
                id: "Loading"
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
        setIsLoading(false); // to show finished loading
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            sendMessage();
        } else if (event.key === 'Escape') {
            setInputText("");
        }
    }


    return (
        <div className="chat-input-container">
            <input 
                className="chat-input"
                type="text" 
                placeholder="Type your message..." 
                onChange={saveInputText}
                value={inputText}
                onKeyDown={handleKeyDown}
                />
            <button className="send-button" onClick={sendMessage}>Send</button>
        </div>
    );
}


function ChatMessage({ text, sender }) {
    // const text = props.text;
    // const sender = props.sender;   all these are same as below line
    // const { text, sender } = props;  same as that in function parameter
    return (
        <div className={sender === 'bot' ? "chat-message-bot" : "chat-message-user"}>
            {sender === 'bot' && (
                <img src="robot.png" className="chat-profile-pic" />
            )}
            <div className="chat-message-text">
                {text}
            </div>
            {sender === 'user' && (
                <img src="user.png" className="chat-profile-pic" />
            )}
        </div>
    );
}

// render list of chat messages
function ChatMessages({ chatMessages }) {
    const chatMessagesRef = React.useRef(null);
    React.useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);
    return (
        <div 
            className="chat-output-container"
            ref={chatMessagesRef}
        >
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage 
                        text={chatMessage.text} 
                        sender={chatMessage.sender}
                        key={chatMessage.id} 
                    />
                );
            })}
        </div>
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
        <div className="app-container">
            <ChatMessages 
                chatMessages={chatMessages}
            />
            <ChatInput 
                chatMessages={chatMessages} 
                setChatMessages={setChatMessages}
            />
        </div>
    );
}

const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App />);