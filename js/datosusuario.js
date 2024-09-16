let nickValue;
let difficultyValue;
let cardsValue;
let avatarItemsValue;

function saveLocal() {
    const nick = document.getElementById('nickname').value;
    const difficulty = document.getElementById('difficulty').value;
    const cards = document.getElementById('cards').value;
    const avatarContainer = document.getElementById('avatar-image');
    localStorage.setItem('nick', nick);
    localStorage.setItem('difficulty', difficulty);
    localStorage.setItem('cards', cards);
    localStorage.setItem('avatarImg', avatarContainer.src);
}

function getUserData() {
    nickValue = localStorage.getItem("nick");
    difficultyValue = localStorage.getItem("difficulty");
    cardsValue = localStorage.getItem("cards");
    avatarItemsValue = localStorage.getItem("avatarImg");
}

function checkUserData() {
    if (!nickValue || !difficultyValue || !cardsValue || !avatarItemsValue) {
        localStorage.setItem("error", "No se rellenó correctamente");
        return false;
    }
    return true;
}
