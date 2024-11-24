import React, { useState } from "react";
import "../styles/ChatPage.css";
import chatMenuIcon from "../images/chat.svg";
import chatSendIcon from "../images/chatsend.svg";

function ChatPage() {
  const [messages, setMessages] = useState([]); // 메시지를 저장할 상태
  const [input, setInput] = useState(""); // 입력 필드의 상태

  // 메시지를 추가하는 함수
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "user", text: input }]); // 메시지 추가
      setInput(""); // 입력 필드 초기화
    }
  };

  // Enter 키로 메시지를 전송하는 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src={chatMenuIcon} alt="Chat Icon" className="chat-icon" />
        <h2>Chatting</h2>
        <hr className="hr1" />
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "user" ? "user" : "bot"}`}
          >
            {message.sender === "bot" && (
              <img src="bot-avatar.png" alt="Bot Avatar" className="avatar" />
            )}
            <pchat className="chatp">{message.text}</pchat>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <hr className="hr2" />
        <input
          type="text"
          placeholder="  메시지 보내기..."
          value={input}
          onChange={(e) => setInput(e.target.value)} // 입력 필드 상태 업데이트
          onKeyPress={handleKeyPress} // Enter 키 감지
        />
        <button className="send-button" onClick={handleSendMessage}>
          <img src={chatSendIcon} alt="Send" className="send-icon" />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
