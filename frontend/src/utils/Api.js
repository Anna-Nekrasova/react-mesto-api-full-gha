export default class Api {
    constructor(baseUrl, token) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _getHeaders() {
        return {
            authorization: this._token,
            'Content-Type': 'application/json',
        }
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getDataUserInfo() {
        const promise = fetch('https://nomoreparties.co/v1/cohort-61/users/me', {
            method: 'GET',
            headers: this._getHeaders(),
        })

        return promise.then(this._checkStatus);
    }

    getDataCards() {
        const promise = fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._getHeaders(),
        })

        return promise.then(this._checkStatus);
    }

    sendDataUserInfo({ userName, userAbout }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: userName,
                about: userAbout
            })
        })
            .then(this._checkStatus);
    }

    sendDataCards(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkStatus);
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(this._checkStatus);
    }

    deleteOrAddLikeCard(method, id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: method ? 'DELETE' : 'PUT',
            headers: this._getHeaders(),
        })
            .then(this._checkStatus);
    }

    sendDataAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                    avatar: link
            })
        })
            .then(this._checkStatus);
    }
}

const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-61';
const token = 'bcc1a74c-1889-44aa-90fb-64902ff81902';
export const api = new Api(baseUrl, token);