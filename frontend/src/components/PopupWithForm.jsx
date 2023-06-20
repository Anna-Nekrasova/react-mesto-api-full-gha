function PopupWithForm({name, title, onClose, isOpen, onSubmit, buttonText, children}) {
    return (
            <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
                <div className="popup__body">
                    <button className="popup__close" type="button" onClick={onClose}></button>
                    <h2 className="popup__title">{title}</h2>
                    <form className="popup__form" name="form" onSubmit={onSubmit}>
                        {children}
                        <button className="popup__save" type="submit">{buttonText}</button>
                    </form>
                </div>
            </div>
    )
}

export default PopupWithForm;