const fetch = require('node-fetch')
module.exports = class FetchRouter {
  static async get(route, accessToken) {

    return await fetch(route, {
      headers:  {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  static async post(route, accessToken, bodyPOJO) {

    return await fetch(route, {
      method: "POST",
      body: JSON.stringify(bodyPOJO),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  static async delete(route, accessToken) {

    return await fetch(route, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  static async put(route, accessToken, bodyPOJO) {
    return await fetch(route, {
      method: "PUT",
      body: JSON.stringify(bodyPOJO),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
  static async patch(route, accessToken, bodyPOJO) {

    return await fetch(route, {
      method: "PATCH",
      body: JSON.stringify(bodyPOJO),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
};
