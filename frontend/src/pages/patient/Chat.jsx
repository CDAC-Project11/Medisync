import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/patient/chat.css";

function Chat() {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: "doctor" },
        { text: "I have been experiencing a headache since morning.", sender: "patient" },
    ]);

    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);

    // auto-scroll to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: "patient" }]);
        setInput("");
    };

    return (
        <>
            <Navbar />

            <div className="page-content">
                <div className="chat-container mt-3">

                    {/* HEADER */}
                    <div className="chat-header">
                        <i className="bi bi-person-video"></i>
                        Chat with Dr. Sachin Roundal
                    </div>

                    {/* CHAT BOX */}
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`msg ${msg.sender === "patient" ? "patient-msg" : "doctor-msg"}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                    {/* INPUT */}
                    <div className="chat-footer">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button className="send-btn" onClick={sendMessage}>
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Chat;
