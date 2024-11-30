


// import React, { useState, useEffect } from 'react';
// import './main.css';
// import { assets } from '../../assets/assets';
// import botResponses from '../../assets/botResponses.json';
// import axios from 'axios';
// import { useRef } from 'react';
// import { account } from '../../appwrite'; // Import the account object from appwrite.js

// const API_URL = 'http://localhost:5000'; // Replace with the backend server URL

// const Main = ({ resetChat, onLogout }) => {
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);
//   const [cardMessages, setCardMessages] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [sessionId, setSessionId] = useState(null);
//   const [userId, setUserId] = useState(null); // Add userId state
//   const inputRef = useRef(null);

//   // Use the useEffect you provided to fetch the user ID
//   // useEffect(() => {
//   //   const fetchUserId = async () => {
//   //     try {
//   //       const user = await account.get(); // Fetch current logged-in user from Appwrite
//   //       setUserId(user?.$id || null); // Save the userId or null if not logged in
//   //     } catch (error) {
//   //       console.error('Error fetching user:', error);
//   //     }
//   //   };

//   //   fetchUserId();
//   // }, []); // Empty dependency array ensures it runs only once when the component mounts
//   useEffect(() => {
//     const fetchUserId = async () => {
//       try {
//         const user = await account.get(); // Fetch current logged-in user from Appwrite
//         console.log('Current user:', user);  // Log the full user object to see the details
//         console.log('User ID:', user?.$id);  // Log only the user ID
//         setUserId(user?.$id || null); // Save the userId or null if not logged in
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     };
  
//     fetchUserId();
//   }, []);
  

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const getRandomProblemsForCards = () => {
//     const keys = Object.keys(botResponses);
//     const randomProblems = [];

//     while (randomProblems.length < 4) {
//       const randomKey = keys[Math.floor(Math.random() * keys.length)];
//       const randomProblem = botResponses[randomKey];

//       if (!randomProblems.some((problem) => problem.title === randomProblem.title)) {
//         randomProblems.push({ ...randomProblem, key: randomKey });
//       }
//     }

//     return randomProblems;
//   };

//   // Modify handleSend to check for userId before sending a message
//   const handleSend = async () => {
//     if (!userId) {
//       console.error('User ID is not available');
//       return;
//     }

//     if (input.trim()) {
//       setIsFirstMessageSent(true);

//       // Add user's message to chat
//       const newMessage = { sender: 'user', text: input };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       // Clear input field and maintain focus
//       setInput('');
//       if (inputRef.current) inputRef.current.focus();

//       try {
//         if (!sessionId) {
//           const response = await axios.post(`${API_URL}/api/new`, {
//             userId,
//             message: input,
//           });
//           if (response.data.success) {
//             setSessionId(response.data.sessionId);
//             setMessages((prevMessages) => [
//               ...prevMessages,
//               { sender: 'bot', text: response.data.response },
//             ]);
//           }
//         } else {
//           const response = await axios.post(`${API_URL}/api/message`, {
//             userId,
//             sessionId,
//             message: input,
//           });
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: 'bot', text: response.data.response },
//           ]);
//         }
//       } catch (error) {
//         console.error('Error in sending message:', error);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' },
//         ]);
//       }
//     }
//   };

//   const handleCardClick = async (messageKey) => {
//     setIsFirstMessageSent(true);
//     const selectedProblem = botResponses[messageKey];
//     const userMessage = selectedProblem.title;

//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: 'user', text: userMessage },
//     ]);

//     try {
//       if (!sessionId) {
//         // Create a new session if not already created
//         const response = await axios.post(`${API_URL}/api/new`, {
//           userId,
//           message: userMessage,
//         });
//         if (response.data.success) {
//           setSessionId(response.data.sessionId);
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             { sender: 'bot', text: response.data.response },
//           ]);
//         }
//       } else {
//         // Use the existing session
//         const response = await axios.post(`${API_URL}/api/message`, {
//           userId,
//           sessionId,
//           message: userMessage,
//         });
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: 'bot', text: response.data.response },
//         ]);
//       }
//     } catch (error) {
//       console.error('Error in creating chat from card:', error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: 'bot', text: 'An error occurred. Please try again.' },
//       ]);
//     }
//   };

//   useEffect(() => {
//     setCardMessages(getRandomProblemsForCards());
//     setMessages([]);
//     setIsFirstMessageSent(false);
//   }, [resetChat]);

