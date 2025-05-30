// src/components/App.jsx
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header/header';
import Main from './Main/main';
import Footer from './Footer/footer';
import Register from './Register/Register';
import Login from './Login/Login';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import InfoTooltip from './InfoTooltip/InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';
import api from '../utils/api';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState({
    isSuccess: false,
    message: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            setCurrentUser(prevState => ({
              ...prevState,
              email: res.data.email
            }));
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt');
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([userData, cardsData]) => {
          setCurrentUser(prevState => ({
            ...prevState,
            ...userData
          }));
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleLogin = async (email, password) => {
    try {
      const data = await auth.authorize(email, password);
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/');
      }
    } catch (err) {
      setTooltipStatus({
        isSuccess: false,
        message: "Erro ao iniciar sessão"
      });
      setIsInfoTooltipOpen(true);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await auth.register(email, password);
      setTooltipStatus({
        isSuccess: true,
        message: "Registro efetuado com susesso!"
      });
      navigate('/signin');
    } catch (err) {
      setTooltipStatus({
        isSuccess: false,
        message: "Erro ao cadastrar"
      });
    } finally {
      setIsInfoTooltipOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/signin');
  };

  const closeAllPopups = () => {
    setIsInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header 
            loggedIn={loggedIn} 
            userEmail={currentUser.email} 
            onLogout={handleLogout} 
          />
          
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main cards={cards} />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Register onRegister={handleRegister} />} />
            <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          </Routes>

          {loggedIn && <Footer />}

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={tooltipStatus.isSuccess}
            message={tooltipStatus.message}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;