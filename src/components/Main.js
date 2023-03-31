import React from 'react';
import editButton from '../images/profile__info-edit-button.svg';
import addButton from '../images/profile__add-button.svg';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, loggedIn, handleSubmit, handleChange, formValue, title, buttonText, children }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      { loggedIn ? 
      
        <main className="content">
          <section className="profile">
            <div onClick={ onEditAvatar } className="profile__avatar-container">
              <img src={ currentUser.avatar } alt="Аватар" className="profile__avatar" />
            </div>
            <div className="profile__info">
              <h1 className="profile__info-title">{ currentUser.name }</h1>
              <button onClick={ onEditProfile } type="button" className="profile__info-edit-button">
                <img src={ editButton } alt="Редактировать" className="profile__info-edit-button-img" />
              </button>
              <p className="profile__info-subtitle">{ currentUser.about }</p>
            </div>
            <button onClick={ onAddPlace } type="button" className="profile__add-button">
              <img src={ addButton } alt="Добавить" className="profile__add-button-img" />
            </button>
          </section>
          <section className="elements">
            <ul className="elements__cards">
              { cards.map((card) => {
                return (
                  <Card 
                  key={ card._id } 
                  card={ card }
                  onCardClick= { onCardClick }
                  onCardLike= { onCardLike }
                  onCardDelete= { onCardDelete } />
                )
              }) }
            </ul>
          </section>
        </main>
    
      :
        <section className="auth">
          <h2 className="auth__title">{ title }</h2>
          <form onSubmit={ handleSubmit } className="popup__container-form">
            <label className='popup__container-form-label' htmlFor="email">
              <input className='popup__container-form-field popup__container-form-field_auth' placeholder='Email' required id="email" name="email" type="text" value={ formValue.email } onChange={ handleChange }/>
            </label>
            <label className='popup__container-form-label popup__container-form-label_auth' htmlFor="password">
              <input className='popup__container-form-field popup__container-form-field_auth' placeholder='Пароль' required id="password" name="password" type="password" value={ formValue.password } onChange={ handleChange } />
            </label>
            <button className="popup__container-form-button popup__container-form-button_auth" type="submit" onSubmit={ handleSubmit }>{ buttonText }</button>
            { children }
          </form>
        </section>
      }
    </>
  );
}

export default Main;