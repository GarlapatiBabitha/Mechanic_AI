
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { account } from './appwrite'; // Import Appwrite configuration



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [resetChat, setResetChat] = useState(false); // State to handle resetting chat

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        if (user) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Not logged in or session expired', error);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setIsAuthenticated(false);
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleNewChat = () => {
    setResetChat((prev) => !prev); // Toggle resetChat state
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/signup"
          element={<Signup onSignup={() => setIsAuthenticated(true)} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Sidebar onNewChat={handleNewChat} /> {/* Pass handleNewChat to Sidebar */}
            <Main resetChat={resetChat} onLogout={handleLogout} /> {/* Pass resetChat */}
          </>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;




















// import React, { useState, useEffect } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/sidebar/sidebar';
// import Main from './components/main/main';
// import Login from './components/auth/Login';
// import Signup from './components/auth/Signup';
// import { account } from './appwrite'; // Import Appwrite configuration



// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [resetChat, setResetChat] = useState(false); // State to handle resetting chat
//   const [conversation, setConversation] = useState([]);
//   const [currentSessionId, setCurrentSessionId] = useState(null);

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const user = await account.get();
//         if (user) {
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error('Not logged in or session expired', error);
//       }
//     };

//     checkSession();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await account.deleteSession('current');
//       setIsAuthenticated(false);
//       alert('Logged out successfully!');
//     } catch (error) {
//       console.error('Logout failed:', error);
//       alert('Logout failed. Please try again.');
//     }
//   };

//   const handleNewChat = () => {
//     setResetChat((prev) => !prev); // Toggle resetChat state
//     setConversation([]);
//     setCurrentSessionId(null);  
//   };
//   const handleChatSelect = (conversation, sessionId) => {
//     setConversation(conversation);
//     setCurrentSessionId(sessionId);
//   };
//   if (!isAuthenticated) {
//     return (
//       <Routes>
//         <Route
//           path="/login"
//           element={<Login onLogin={() => setIsAuthenticated(true)} />}
//         />
//         <Route
//           path="/signup"
//           element={<Signup onSignup={() => setIsAuthenticated(true)} />}
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     );
//   }

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <>
//             <Sidebar onNewChat={handleNewChat} onChatSelect={handleChatSelect}/> {/* Pass handleNewChat to Sidebar */}
//             <Main resetChat={resetChat} sessionId={currentSessionId}  onLogout={handleLogout} /> {/* Pass resetChat */}
//           </>
//         }
//       />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };

// export default App;










