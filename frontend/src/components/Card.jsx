import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const card = props.card;
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `elements__like ${isLiked && 'elements__like_on'}` 
    );

    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleDeleteClick() {
        props.onCardDelete(card);
    }

    return (
        <div key={props._id} className="elements__item" >
            {isOwn && <button className="elements__delete" type="button" onClick={handleDeleteClick}></button>}
            <img className="elements__image" alt={props.name} src={props.link} onClick={handleClick} />
            <div className="elements__row">
                <h2 className="elements__title">{props.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="elements__number">{props.likes.length}</p>
                </div>
            </div>
        </div>
    );
}
    
export default Card;