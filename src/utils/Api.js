class Api {
    constructor(data) {
        this._baseUrl = data.serverUrl;
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

    getUserInfo(jwt) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            }
        })
            .then((res) => this._handleResponse(res)
            )

    }

    getInitialCards(jwt) {
        return fetch(`${this._baseUrl}cards`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            method: 'GET',
        })
            .then((res) => this._handleResponse(res))
    }

    editProfile(data, jwt) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            })
        })
            .then((res) => this._handleResponse(res));
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then((res) => this._handleResponse(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    addCardLike(data) {
        return fetch(`${this._baseUrl}cards/${data}/likes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    deleteCardLike(data) {
        return fetch(`${this._baseUrl}cards/${data}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then((res) => this._handleResponse(res))
    }

    editAvatar(data, jwt) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            }
        })
            .then((res) => this._handleResponse(res))
    }
}


const api = new Api({
    serverUrl: 'http://localhost:3000/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
});

export default api;


