import React from 'react';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import api from '../utils/api.js';



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isSelectedCard: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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
    })
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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
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

  return (

  <CurrentUserContext.Provider value={ currentUser }>
  <div className="page"> 
    <Header />
    <Main 
      onEditProfile={ handleEditProfileClick }
      onAddPlace={ handleAddPlaceClick }
      onEditAvatar={ handleEditAvatarClick }
      onCardClick={ handleCardClick }
      cards={ cards }
      onCardLike={ handleCardLike }
      onCardDelete= { handleCardDelete }
    />
    <Footer />

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

  </div>
  </CurrentUserContext.Provider>

  );
}

export default App;
