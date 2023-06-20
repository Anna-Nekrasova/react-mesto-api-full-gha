import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [about, setAbout] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonText="Сохранить">
            <div className="popup__content">
                <input type="text" className="popup__text popup__text_type_name" id="userName" minLength="2" maxLength="40" name="name" placeholder="Имя" onChange={handleChangeName} value={name} required />
                <span className="userName-error popup__error popup__error_name"></span>
                <input type="text" className="popup__text popup__text_type_about" id="userAbout" minLength="2" maxLength="200" name="about" placeholder="О себе" onChange={handleChangeAbout} value={about} required />
                <span className="userAbout-error popup__error popup__error_about"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;