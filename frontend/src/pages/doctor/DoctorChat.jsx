import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import "../../styles/doctor/doctor-chat.css";

function DoctorChat() {
  // -------- STATIC PATIENT LIST --------
  const patients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Amit Sharma" },
    { id: 3, name: "Sneha Patil" }
  ];

  // -------- STATIC CHAT DATA WITH TIMESTAMP --------
  const initialChats = {
    1: [
      { text: "Hello Doctor!", sender: "patient", time: 1700000000000 },
      { text: "Hi John, how can I help you?", sender: "doctor", time: 1700000100000 }
    ],
    2: [
      { text: "I have fever since yesterday.", sender: "patient", time: 1700000200000 }
    ],
    3: [
      { text: "Can I reschedule my appointment?", sender: "patient", time: 1700000300000 }
    ]
  };

  // -------- STATE --------
  const [chats, setChats] = useState(initialChats);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState({ 2: true, 3: true }); // unread flags

  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, selectedPatient]);

  // -------- SEND MESSAGE (DOCTOR) --------
  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      text: input,
      sender: "doctor",
      time: Date.now()
    };

    setChats((prev) => ({
      ...prev,
      [selectedPatient.id]: [...(prev[selectedPatient.id] || []), newMsg]
    }));

    setInput("");
  };

  // -------- SELECT PATIENT --------
  const openChat = (patient) => {
    setSelectedPatient(patient);

    // clear unread notification
    setUnread((prev) => {
      const updated = { ...prev };
      delete updated[patient.id];
      return updated;
    });
  };

  // -------- SORT PATIENTS BY LATEST MESSAGE --------
  const sortedPatients = [...patients].sort((a, b) => {
    const lastMsgA =
      chats[a.id]?.[chats[a.id].length - 1]?.time || 0;
    const lastMsgB =
      chats[b.id]?.[chats[b.id].length - 1]?.time || 0;
    return lastMsgB - lastMsgA;
  });

  return (
    <>
      <Navbar />

      <div className="page-content">
        <div className="doctor-chat-container">

          {/* LEFT: PATIENT LIST */}
          <div className="patient-list">
            <h6 className="list-title">Patients</h6>

            {sortedPatients.map((p) => (
              <div
                key={p.id}
                className={`patient-item ${
                  selectedPatient.id === p.id ? "active" : ""
                }`}
                onClick={() => openChat(p)}
              >
                <span>
                  <i className="bi bi-person-circle me-2"></i>
                  {p.name}
                </span>

                {/* 🔴 UNREAD DOT */}
                {unread[p.id] && (
                  <span className="unread-dot"></span>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: CHAT AREA */}
          <div className="chat-section">

            {/* HEADER */}
            <div className="chat-header">
              <i className="bi bi-chat-dots-fill me-2"></i>
              Chat with {selectedPatient.name}
            </div>

            {/* CHAT BOX */}
            <div className="chat-box">
              {(chats[selectedPatient.id] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`msg ${
                    msg.sender === "doctor"
                      ? "doctor-msg"
                      : "patient-msg"
                  }`}
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
      </div>
    </>
  );
}

export default DoctorChat;
