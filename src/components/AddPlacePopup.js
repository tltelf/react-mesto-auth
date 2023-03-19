import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {

  const titleRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({
      name: titleRef.current.value,
      link: linkRef.current.value
    });
    titleRef.current.value = '';
    linkRef.current.value = '';
  }

  return (
    <PopupWithForm 
      title='Новое место'
      name='card'
      button='Создать'
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
      <label className="popup__container-form-label">
        <input 
          ref={ titleRef }
          type="text" 
          name="title" 
          id="title-input" 
          placeholder="Название" 
          className="popup__container-form-field popup__container-form-field_new-place-title" 
          required 
        />
        <span className="popup__container-form-error title-input-error"></span>
      </label>
      <label className="popup__container-form-label">
        <input 
          ref={ linkRef }
          type="url" 
          name="link" 
          id="link-input" 
          placeholder="Ссылка на картинку" 
          className="popup__container-form-field popup__container-form-field_new-place-link" 
          required 
        />
        <span className="popup__container-form-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;