//   return (
//     <div className="main">
//       <div className="nav">
//         <p>Mechanic-AI</p>
//         <div className="user-section" onClick={toggleDropdown}>
//           <img src={assets.user_icon} alt="User Icon" />
//           {isDropdownOpen && (
//             <div className="dropdown">
//               <button onClick={onLogout} className="dropdown-item">
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="main-container">
//         {!isFirstMessageSent ? (
//           <>
//             <div className="greet">
//               <p>
//                 <span>Hello, Dev</span>
//               </p>
//               <p>How can I help you today?</p>
//             </div>
//             <div className="cards">
//               {cardMessages.map((card, index) => (
//                 <div
//                   key={index}
//                   className="card"
//                   onClick={() => handleCardClick(card.key)}
//                 >
//                   <p>{card.title}</p>
//                   <img src={assets[card.icon]} alt={`${card.title} Icon`} />
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="chat-section">
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`message-row ${message.sender === 'user' ? 'user-row' : 'bot-row'}`}
//               >
//                 {message.sender === 'bot' && (
//                   <img src={assets.gemini_icon} alt="Bot Icon" className="message-icon" />
//                 )}
//                 <div
//                   className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
//                 >
//                   <p>{message.text}</p>
//                 </div>
//                 {message.sender === 'user' && (
//                   <img src={assets.usermessage_icon} alt="User Icon" className="message-icon" />
//                 )}
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="main-bottom">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Enter a prompt here"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               ref={inputRef}
//             />
//             <div onClick={handleSend}>
//               <img src={assets.send_icon} alt="Send Icon" />
//             </div>
//           </div>
//           <p className="bottom-info">This may display inaccurate info</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;
















import React, { useState, useEffect } from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import botResponses from '../../assets/botResponses.json';
import axios from 'axios';
import { useRef } from 'react';
import { account } from '../../appwrite'; // Import the account object from appwrite.js

const API_URL = 'http://localhost:5000'; // Replace with the backend server URL

const Main = ({ resetChat, onLogout }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isFirstMessageSent, setIsFirstMessageSent] = useState(false);
  const [cardMessages, setCardMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null); // Add userId state
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await account.get(); // Fetch current logged-in user from Appwrite
        console.log('Current user:', user);
        console.log('User ID:', user?.$id);
        setUserId(user?.$id || null);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserId();
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const getRandomProblemsForCards = () => {
    const keys = Object.keys(botResponses);
    const randomProblems = [];
    while (randomProblems.length < 4) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      const randomProblem = botResponses[randomKey];
      if (!randomProblems.some((problem) => problem.title === randomProblem.title)) {
        randomProblems.push({ ...randomProblem, key: randomKey });
      }
    }
    return randomProblems;
  };

  const handleSend = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    if (input.trim()) {
      setIsFirstMessageSent(true);
      const newMessage = { sender: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      inputRef.current?.focus();

      try {
        let response;

        if (!sessionId) {
          response = await axios.post(`${API_URL}/api/new`, { userId, message: input });
          if (response.data.success) {
            setSessionId(response.data.sessionId);
            console.log('New session created with ID:', response.data.sessionId); // Log sessionId
          }
        } else {
          response = await axios.post(`${API_URL}/api/message`, { userId, sessionId, message: input });
        }

        if (response.data.success) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: response.data.response },
          ]);
        }
      } catch (error) {
        console.error('Error in sending message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: 'Oops! Something went wrong. Please try again.' },
        ]);
      }
    }
  };

  const handleCardClick = async (messageKey) => {
    const selectedProblem = botResponses[messageKey];
    const userMessage = selectedProblem.title;

    setIsFirstMessageSent(true);
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);

    try {
      let response;

      if (!sessionId) {
        response = await axios.post(`${API_URL}/api/new`, { userId, message: userMessage });
        if (response.data.success) {
          setSessionId(response.data.sessionId);
          console.log('New session created with ID:', response.data.sessionId); // Log sessionId
        }
      } else {
        response = await axios.post(`${API_URL}/api/message`, { userId, sessionId, message: userMessage });
      }

      if (response.data.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: response.data.response },
        ]);
      }
    } catch (error) {
      console.error('Error in creating chat from card:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'An error occurred. Please try again.' },
      ]);
    }
  };

  const startNewChat = () => {
    setSessionId(null); // Clear sessionId to indicate a new session
    setMessages([]);
    setIsFirstMessageSent(false);
  };

  useEffect(() => {
    setCardMessages(getRandomProblemsForCards());
    startNewChat();
  }, [resetChat]);

  return (
    <div className="main">
      <div className="nav">
        <p>Mechanic-AI</p>
        <div className="user-section" onClick={toggleDropdown}>
          <img src={assets.user_icon} alt="User Icon" />
          {isDropdownOpen && (
            <div className="dropdown">
              <button onClick={onLogout} className="dropdown-item">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="main-container">
        {!isFirstMessageSent ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {cardMessages.map((card, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => handleCardClick(card.key)}
                >
                  <p>{card.title}</p>
                  <img src={assets[card.icon]} alt={`${card.title} Icon`} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="chat-section">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-row ${message.sender === 'user' ? 'user-row' : 'bot-row'}`}
              >
                {message.sender === 'bot' && (
                  <img src={assets.gemini_icon} alt="Bot Icon" className="message-icon" />
                )}
                <div
                  className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  <p>{message.text}</p>
                </div>
                {message.sender === 'user' && (
                  <img src={assets.usermessage_icon} alt="User Icon" className="message-icon" />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a prompt here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              ref={inputRef}
            />
            <div onClick={handleSend}>
              <img src={assets.send_icon} alt="Send Icon" />
            </div>
          </div>
          <p className="bottom-info">This may display inaccurate info</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
