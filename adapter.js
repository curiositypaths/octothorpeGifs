const gifAdapterObj = {
    url: "https://fetch-message-in-the-bottle.herokuapp.com/api/v2/gifs",
    parseResponseJson: function parseResponseJson(response) {
      return response.json();
    },
    gifs: function () {
      const url = this.url;
      return fetch(url).then(this.parseResponseJson);
    },
    createGif: function (userId,gifUrl) {
      const url = this.url;
      const postConfig = {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({url:gifUrl,user_id:userId})
      };
      return fetch(url, postConfig).then(this.parseResponseJson);
    },
    deleteGif: function (gifId) {
        debugger
        return fetch(`${this.url}/${gifId}`,{method:'DELETE'}).then(this.parseResponseJson);
      },
  }