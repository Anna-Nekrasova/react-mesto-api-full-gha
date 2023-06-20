//import './App.css';
import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import InfoToolTip from './InfoToolTip.jsx';
import * as mestoAuth from "../mestoAuth.js";
import Register from './Register.jsx';
import Login from './Login.jsx';
import ProtectedRoute from './ProtectedRoute.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = React.useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardInfo, setCardInfo] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({ avatar: '', name: '', about: '' });
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [registrationInfo, setRegistrationInfo] = React.useState("");
  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsNewCardPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditPopupOpen(true);
  };

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  };

  function closeAllPopups() {
    setIsAvatarPopupOpen(false);
    setIsNewCardPopupOpen(false);
    setIsEditPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.deleteOrAddLikeCard(isLiked, card._id)
      .then((newCard) => {
        setCardInfo((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCardInfo((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.sendDataUserInfo({
      userName: name,
      userAbout: about,
    })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(avatar) {
    api.sendDataAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdatePlaceSubmit({ title, link }) {
    api.sendDataCards(title, link)
      .then((newCard) => {
        setCardInfo([newCard, ...cardInfo]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  const registerUser = ({ email, password }) => {
    mestoAuth.register(email, password)
      .then((res) => {
        setCurrentEmail(res.email);
        navigate('/sign-in');
        setIsSuccess(true);
        setRegistrationInfo("Вы успешно зарегестрировались!");
        setIsInfoToolTipOpen(true);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setRegistrationInfo("Что-то пошло не так! Попробуйте еще раз.");
        setIsInfoToolTipOpen(true);
      });
  }

  const loginUser = ({ email, password }) => {
    mestoAuth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setCurrentEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      mestoAuth.getUserData(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentEmail(res.data.email);
            navigate("/", { replace: true });
          }
        })
    }
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate("/sign-in");
    setCurrentEmail("");
  }

  React.useEffect(() => {
    checkToken();
    if (isLoggedIn) {
      api.getDataUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });

      api.getDataCards()
        .then((cards) => {
          setCardInfo(cards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <Header headerEmail={currentEmail} isLoggedIn={isLoggedIn} signOut={signOut} />
        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            cards={cardInfo}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isloggedIn={isLoggedIn} />}
          />
          <Route path="/sign-up" element={<Register registerUser={registerUser} />} />
          <Route path="/sign-in" element={<Login loginUser={loginUser} />} />

        </Routes>

        <Footer />

        <EditProfilePopup isOpen={isEditPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isNewCardPopupOpen} onClose={closeAllPopups} onAddPlace={handleUpdatePlaceSubmit} />

        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          onClose={closeAllPopups}
          buttonText="Да">
        </PopupWithForm>

        <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} registrationInfo={registrationInfo} isSuccess={isSuccess} />
      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
