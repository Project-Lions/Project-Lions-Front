import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../styles/ChatPage.css";
import chatMenuIcon from "../images/chat.svg";
import chatSendIcon from "../images/chatsend.svg";
import buttonImage from '../images/arrow_back.png'


const API_BASE_URL = 'http://localhost:3000/api/chat';

function ChatPage() {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();


  // 인증 토큰 (백엔드에서 필요한 경우 실제 토큰을 가져와야 함)
  const accessToken = "your_access_token_here";  // 실제 인증 토큰을 사용해야 합니다
  const receiverId = 2;  // 예시로 받은 사람의 ID (이 값은 실제로 동적으로 받아와야 할 수 있음)

  // 메시지를 백엔드에 보내는 함수
  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage = { sender: "user", text: input };
      setMessages([...messages, userMessage]);
      setInput(""); 

      setLoading(true); 
      try {
        // 백엔드에 메시지 전송
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Auth': accessToken,  
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            receiverId: receiverId,  // 채팅 상대의 ID
            message: input,          // 사용자 메시지
          }), 
        });

        if (!response.ok) {
          const errorText = await response.text(); 
          console.error("API Error: ", response.status, errorText);
          throw new Error(`Failed to send message: ${response.status} ${errorText}`);
        }

        // 봇의 응답 메시지 처리
        const botResponse = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse.message }, 
        ]);
      } catch (error) {
        console.error(" sending message: ", error);
        setError(' sending message'); 
      } finally {
        setLoading(false); 
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
         <button onClick={() => navigate(-1)} className="backButton">
        <img src={buttonImage} alt="back-button"/>
      </button>
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
            <p className="chatp">{message.text}</p>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="chat-input">
        <hr className="hr2" />
        <input
          type="text"
          placeholder="  메시지 보내기..."
          value={input}
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={handleKeyPress} 
        />
        <button className="send-button" onClick={handleSendMessage}>
          <img src={chatSendIcon} alt="Send" className="send-icon" />
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
