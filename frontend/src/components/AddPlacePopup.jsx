import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            title,
            link,
        });
    }

    React.useEffect(() => {
        setTitle('');
        setLink('');
    }, [isOpen]);

    return (
        <PopupWithForm
            name="new-card"
            title="Новое место"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonText="Создать">
            <div className="popup__content">
                <input type="text" className="popup__text popup__text_type_title" id="title" minLength="2" maxLength="30" name="name" placeholder="Название" onChange={handleChangeTitle} value={title} required />
                <span className="title-error popup__error popup__error_title"></span>
                <input type="url" className="popup__text popup__text_type_link" id="link" name="link" placeholder="Ссылка на картинку" onChange={handleChangeLink} value={link}required />
                <span className="link-error popup__error popup__error_link"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;