import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import api from '../utils/api.js';
import * as auth from '../utils/auth.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userData, setUserData] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({ isSelectedCard: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => { 
    Promise.all([api.getUserInfo(), api.getInitialCards()]) 
    .then(([info, data]) => {
      setCurrentUser(info);
      const newCards = data.map((card) => {
        return card;
      })
      setCards(newCards);
    }).catch((err) => {
      console.error(err); 
    });
    handleTokenCheck();
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(link, title) {
    setSelectedCard({ link: link, title: title, isSelectedCard: true });
  }

  function handleTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ isSelectedCard: false });
  }

  function handleCardLike(card, currentUser) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  }).catch((err) => {
    console.error(err); 
  });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => {
      console.error(err); 
    });
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about }).then((info) => {
      setCurrentUser(info);
      closeAllPopups();
    }).catch((err) => {
      console.error(err); 
    });
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatar({ avatar }).then((info) => {
      setCurrentUser(info);
      closeAllPopups();
    }).catch((err) => {
      console.error(err); 
    });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.renderCard({ name, link }).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err); 
    });
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  function handleSuccess(isOpen) {
    setIsSuccess(isOpen);
  }

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token){
      auth.checkToken(token).then((res) => {
        if (res){
          const userData = res.data.email;
          setLoggedIn(true);
          setUserData(userData)
          navigate('/', {replace: true})
        }
      });
    }
  } 

  function signOut() {
    localStorage.removeItem('token');
  }

  return (

  <CurrentUserContext.Provider value={ currentUser }>
  <div className="page"> 
  <Routes>
    <Route element={<ProtectedRouteElement loggedIn={loggedIn}/>}>
      <Route 
        path='/' 
        element={
          <>
            <Header 
              title={'Выйти'}
              link={'/sign-in'}
              userData={ userData }
              onSignOut={ signOut }
              loggedIn={ loggedIn }
            />
            <Main 
              onEditProfile={ handleEditProfileClick }
              onAddPlace={ handleAddPlaceClick }
              onEditAvatar={ handleEditAvatarClick }
              onCardClick={ handleCardClick }
              cards={ cards }
              onCardLike={ handleCardLike }
              onCardDelete= { handleCardDelete }
              loggedIn= { loggedIn }
            />
            <Footer />
          </>
        }
      />
    </Route>
    <Route path='/sign-in' element={<Login onLogin={ handleLogin } handleTooltipOpen={ handleTooltipOpen } handleSuccess={ handleSuccess } />} />
    <Route path='/sign-up' element={<Register handleTooltipOpen={ handleTooltipOpen } handleSuccess={ handleSuccess } />} />
    <Route path="*" element={ loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
  </Routes>

    <EditProfilePopup 
      isOpen={ isEditProfilePopupOpen } 
      onClose={ closeAllPopups } 
      onUpdateUser={ handleUpdateUser }
    />

    <AddPlacePopup 
      isOpen={ isAddPlacePopupOpen }
      onClose={ closeAllPopups }
      onAddPlaceSubmit={ handleAddPlaceSubmit }
    />
    
    <EditAvatarPopup 
      isOpen={ isEditAvatarPopupOpen } 
      onClose={ closeAllPopups } 
      onUpdateAvatar={ handleUpdateAvatar }
    />

    <PopupWithForm
      title='Вы уверены?'
      name='delete-card'
      button='Да'
    />

    <ImagePopup 
      card={ selectedCard }
      onClose={ closeAllPopups }
    />

    <InfoTooltip 
      isOpen={ isInfoTooltipOpen }
      onClose={ closeAllPopups }
      isSuccess={ isSuccess }
      name='info'
    />

  </div>
  </CurrentUserContext.Provider>

  );
}

export default App;
