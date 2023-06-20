function ImagePopup({card, onClose}) {
    return(
        <div className={`popup popup_type_pic ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup__frame">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <img className="popup__image" alt={card ? card.name : ''} src={card ? card.link : ''} />
                <h2 className="popup__name">{card ? card.name : ''}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;