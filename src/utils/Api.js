class Api {
    constructor(data) {
        this._baseUrl = data.serverUrl;
        this._token = data.token;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}cards`, {
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    editProfile(data) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then((res) => this._handleResponse(res))
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then((res) => this._handleResponse(res))
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    addCardLike(data) {
        return fetch(`${this._baseUrl}cards/${data}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    deleteCardLike(data) {
        return fetch(`${this._baseUrl}cards/${data}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    editAvatar(data) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then((res) => this._handleResponse(res))
    }

    changeLikeCardStatus(data, isLiked) {
        return fetch(`${this._baseUrl}cards/${data}/likes`, {
            method: !isLiked ? 'DELETE' : 'PUT',
            headers: {
                authorization: this._token,
            }
        })
            .then((res) => this._handleResponse(res))
    }
}


const api = new Api({
    serverUrl: 'https://mesto.nomoreparties.co/v1/cohort-42/',
    token: 'da2b0bcf-d08e-4c4f-a5b5-5131bea0378d',
});

export default api;


