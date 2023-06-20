import React from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditAvatar, onAddPlace, onEditProfile, cards, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    
    return (
        <main className="content">

            <section className="profile">

                <div className="profile__info">
                    <div className="profile__cover" onClick={onEditAvatar}>
                        <img className="profile__avatar" alt="Аватар" id="userAvatar" name="avatar" src={currentUser.avatar} />
                    </div>
                    <div>
                        <div className="profile__name">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="profile__edit" type="button" onClick={onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add" type="button" onClick={onAddPlace}></button>

            </section>

            <section className="elements">
                {cards.map((item) => 
                    <Card 
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        onCardClick={onCardClick}
                        card={item}
                        key={item._id}
                        name={item.name}
                        link={item.link}
                        likes={item.likes}
                    />
                )}
            </section>

        </main>
    );
}
export default Main;