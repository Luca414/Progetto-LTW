const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = controlla_bonus();

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data,...data,...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  /*if (lockBoard) return;
  if (this === firstCard) return;*/
  var n=parseInt(document.querySelector(".score").textContent);
  if (n>0){
    aggiorna_bonus();
    this.classList.add("flipped");
  }else{
    window.alert("crediti esauriti");
  }
  

  /*if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();*/
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  //document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}


function aggiorna_bonus(){

  // Recupera l'username dal Local Storage
  const username = localStorage.getItem('username');

  // Crea una nuova richiesta XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Configura la richiesta
  xhr.open('POST', '/pay_bonus/aggiorna_bonus.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Definisce la funzione da eseguire quando la richiesta ha successo
  xhr.onload = function() {
    const numeroBonus = xhr.responseText.trim();
    //alert(`Il tuo nuovo numero di bonus è ${numeroBonus}.`);
    document.querySelector(".score").textContent=numeroBonus;
  };

  // Definisce la funzione da eseguire in caso di errore
  xhr.onerror = function() {
    console.log('Errore durante la richiesta.');
  };

  // Invia la richiesta al server
  xhr.send(`username=${username}`);
}

function controlla_bonus(){
  const username = localStorage.getItem('username');

  // Crea un nuovo oggetto XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Imposta l'URL della richiesta
  xhr.open('POST', '/pay_bonus/recupera_bonus.php', true);

  // Imposta l'header della richiesta
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Imposta la funzione da eseguire quando la richiesta viene completata
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      const numeroBonus = this.responseText.trim();
      //alert(`Hai ${numeroBonus} bonus.`);
      document.querySelector(".score").textContent = numeroBonus;
      
    }
  };

  // Invia la richiesta
  xhr.send(`username=${username}`);
}