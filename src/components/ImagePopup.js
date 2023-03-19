function ImagePopup({ card, onClose }) {
  return (
    <div className={ `popup popup_photo-place ${card.isSelectedCard ? 'popup_opened' : ''}` }>
      <div className="popup__container-photo-place">
        <img src={ card.link } alt="" className="popup__img-photo-place" />
        <h2 className="popup__container-title-photo-place">{ card.title }</h2>
        <button onClick={ onClose } type="button" aria-label="Закрыть" className="popup__button-close popup__button-close_photo-place"></button>
      </div>
    </div>
  );
}

export default ImagePopup;