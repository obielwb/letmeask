import { useState } from 'react';

import { createContext } from 'react';

import { firebase, auth } from './services/Firebase';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/global.scss'

type User = {
  id: string, 
  name: string, 
  avatar: string
}

type AuthContextType = {
  user: User | undefined, 
  signInWithGoogle: () => void
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('User is missing displayName or photoURL');
        }

        setUser({
          id: uid,
          name: displayName, 
          avatar: photoURL
        });
      }
    })
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;