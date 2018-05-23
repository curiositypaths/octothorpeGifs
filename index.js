document.addEventListener("DOMContentLoaded", function(event) {
  const userId = 1;
  const container = document.getElementById("container");
  const newGifInput = document.getElementById("new-gif-input");
  const newGifForm = document.getElementById("new-gif-form");
  const gifsContainer = document.getElementById("gifs-container");

  function fetchGifs() {
    return gifAdapterObj.gifs().then(displayGifts);
  }

  function displayGifts(gifsObjs) {
    gifsObjs.forEach(gifObj => (gifsContainer.innerHTML += generateGifHTML(gifObj)));
  }

  function generateGifHTML(gifObj) {
    return `<div><img data-gif-id='${gifObj.id}' data-user-id='${gifObj.user_id}' src='${gifObj.url}'></div>`;
  }

  function addNewGifEventListener() {
    newGifForm.addEventListener('keydown',createNewGif)
  }

  function createNewGif(event) {
      if (pressedEnter(event)) {
        event.preventDefault()
        const gifUrl = newGifInput.value
        gifAdapterObj.createGif(userId,gifUrl).then(displayNewGif).then(()=>{newGifInput.value=""})
      }
  }

  function pressedEnter(event) {
      return (event.keyCode === 13)
  }

  function displayNewGif(gifObj) {
    gifsContainer.innerHTML = `${generateGifHTML(gifObj)}${gifsContainer.innerHTML}`
  }

  function addGifDeleteHandler() {
    gifsContainer.addEventListener('click',handleDeleteGif)
  }

  function canDeleteGif(idString) {
      return parseInt(idString) === userId
  }

  function deleteGif(gifElement) {
      gifAdapterObj.deleteGif(gifElement.dataset.gifId).then(()=>{gifElement.remove()})
  }

  function handleDeleteGif(event) {
    if (event.target.tagName === "IMG") {
        canDeleteGif(event.target.dataset.userId) ? deleteGif(event.target) : alert(`So zorry, this is not your gif`)
    }
  }

  function startApp() {
    fetchGifs();
    addNewGifEventListener()
    addGifDeleteHandler()
  }

  startApp();
});
