import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = React.useContext(CurrentUserContext);
  const [formValues, setFormValues] = React.useState({ name: "", job: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }

  React.useEffect(() => {
    setFormValues({ name: currentUser.name, job: currentUser.about });
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: formValues.name,
      about: formValues.job,
    });
  }

  return (
    <PopupWithForm 
      title='Редактировать профиль' 
      name='profile'
      button='Сохранить' 
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    > 
      <label className="popup__container-form-label">
        <input 
          type="text" 
          value={ formValues.name || "" }
          onChange= { handleChange }
          name="name" 
          id="name-input" 
          className="popup__container-form-field popup__container-form-field_type_name" 
          required 
        />
        <span className="popup__container-form-error name-input-error"></span>
      </label>
      <label className="popup__container-form-label">
        <input 
          type="text"
          value={ formValues.job || "" }
          onChange={ handleChange } 
          name="job" 
          id="job-input" 
          className="popup__container-form-field popup__container-form-field_type_job" 
          required 
        />
        <span className="popup__container-form-error job-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;