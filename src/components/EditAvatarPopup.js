import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm 
      title='Обновить аватар'
      name='avatar'
      button='Сохранить'
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
      <label className="popup__container-form-label">
        <input 
          ref={ avatarRef }
          type="url" 
          name="avatar" 
          id="avatar-link-input" 
          placeholder="https://somewebsite.com/someimage.jpg" 
          className="popup__container-form-field popup__container-form-field popup__container-form-field_avatar" 
          required 
        />
        <span className="popup__container-form-error avatar-link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;