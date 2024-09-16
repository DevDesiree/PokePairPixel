const nicknameInput = document.getElementById("nickname");
const difficultySelect = document.getElementById("difficulty");
const cardsSelect = document.getElementById("cards");
const gameForm = document.getElementById("game-form");
const errorMessage = document.getElementById("error-message");
const submitButton = document.getElementById("play-button");
const avatarContainer = document.getElementById("avatar-image");
const avatarItems = document.getElementsByClassName("item-image");
const difficultyMessage = document.getElementById("difficulty-message");
const cardsMessage = document.getElementById("cards-message");
let draggedItem;


function validateForm(event) {
    if (nicknameInput.value.length === 0) {
        event.preventDefault();
        nicknameInput.focus();
        errorMessage.innerText = "El campo nick no puede estar vacío";
        errorMessage.style.display = "block";
        return;
    } else if (difficultySelect.value == 0) {
        event.preventDefault();
        difficultySelect.focus();
        errorMessage.innerText = "Tienes que elegir la dificultad";
        errorMessage.style.display = "block";
        return;
    } else if (cardsSelect.value == 0) {
        event.preventDefault();
        cardsSelect.focus();
        errorMessage.innerText = "Tienes que elegir un tamaño de tarjetas";
        errorMessage.style.display = "block";
        return;
    }
    saveLocal();
}

submitButton.addEventListener("click", validateForm);

difficultySelect.addEventListener('change', function () {
    if (difficultySelect.value == 1) {
        difficultyMessage.innerText = "Fácil : 2 Seg Mostrados";
        difficultyMessage.style.display = "block";
        return;
    }
    if (difficultySelect.value == 2) {
        difficultyMessage.innerText = "Medio : 1.5 Seg Mostrados";
        difficultyMessage.style.display = "block";
        return;
    }
    if (difficultySelect.value == 3) {
        difficultyMessage.innerText = "Difícil : 1 Seg Mostrados";
        difficultyMessage.style.display = "block";
        return;
    }
    if (difficultySelect.value == 0) {
        difficultyMessage.style.display = "none";
    }
});

cardsSelect.addEventListener('change', function () {
    if (cardsSelect.value == 3) {
        cardsMessage.innerText = "6x3 = 18 cartas 9 parejas";
        cardsMessage.style.display = "block";
        return;
    }
    if (cardsSelect.value == 4) {
        cardsMessage.innerText = "6x4 = 24 cartas 12 parejas";
        cardsMessage.style.display = "block";
        return;
    }
    if (cardsSelect.value == 5) {
        cardsMessage.innerText = "6x5 = 30 cartas 15 parejas";
        cardsMessage.style.display = "block";
        return;
    }
    if (cardsSelect.value == 0) {
        cardsMessage.style.display = "none";
    }
});


nicknameInput.addEventListener("input", function () {
    errorMessage.style.display = "none";
});
difficultySelect.addEventListener("change", function () {
    errorMessage.style.display = "none";
});
cardsSelect.addEventListener("change", function () {
    errorMessage.style.display = "none";
});


function handleDrag(event) {
    draggedItem = event.target;
}

function handleDrop(event) {
    event.preventDefault();
    avatarContainer.src = draggedItem.src;
}

for (let item of avatarItems) {
    item.addEventListener("dragstart", handleDrag);
}
avatarContainer.addEventListener("dragover", e => e.preventDefault());
avatarContainer.addEventListener("drop", handleDrop);
