import { checkResponse } from "./checkResponse";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return this._request(`/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`/cards`, {
      headers: this._headers,
    });
  }

  setUserInfo(data) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  renderCard(data) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._request(`/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this._request(`/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkResponse(res);
      });
    } else {
      return this._request(`/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    }
  }

  updateAvatar(avatar) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "779c3ebd-8504-4175-be99-baca153c2683",
    "Content-Type": "application/json",
  },
});

export default api;
