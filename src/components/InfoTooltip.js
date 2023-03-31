import logoSuccess from '../images/success.png'
import logoError from '../images/error.png'

function InfoTooltip({ isOpen, onClose, isSuccess, name }) {
  return (
    <>
    { isSuccess ?
    <div className={ `popup ${ name }-popup ${ isOpen ? 'popup_opened' : '' }` }>
      <div className={ `popup__container popup__container_${ name }` }>
        <img src={ logoSuccess } alt="Логотип" className="popup__container-img-info" />
        <h2 className={ `popup__container-title popup__container-title_${ name }` }>Вы успешно зарегистрировались!</h2>
        <button onClick={ onClose } type="button" aria-label="Закрыть" className="popup__button-close popup__button-close_delete-card"></button>
      </div>
    </div>
    :
    <div className={ `popup ${ name }-popup ${ isOpen ? 'popup_opened' : '' }` }>
      <div className={ `popup__container popup__container_${ name }` }>
        <img src={ logoError } alt="Логотип" className="popup__container-img-info" />
        <h2 className={ `popup__container-title popup__container-title_${ name }` }>Что-то пошло не так! Попробуйте ещё раз.</h2>
        <button onClick={ onClose } type="button" aria-label="Закрыть" className="popup__button-close popup__button-close_delete-card"></button>
      </div>
    </div>
    }
    </>
  )
}

export default InfoTooltip;