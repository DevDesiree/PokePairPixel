getUserData();

if (!checkUserData()) location = "index.html";

const avatar = document.getElementById('avatar');
const usernameData = document.getElementById('usernameData');
const difficultyData = document.getElementById('difficultyData');
const sizeData = document.getElementById('sizeData');

let uncoveredCards = [];

let points = 0

function setData() {
    const difficultyMessages = {
        1: "Fácil",
        2: "Medio",
        3: "Dificil"
    };

    const sizeMessages = {
        3: "6x3 = 18 cartas, 9 parejas",
        4: "6x4 = 24 cartas, 12 parejas",
        5: "6x5 = 30 cartas, 15 parejas"
    };

    let difi = difficultyMessages[difficultyValue] || "Dificultad desconocida";
    let size = sizeMessages[cardsValue] || "Tamaño desconocido";

    avatar.innerHTML = `<img src="${avatarItemsValue}" alt="Avatar">`;
    usernameData.innerHTML = "Hola, " + nickValue;
    difficultyData.innerHTML = "Dificultad: " + difi;
    sizeData.innerHTML = "Tamaño: " + size;
    buildBoard();
}

document.addEventListener('DOMContentLoaded', setData);

const boardContainer = document.getElementById('boardContainer');


function buildBoard() {
    const numCards = cardsValue * 6;
    const cardImages = getImages(numCards);

    let displayTime;
    let countdown = 0;
    const clicksContainer = document.getElementById('clicksContainer');
    let clicks = 0;

    if (difficultyValue == 1) {
        displayTime = 2000; // 2 seg
        clicks = 60;
        countdown = 60;
    } else if (difficultyValue == 2) {
        displayTime = 1500; // 1.5 seg
        clicks = 90;
        countdown = 90;
    } else if (difficultyValue == 3) {
        displayTime = 1000; // 1 seg
        clicks = 120;
        countdown = 120;
    }

    if (cardsValue == 3) {
        countdown = 120;
    } else if (cardsValue == 4) {
        countdown += 20;
    } else if (cardsValue == 5) {
        countdown += 30;
    }

    function getClicks() {
        clicks--;
        clicksContainer.innerHTML = "Clicks restantes = " + clicks;
        if (clicks === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos!',
                text: 'Has utilizado todos tus clics para este nivel',
                showConfirmButton: true,
                didClose: () => {
                    window.location.href = 'juego.html';
                },
                footer: '<a href="juego.html">Vuelve a intentarlo</a>'
            });
        }
    }

    function startCountdown(countdown) {
        const timerContainer = document.getElementById('timerContainer');

        const interval = setInterval(() => {
            countdown--;
            if (countdown < 0) {
                clearInterval(interval);
                Swal.fire({
                    icon: 'error',
                    title: 'El tiempo ha terminado',
                    text: 'No terminaste dentro del tiempo asignado',
                    showConfirmButton: true,
                    didClose: () => {
                        window.location.href = 'juego.html';
                    },
                    footer: '<a href="juego.html">Vuelve a intentarlo</a>'
                });
                return;
            }
            timerContainer.innerHTML = 'Tiempo restante ' + countdown;
        }, 1000);
    }

    const boardContainer = document.getElementById('boardContainer');
    boardContainer.addEventListener("click", getClicks);

    let firstCard = null;
    let secondCard = null;
    let attempts = 0;

    const scoreContainer = document.getElementById('scoreContainer');
    let points = 0;

    for (let index = 0; index < numCards; index++) {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('cardInner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('cardFront');
        cardFront.style.backgroundImage = `url(${cardImages[index]})`;

        const cardBack = document.createElement('div');
        cardBack.classList.add('cardBack');

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', function () {
            if (attempts === 2 || card.classList.contains('flipped')) {
                return;
            }

            card.classList.add('flipped');

            if (firstCard === null) {
                firstCard = card;
            } else {
                secondCard = card;

                if (firstCard.querySelector('.cardFront').style.backgroundImage === secondCard.querySelector('.cardFront').style.backgroundImage) {
                    // Las cartas son iguales
                    setTimeout(() => {
                        firstCard.classList.add('ok');
                        secondCard.classList.add('ok');
                        points++;
                        scoreContainer.innerHTML = "Tu score es " + points;
                        checkVictory();
                    }, 1000);

                } else {
                    // Las cartas no son iguales, se ocultan despues de un tiempo
                    setTimeout(() => {
                        firstCard.classList.remove('flipped');
                        secondCard.classList.remove('flipped');
                    }, displayTime);
                }

                attempts = 2;
            }

            if (attempts === 2) {
                setTimeout(() => {
                    firstCard = null;
                    secondCard = null;
                    attempts = 0;
                }, displayTime);
            }
        });

        boardContainer.appendChild(card);
    }

    startCountdown(countdown);
}


function checkVictory() {
    const cards = boardContainer.querySelectorAll('.cardBack');

    let allOk = true;

    cards.forEach((card) => {
        if (!card.classList.contains('ok')) {
            allOk = false;
            return;
        }
    });

    if (allOk) {
        Swal.fire({
            icon: 'success',
            title: 'Felicidades!',
            text: 'Has completado el juego con ' + points + ' puntos.',
            showConfirmButton: true,
            didClose: () => {
                window.location.href = 'juego.html';
            },
        });
    }
}


function getImages(numCards) {

    const images = [
        './img/AvatarCartas/moltresback.png',
        './img/AvatarCartas/artiback.png',
        './img/AvatarCartas/altariaback.png',
        './img/AvatarCartas/charmaback.png',
        './img/AvatarCartas/dragoniteback.png',
        './img/AvatarCartas/dratiniback.png',
        './img/AvatarCartas/eeveeback.png',
        './img/AvatarCartas/flareonback.png',
        './img/AvatarCartas/laprasback.png',
        './img/AvatarCartas/mewback.png',
        './img/AvatarCartas/pikaback.png',
        './img/AvatarCartas/squirtleback.png',
        './img/AvatarCartas/tyfoback.png',
        './img/AvatarCartas/umbreonback.png',
        './img/AvatarCartas/zapdosback.png'

    ]
    const duplicatedImages = images
        .sort(() => 0.5 - Math.random())
        .slice(0, numCards / 2)
        .concat(images.slice(0, numCards / 2))
        .sort(() => 0.5 - Math.random());
    return duplicatedImages;
}

const clearDataBtn = document.getElementById('clearDataBtn');

clearDataBtn.addEventListener('click', function () {
    localStorage.clear();
    Swal.fire({
        icon: 'success',
        title: 'Session Borrada',
        text: 'Los datos han sido borrados',
        showConfirmButton: true,
        timer: 3000,
        didClose: () => {
            window.location.href = 'index.html';
        },
        footer: '<a href="index.html">Volviendo al index</a>'
    });
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
});

