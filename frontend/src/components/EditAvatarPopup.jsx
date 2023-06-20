import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const photoRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(photoRef.current.value);
    }

    React.useEffect(() => {
        photoRef.current.value = '';
    }, [isOpen]);

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonText="Сохранить">
            <div className="popup__content">
                <input type="url" className="popup__text popup__text_type_link" id="avatar" name="link" placeholder="Ссылка на аватар" ref={photoRef} required />
                <span className="avatar-error popup__error popup__error_link"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;